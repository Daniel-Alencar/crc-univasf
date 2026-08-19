# Upload de Imagens (Supabase Storage)

Todo o `/admin` deixou de pedir URL de imagem: agora o admin envia o arquivo e o
site guarda a URL pública gerada pelo Supabase Storage.

## 1. Rodar a migration

No **SQL Editor** do Supabase, execute `migration_storage.sql`. Ele cria o bucket
e as policies. Sem isso, o upload falha com "Bucket `media` não existe".

## 2. Organização do bucket

Um único bucket público (`media`), com uma pasta por área do admin e uma
subpasta por entidade:

```
media/                                        público · só imagens · até 5 MB
├── team/<membro_id>/<timestamp>-<nome>.<ext>
├── news/<noticia_id>/...
├── projects/<projeto_id>/...
├── gallery/<categoria_id>/...
└── courses/<curso_id>/...
```

Bucket único porque todas essas imagens têm o mesmo nível de acesso (públicas) e
os mesmos limites — separar em vários buckets só duplicaria policies. A separação
que importa (por área e por registro) fica nos prefixos, que é o que o Storage
usa como "pastas".

Nos formulários de **criação** o id da entidade ainda não existe quando o upload
acontece, então a subpasta usa um UUID de rascunho gerado no navegador. Nos
formulários de **edição**, a subpasta é o id real do registro.

## 3. Permissões

- **Leitura**: pública (o site mostra as imagens para visitantes).
- **Escrita/remoção**: só usuários da tabela `admins`.
- O `INSERT` também valida o prefixo da pasta, para o bucket não virar depósito
  solto de arquivos na raiz.

## 4. Onde está o código

- `src/lib/supabase/storage.ts` — nome do bucket, validação, caminho, upload e
  remoção.
- `src/components/admin/ImageUploader.tsx` — imagem única (foto de membro,
  imagem de notícia, thumbnail de curso).
- `src/components/admin/MultiImageUploader.tsx` — várias imagens (projetos e
  seções da galeria).

## 5. Limpeza de arquivos

Ao trocar ou remover uma imagem, o arquivo só é apagado do bucket se tiver sido
enviado naquela mesma sessão do formulário. Imagens já salvas no banco são
mantidas: se o admin desistir do formulário sem salvar, o registro continua
apontando para um arquivo que existe. O custo disso é algum arquivo órfão no
bucket quando uma imagem antiga é substituída — preferível a imagem quebrada no
site público.
