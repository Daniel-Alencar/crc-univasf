import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Todas as imagens do site ficam num único bucket público, separadas por
 * pasta de primeiro nível (uma por área do admin) e, dentro dela, por id da
 * entidade:
 *
 *   media/
 *   ├── team/<membro_id>/<timestamp>-<nome>.<ext>
 *   ├── news/<noticia_id>/...
 *   ├── projects/<projeto_id>/...
 *   ├── gallery/<categoria_id>/...
 *   └── courses/<curso_id>/...
 *
 * Em formulários de criação o id ainda não existe, então usamos um id de
 * rascunho gerado no navegador (ver `useMediaFolderId`).
 */
export const MEDIA_BUCKET = "media";

export type MediaFolder = "team" | "news" | "projects" | "gallery" | "courses";

export const MAX_IMAGE_SIZE_MB = 5;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

/** Valor pronto para o atributo `accept` do <input type="file">. */
export const IMAGE_ACCEPT_ATTR = ACCEPTED_IMAGE_TYPES.join(",");

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Retorna a mensagem de erro, ou null se o arquivo for aceitável. */
export function validateImage(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Formato não suportado. Use JPG, PNG, WEBP, GIF ou AVIF.";
  }
  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    return `Imagem muito grande (máx. ${MAX_IMAGE_SIZE_MB} MB).`;
  }
  return null;
}

export function buildImagePath(folder: MediaFolder, entityId: string, file: File) {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const base = slugify(file.name.replace(/\.[^.]+$/, "")).slice(0, 60) || "imagem";

  return `${folder}/${entityId}/${Date.now()}-${base}.${ext}`;
}

function friendlyUploadError(message: string) {
  if (/bucket not found/i.test(message)) {
    return `Bucket "${MEDIA_BUCKET}" não existe no Supabase. Rode a migration migration_storage.sql.`;
  }
  if (/row-level security|violates|unauthorized|403/i.test(message)) {
    return "Sem permissão para enviar imagens. Confirme que você está logado como admin.";
  }
  return `Falha no upload: ${message}`;
}

/** Envia o arquivo e devolve a URL pública já pronta para salvar no banco. */
export async function uploadImage(
  supabase: SupabaseClient,
  { folder, entityId, file }: { folder: MediaFolder; entityId: string; file: File }
): Promise<string> {
  const validationError = validateImage(file);
  if (validationError) throw new Error(validationError);

  const path = buildImagePath(folder, entityId, file);

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    contentType: file.type,
    cacheControl: "31536000",
    upsert: false,
  });

  if (error) throw new Error(friendlyUploadError(error.message));

  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

const PUBLIC_URL_MARKER = `/storage/v1/object/public/${MEDIA_BUCKET}/`;

/** Caminho dentro do bucket, ou null se a URL não for do nosso storage. */
export function storagePathFromUrl(url: string): string | null {
  const index = url.indexOf(PUBLIC_URL_MARKER);
  if (index === -1) return null;

  return decodeURIComponent(url.slice(index + PUBLIC_URL_MARKER.length).split("?")[0]);
}

/**
 * Remove o arquivo do bucket. Silencioso de propósito: é sempre uma limpeza
 * secundária, e falhar nela não deve impedir o usuário de salvar o formulário.
 */
export async function removeImage(supabase: SupabaseClient, url: string) {
  const path = storagePathFromUrl(url);
  if (!path) return;

  await supabase.storage.from(MEDIA_BUCKET).remove([path]);
}
