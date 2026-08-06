-- ============================================================
-- MIGRATION: Cadastro e Login de Alunos (Supabase Auth)
-- Execute este SQL no Supabase SQL Editor
-- Pré-requisito: supabase_schema.sql (tabela admins e função
-- update_updated_at_column) já executado.
-- ============================================================

-- 1. Perfis dos usuários da plataforma (alunos)
--    O id é o mesmo id de auth.users.
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(30),
  city VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Trigger de updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 3. Cria o perfil automaticamente quando um usuário se cadastra.
--    O nome vem do metadata enviado no signUp (options.data.full_name).
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, city)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email,
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data ->> 'city'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- 4. Row Level Security: cada usuário enxerga apenas o próprio perfil
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own profile" ON profiles;
CREATE POLICY "Users read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users insert own profile" ON profiles;
CREATE POLICY "Users insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users update own profile" ON profiles;
CREATE POLICY "Users update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Admins enxergam todos os perfis (relatórios / gestão)
DROP POLICY IF EXISTS "Admin Read Profiles" ON profiles;
CREATE POLICY "Admin Read Profiles" ON profiles
  FOR SELECT USING (auth.uid() IN (SELECT user_id FROM admins));

-- 5. Grants
GRANT ALL ON profiles TO anon, authenticated, service_role;

-- 6. Perfis para usuários que já existiam antes desta migration
INSERT INTO profiles (id, full_name, email)
SELECT u.id, u.raw_user_meta_data ->> 'full_name', u.email
FROM auth.users u
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- OPCIONAL: exigir login também no banco (não só na aplicação)
--
-- Hoje o acesso às aulas é bloqueado na aplicação (a página do
-- curso redireciona visitantes para /auth/login). O catálogo em
-- /courses continua público, incluindo a contagem de vídeos.
--
-- Se quiser que nem a API pública devolva os vídeos para quem
-- não está logado, descomente o bloco abaixo. Atenção: com isso
-- a contagem "N vídeo(s)" no catálogo passa a exibir 0 para
-- visitantes não autenticados.
-- ============================================================

-- DROP POLICY IF EXISTS "Public Read Course Videos" ON course_videos;
-- CREATE POLICY "Authenticated Read Course Videos" ON course_videos
--   FOR SELECT TO authenticated USING (
--     EXISTS (
--       SELECT 1 FROM courses
--       WHERE courses.id = course_videos.course_id
--         AND courses.is_published = true
--     )
--   );
