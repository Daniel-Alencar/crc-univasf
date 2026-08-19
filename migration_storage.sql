-- ============================================================
-- MIGRATION: Upload de imagens via Supabase Storage
-- Execute este SQL no Supabase SQL Editor.
-- Pré-requisito: supabase_schema.sql (tabela admins) já executado.
--
-- Organização do bucket:
--
--   media/                                  (público, só imagens, 5 MB)
--   ├── team/<membro_id>/<timestamp>-<nome>.<ext>
--   ├── news/<noticia_id>/...
--   ├── projects/<projeto_id>/...
--   ├── gallery/<categoria_id>/...
--   └── courses/<curso_id>/...
--
-- Em formulários de criação o id ainda não existe, então a subpasta usa um
-- id de rascunho (UUID) gerado no navegador.
-- ============================================================

-- 1. Bucket público, aceitando apenas imagens de até 5 MB
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
ON CONFLICT (id) DO UPDATE
SET public             = EXCLUDED.public,
    file_size_limit    = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Leitura pública (o site exibe as imagens para visitantes não logados)
DROP POLICY IF EXISTS "Public read media" ON storage.objects;
CREATE POLICY "Public read media" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

-- 3. Escrita restrita a admins, e apenas dentro das pastas previstas.
--    A checagem de pasta impede que o bucket vire um depósito solto.
DROP POLICY IF EXISTS "Admin insert media" ON storage.objects;
CREATE POLICY "Admin insert media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'media'
    AND (storage.foldername(name))[1] IN ('team', 'news', 'projects', 'gallery', 'courses')
    AND auth.uid() IN (SELECT user_id FROM admins)
  );

DROP POLICY IF EXISTS "Admin update media" ON storage.objects;
CREATE POLICY "Admin update media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND auth.uid() IN (SELECT user_id FROM admins))
  WITH CHECK (bucket_id = 'media' AND auth.uid() IN (SELECT user_id FROM admins));

DROP POLICY IF EXISTS "Admin delete media" ON storage.objects;
CREATE POLICY "Admin delete media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND auth.uid() IN (SELECT user_id FROM admins));
