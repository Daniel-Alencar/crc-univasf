# Guia de Deploy e Configuração - CRC Univasf

Este documento detalha os passos necessários para configurar o banco de dados Supabase e realizar o deploy da aplicação no Vercel.

## 1. Configuração do Supabase

### Criar Tabelas
Acesse o **SQL Editor** no painel do seu projeto Supabase e execute o conteúdo do arquivo `supabase_schema.sql` (disponível na raiz do projeto). Este script criará:
- Tabelas para Notícias, Projetos, Equipe e Galeria.
- Sistema de permissões (RLS) para segurança.
- Gatilhos para atualização automática de datas.

### Configurar Autenticação
1. Vá em **Authentication** -> **Users**.
2. Clique em **Add User** -> **Create New User**.
3. Crie um usuário com o email e senha desejados (ex: `admin@univasf.com`).
4. **Importante**: Copie o `User ID` (UUID) gerado para este usuário.

### Registrar Administrador
No **SQL Editor**, execute o seguinte comando substituindo pelo UUID copiado:
```sql
INSERT INTO admins (user_id, name, email) 
VALUES ('COLE_O_UUID_AQUI', 'Seu Nome', 'admin@univasf.com');
```

## 2. Variáveis de Ambiente

Você precisará configurar as seguintes variáveis tanto no seu ambiente local (`.env.local`) quanto no painel da Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

## 3. Deploy no Vercel

Como o projeto já está na Vercel, siga estes passos para atualizar:

1. **Conectar Repositório**: Certifique-se de que as alterações foram enviadas para o seu repositório Git conectado à Vercel.
2. **Configurar Variáveis**:
   - Vá em **Settings** -> **Environment Variables** no projeto da Vercel.
   - Adicione `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. **Redeploy**: A Vercel detectará o novo commit e iniciará o build automaticamente.

## 4. Estrutura do Painel Admin

Após o deploy, você poderá acessar o painel em `/admin/login`.
- **Notícias**: Gerencie o que aparece na aba Notícias.
- **Projetos**: Gerencie os projetos e suas respectivas imagens.
- **Galeria**: Organize fotos por categorias e seções (ex: "Entrega de Computadores" -> "Evento X").
- **Equipe**: Gerencie os membros da equipe e suas funções.

## 5. Dicas de Mídia
Para as imagens (Notícias, Projetos, etc), você pode:
1. Fazer o upload para o **Storage** do Supabase e usar a URL pública.
2. Usar qualquer serviço de hospedagem de imagens externo e colar a URL no campo correspondente no admin.
