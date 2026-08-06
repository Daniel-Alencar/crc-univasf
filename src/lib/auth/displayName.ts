import type { User } from "@supabase/supabase-js";

/**
 * Transforma o início de um e-mail em algo apresentável quando a conta
 * ainda não tem nome cadastrado. Ex.: "daniel.alencar" -> "Daniel Alencar".
 */
function prettifyEmail(email: string) {
  const localPart = email.split("@")[0] ?? "";

  return localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/**
 * Nome a ser exibido para o usuário. A ordem de preferência é:
 * perfil salvo no banco -> metadata do cadastro -> e-mail formatado.
 */
export function resolveDisplayName(user: User, profileFullName?: string | null) {
  const metadataName = (user.user_metadata?.full_name ??
    user.user_metadata?.name) as string | undefined;

  const name = (profileFullName ?? metadataName ?? "").trim();
  if (name) return name;

  return prettifyEmail(user.email ?? "") || "Minha conta";
}

export function getFirstName(displayName: string) {
  return displayName.split(" ")[0] ?? displayName;
}

export function getInitials(displayName: string) {
  return (
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "?"
  );
}
