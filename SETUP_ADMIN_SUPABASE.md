# Setup de Admin - Guia Completo Supabase

## 📊 Análise do Projeto

O projeto CRC-UNIVASF já possui uma estrutura de autenticação com Supabase implementada. Este guia detalha os passos necessários para conectar e usar a conta de admin.

## ✅ O que já está configurado

1. **Variáveis de Ambiente** (`.env.local`):
   - URL do Supabase já definida
   - Chaves de acesso configuradas
   - Conexão com banco de dados PostgreSQL

2. **Autenticação** implementada em:
   - `src/lib/supabase/client.ts` - Cliente de browser
   - `src/lib/supabase/server.ts` - Cliente de servidor
   - `src/lib/supabase/middleware.ts` - Proteção de rotas

3. **Sistema de Admin** estruturado em:
   - `src/app/admin/login/page.tsx` - Página de login
   - `src/app/admin/(dashboard)/layout.tsx` - Layout protegido
   - Dashboard com gerenciamento de: **Notícias**, **Projetos** e **Membros da Equipe**

## 🔴 O que precisa ser feito

### 1️⃣ Criar Tabelas no Supabase

1. Acesse [https://app.supabase.com](https://app.supabase.com)
2. Entre na sua conta/projeto
3. Vá para **SQL Editor** no menu lateral
4. Clique em **New Query**
5. Execute as queries abaixo:

#### Query 1: Tabela de Admins
```sql
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);
```

#### Query 2: Tabela de Notícias
```sql
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  image_url TEXT,
  external_link TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Query 3: Tabela de Projetos
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  image_url TEXT,
  external_link TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Query 4: Tabela de Membros da Equipe
```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  bio TEXT,
  image_url TEXT,
  email VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2️⃣ Criar Conta de Usuário no Supabase

1. Acesse [https://app.supabase.com](https://app.supabase.com)
2. Vá para **Authentication** → **Users** no menu lateral
3. Clique em **Add User**
4. Preencha:
   - **Email**: `admin@univasf.com` (ou seu email)
   - **Password**: Insira uma senha segura
   - **Auto Confirm user**: Marque esta opção
5. Clique em **Save**
6. **Copie o UUID do usuário** (você verá na lista de usuários)

### 3️⃣ Registrar o Usuário como Admin

1. No **SQL Editor** do Supabase, execute:

```sql
INSERT INTO admins (user_id, name, email) 
VALUES ('COLE_O_UUID_DO_USUARIO_AQUI', 'Seu Nome', 'admin@univasf.com');
```

**Exemplo**:
```sql
INSERT INTO admins (user_id, name, email) 
VALUES ('123e4567-e89b-12d3-a456-426614174000', 'João Admin', 'admin@univasf.com');
```

### 4️⃣ Configurar RLS (Row Level Security) - Recomendado

Para maior segurança, habilite RLS nas tabelas:

1. Vá para **Authentication** → **Policies** no Supabase
2. Ou acesse cada tabela em **Table Editor** e habilite RLS
3. Adicione políticas de segurança conforme sua necessidade

**Exemplo básico de política**:
```sql
-- Permitir que admins leiam todas as notícias
CREATE POLICY "Enable read access for admins" ON news
  AS SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM admins
  ));

-- Permitir que admins insiram notícias
CREATE POLICY "Enable insert for admins" ON news
  AS INSERT
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM admins
  ));
```

## 🚀 Acessar o Painel Admin

### Passos Finais:

1. **Abra o terminal** na pasta do projeto
2. **Rode o projeto**:
   ```bash
   npm run dev
   ```
3. **Acesse no navegador**: `http://localhost:3000/admin/login`
4. **Faça login** com as credenciais criadas:
   - Email: `admin@univasf.com`
   - Senha: A senha que você definiu
5. **Sistema validará**: Se o usuário está na tabela `admins`
6. **Se tudo estiver correto**: Será redirecionado para `http://localhost:3000/admin` com acesso ao dashboard

## 📊 Fluxo de Autenticação

```
┌─────────────────────────────────────────────────────────┐
│ 1. Acessa http://localhost:3000/admin/login             │
├─────────────────────────────────────────────────────────┤
│ 2. Preenche formulário (Email + Senha)                  │
├─────────────────────────────────────────────────────────┤
│ 3. Supabase.auth.signInWithPassword()                   │
├─────────────────────────────────────────────────────────┤
│ 4. Verifica se user_id existe na tabela 'admins'        │
├─────────────────────────────────────────────────────────┤
│ 5. Sim? ✅ → Redireciona para /admin (Dashboard)        │
│    Não? ❌ → Exibe erro "Sem permissão de admin"       │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Recursos Disponíveis no Dashboard

Após fazer login com sucesso, você terá acesso a:

1. **Dashboard** (`/admin`)
   - Estatísticas gerais
   - Links para gerenciar notícias, projetos e membros da equipe

2. **Notícias** (`/admin/news`)
   - Listar, criar, editar e deletar notícias
   - Status: Publicado ou Rascunho
   - Data de publicação

3. **Projetos** (`/admin/projects`)
   - Listar, criar, editar e deletar projetos
   - Gerenciar informações de projetos

4. **Membros da Equipe** (`/admin/team`)
   - Listar, criar, editar e deletar membros
   - Informações de contato

## 🔧 Variáveis de Ambiente (Já Configuradas)

O projeto já possui as seguintes variáveis configuradas em `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://bbwkxwprrikfctxzaesf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_aqui
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_chave_aqui
SUPABASE_JWT_SECRET=seu_secret_aqui
SUPABASE_PUBLISHABLE_KEY=sua_chave_aqui
SUPABASE_SECRET_KEY=seu_secret_aqui
SUPABASE_SERVICE_ROLE_KEY=seu_service_role_aqui
```

**⚠️ Não compartilhe essas chaves publicamente!**

## 📝 Resumo Rápido

| Passo | Ação | Onde |
|-------|------|------|
| 1 | Criar tabelas (SQL) | Supabase SQL Editor |
| 2 | Criar usuário | Supabase Authentication |
| 3 | Registrar como admin | Supabase SQL Editor |
| 4 | (Opcional) Configurar RLS | Supabase Policies |
| 5 | Executar projeto | Terminal: `npm run dev` |
| 6 | Acessar login | http://localhost:3000/admin/login |
| 7 | Fazer login | Com email e senha do passo 2 |
| 8 | Aproveitar o admin! | Dashboard em /admin |

## ⚠️ Troubleshooting

### Erro: "Email ou senha inválidos"
- Verifique se o usuário foi criado no Supabase Authentication
- Confirme se marcou "Auto Confirm user"

### Erro: "Você não tem permissão de administrador"
- Verifique se inseriu o registro na tabela `admins`
- Confirme se o `user_id` está correto (deve ser idêntico ao UUID do usuário)

### Erro: "Não consegue conectar ao Supabase"
- Verifique as variáveis em `.env.local`
- Confirme que a URL do Supabase está correta
- Verifique se as chaves de API estão válidas

### As tabelas já existem no seu banco?
- Acesse **Table Editor** no Supabase
- Se as tabelas aparecerem lá, pule para o passo 2

## 📚 Referências

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Next.js com Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

**Criado em**: 19 de Janeiro de 2026  
**Projeto**: CRC-UNIVASF  
**Versão**: 1.0
