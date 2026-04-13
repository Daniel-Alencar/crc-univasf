-- ============================================================
-- MIGRATION: Plataforma de Cursos em Vídeo
-- Execute este SQL no Supabase SQL Editor
-- ============================================================

-- 1. Tabela de Cursos
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(100),
  duration_hours NUMERIC(5, 1),
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de Vídeos dos Cursos
CREATE TABLE IF NOT EXISTS course_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  youtube_video_id VARCHAR(20) NOT NULL,
  duration_minutes INTEGER,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Trigger para atualizar updated_at
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_course_videos_updated_at
  BEFORE UPDATE ON course_videos
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 4. Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_videos ENABLE ROW LEVEL SECURITY;

-- Leitura pública para cursos publicados
CREATE POLICY "Public Read Courses" ON courses
  FOR SELECT USING (is_published = true);

-- Leitura pública para vídeos de cursos publicados
CREATE POLICY "Public Read Course Videos" ON course_videos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = course_videos.course_id
        AND courses.is_published = true
    )
  );

-- Acesso total para admins
CREATE POLICY "Admin Full Access Courses" ON courses
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM admins));

CREATE POLICY "Admin Full Access Course Videos" ON course_videos
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM admins));

-- 5. Grants
GRANT ALL ON courses TO anon, authenticated, service_role;
GRANT ALL ON course_videos TO anon, authenticated, service_role;
