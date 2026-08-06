# Cadastro e Login de Alunos

Sistema de contas dos usuários da plataforma (alunos), usando **Supabase Auth**.
É separado do painel administrativo (`/admin/login`, tabela `admins`).

## 1. Rodar a migration

No Supabase → **SQL Editor** → **New Query**, cole e execute o arquivo
[`migration_auth.sql`](migration_auth.sql).

Ele cria:

- tabela `profiles` (nome, e-mail, telefone, cidade) ligada a `auth.users`;
- trigger `on_auth_user_created`, que cria o perfil automaticamente no cadastro;
- políticas de RLS: cada usuário lê/edita apenas o próprio perfil, admins leem todos.

## 2. Configurar o Supabase Auth

No painel do Supabase:

1. **Authentication → Providers → Email**: mantenha *Email* habilitado.
   - Com **Confirm email** ligado, o usuário recebe um e-mail e só entra depois de
     confirmar (a tela de cadastro já exibe o aviso).
   - Com **Confirm email** desligado, o login acontece direto após o cadastro.
2. **Authentication → URL Configuration**:
   - *Site URL*: `https://crc.univasf.edu.br` (em desenvolvimento, `http://localhost:3000`);
   - *Redirect URLs*: adicione `http://localhost:3000/auth/callback` e
     `https://crc.univasf.edu.br/auth/callback`.

### Variável de ambiente opcional

Em produção, defina em `.env.local` / na hospedagem:

```
NEXT_PUBLIC_SITE_URL=https://crc.univasf.edu.br
```

Ela é usada para montar os links de confirmação de e-mail e de recuperação de senha.
Se não for definida, o endereço é deduzido do host da requisição.

## 3. Rotas criadas

| Rota | Descrição |
|------|-----------|
| `/auth/register` | Cadastro (nome, e-mail, telefone, cidade e senha) |
| `/auth/login` | Login, com suporte a `?redirectTo=` |
| `/auth/forgot-password` | Solicita e-mail de recuperação de senha |
| `/auth/reset-password` | Define a nova senha (aberta pelo link do e-mail) |
| `/auth/callback` | Troca o código do e-mail pela sessão |
| `/account` | Área do aluno: dados pessoais, troca de senha e logout |

## 4. Como os cursos dependem do login

- `/courses` (catálogo) continua **público**, mas exibe o bloco de chamada para
  cadastro e um cadeado nas capas quando o visitante não está logado.
- `/courses/[id]` (aulas em vídeo) **exige login**. Visitantes são enviados para
  `/auth/login?redirectTo=/courses/<id>` e, após entrar, voltam direto para o curso.

O bloqueio acontece em duas camadas: no `src/proxy.ts` e na própria página
(`src/app/(layout)/courses/[id]/page.tsx`).

Se quiser bloquear também no banco (a API pública deixa de devolver os vídeos para
quem não está autenticado), descomente o bloco final de `migration_auth.sql`.
Atenção: nesse caso a contagem "N vídeo(s)" do catálogo passa a exibir 0 para
visitantes.

## 5. Observações

- O cabeçalho (`src/components/Header`) mostra **Entrar / Criar conta** para
  visitantes e um menu com **Meus cursos**, **Minha conta** e **Sair** para quem
  está logado.
- O link "Cursos" do menu está apontando para um endereço externo enquanto a flag
  `externalCourses` em `src/components/Header/index.tsx` estiver `true`. Para usar
  os cursos internos (`/courses`), mude a flag para `false`.
- O `src/proxy.ts` (convenção que substitui o `middleware.ts` no Next 16) mantém o
  cookie de sessão renovado em todas as rotas; sem ele o login não persiste entre
  navegações.
- O `next.config.ts` desativa o cache em disco do Turbopack
  (`experimental.turbopackFileSystemCacheForDev: false`). Isso é necessário porque
  o projeto fica numa partição montada em `/media`: o cache tenta gravar em
  `/mnt/<uuid-da-partição>/...` e o `next dev` quebra com "Permission denied
  (os error 13)". Se o projeto for movido para dentro de `/home`, a linha pode ser
  removida.
