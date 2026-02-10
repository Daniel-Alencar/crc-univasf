-- 1. Tabela de Admins
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 2. Tabela de Notícias
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  external_link TEXT,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de Projetos
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela de Imagens de Projetos
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabela de Membros da Equipe
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  email VARCHAR(255),
  linkedin_url TEXT,
  lattes_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabela de Galeria (Categorias)
CREATE TABLE IF NOT EXISTS gallery_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Tabela de Galeria (Seções/Versões dentro de categorias)
CREATE TABLE IF NOT EXISTS gallery_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES gallery_categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Tabela de Galeria (Imagens)
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES gallery_sections(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Gatilho para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso Público (Leitura)
CREATE POLICY "Public Read Access" ON news FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Access" ON projects FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Access" ON project_images FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Access" ON gallery_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON gallery_sections FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read for admins check" ON admins FOR SELECT USING (true);

-- Políticas para Admins (Acesso Total)
CREATE POLICY "Admin Full Access" ON news FOR ALL USING (auth.uid() IN (SELECT user_id FROM admins));
CREATE POLICY "Admin Full Access" ON projects FOR ALL USING (auth.uid() IN (SELECT user_id FROM admins));
CREATE POLICY "Admin Full Access" ON project_images FOR ALL USING (auth.uid() IN (SELECT user_id FROM admins));
CREATE POLICY "Admin Full Access" ON team_members FOR ALL USING (auth.uid() IN (SELECT user_id FROM admins));
CREATE POLICY "Admin Full Access" ON gallery_categories FOR ALL USING (auth.uid() IN (SELECT user_id FROM admins));
CREATE POLICY "Admin Full Access" ON gallery_sections FOR ALL USING (auth.uid() IN (SELECT user_id FROM admins));
CREATE POLICY "Admin Full Access" ON gallery_images FOR ALL USING (auth.uid() IN (SELECT user_id FROM admins));


GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;
