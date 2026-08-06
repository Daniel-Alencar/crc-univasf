"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export type AuthState = {
  error?: string;
  success?: string;
  email?: string;
};

const MIN_PASSWORD_LENGTH = 8;

/**
 * Só aceita caminhos internos ("/courses/123"), evitando redirect aberto
 * para domínios externos via ?redirectTo=.
 */
function safeRedirect(value: FormDataEntryValue | null, fallback: string) {
  const path = typeof value === "string" ? value : "";
  if (path.startsWith("/") && !path.startsWith("//")) {
    return path;
  }
  return fallback;
}

async function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const protocol =
    headerList.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}

/** Traduz as mensagens do Supabase para o português da plataforma. */
function translateAuthError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }
  if (normalized.includes("email not confirmed")) {
    return "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.";
  }
  if (normalized.includes("user already registered") || normalized.includes("already been registered")) {
    return "Já existe uma conta com este e-mail. Faça login ou recupere sua senha.";
  }
  if (normalized.includes("password should be at least")) {
    return `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }
  if (normalized.includes("unable to validate email") || normalized.includes("invalid email")) {
    return "Informe um e-mail válido.";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many requests")) {
    return "Muitas tentativas seguidas. Aguarde alguns minutos e tente novamente.";
  }
  if (normalized.includes("same as the old password")) {
    return "A nova senha precisa ser diferente da senha atual.";
  }
  return "Não foi possível concluir a operação. Tente novamente.";
}

function validatePassword(password: string, confirmation: string) {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }
  if (password !== confirmation) {
    return "As senhas não conferem.";
  }
  return null;
}

export async function signIn(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/courses");

  if (!email || !password) {
    return { error: "Preencha e-mail e senha.", email };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: translateAuthError(error.message), email };
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signUp(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirmation = String(formData.get("passwordConfirmation") ?? "");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/courses");

  if (!fullName) {
    return { error: "Informe seu nome completo.", email };
  }
  if (!email) {
    return { error: "Informe seu e-mail.", email };
  }

  const passwordError = validatePassword(password, passwordConfirmation);
  if (passwordError) {
    return { error: passwordError, email };
  }

  const siteUrl = await getSiteUrl();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone || null,
        city: city || null,
      },
      emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
    },
  });

  if (error) {
    return { error: translateAuthError(error.message), email };
  }

  // Supabase devolve um usuário sem identities quando o e-mail já existe
  // (proteção contra enumeração de contas).
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return {
      error: "Já existe uma conta com este e-mail. Faça login ou recupere sua senha.",
      email,
    };
  }

  // Confirmação de e-mail desativada no projeto: já entra direto.
  if (data.session) {
    revalidatePath("/", "layout");
    redirect(redirectTo);
  }

  return {
    success:
      "Cadastro realizado! Enviamos um link de confirmação para o seu e-mail. Confirme o endereço para acessar os cursos.",
    email,
  };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function requestPasswordReset(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { error: "Informe o e-mail cadastrado." };
  }

  const siteUrl = await getSiteUrl();
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent("/auth/reset-password")}`,
  });

  if (error) {
    return { error: translateAuthError(error.message), email };
  }

  return {
    success:
      "Se existir uma conta com este e-mail, você receberá em instantes um link para criar uma nova senha.",
    email,
  };
}

export async function updatePassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  const passwordConfirmation = String(formData.get("passwordConfirmation") ?? "");

  const passwordError = validatePassword(password, passwordConfirmation);
  if (passwordError) {
    return { error: passwordError };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error:
        "Seu link de recuperação expirou. Solicite um novo e-mail de redefinição de senha.",
    };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: translateAuthError(error.message) };
  }

  revalidatePath("/", "layout");
  redirect("/account?senha=atualizada");
}

export async function updateProfile(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();

  if (!fullName) {
    return { error: "Informe seu nome completo." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sua sessão expirou. Entre novamente para atualizar seus dados." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone: phone || null,
      city: city || null,
    })
    .eq("id", user.id);

  if (error) {
    return { error: "Não foi possível salvar seus dados. Tente novamente." };
  }

  await supabase.auth.updateUser({
    data: { full_name: fullName, phone: phone || null, city: city || null },
  });

  revalidatePath("/", "layout");
  return { success: "Dados atualizados com sucesso." };
}
