import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GraduationCap, LogOut, ShieldCheck, UserCog } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { getInitials, resolveDisplayName } from "@/lib/auth/displayName";
import { FormSuccess } from "@/components/auth/FormFeedback";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

export const metadata: Metadata = {
  title: "Minha conta | CRC UNIVASF",
  description: "Gerencie seus dados de acesso à plataforma de cursos do CRC UNIVASF.",
};

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ senha?: string }>;
}) {
  const { senha } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirectTo=/account");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, city")
    .eq("id", user.id)
    .maybeSingle();

  // Valor do formulário: só o nome realmente cadastrado (sem o fallback do e-mail).
  const fullName =
    profile?.full_name ?? (user.user_metadata?.full_name as string | undefined) ?? "";
  const phone = profile?.phone ?? "";
  const city = profile?.city ?? "";

  const displayName = resolveDisplayName(user, profile?.full_name);
  const initials = getInitials(displayName);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Cabeçalho do perfil */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-400 px-6 py-8 sm:px-8">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-2xl font-bold text-orange-500 shadow-md">
                {initials}
              </span>
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold text-white">{displayName}</h1>
                <p className="truncate text-white/85">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 font-semibold text-orange-500 transition-colors hover:text-orange-600"
            >
              <GraduationCap size={18} />
              Ir para os cursos
            </Link>

            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2 font-semibold text-gray-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:w-auto"
              >
                <LogOut size={18} />
                Sair da conta
              </button>
            </form>
          </div>
        </div>

        {senha === "atualizada" && (
          <div className="mt-6">
            <FormSuccess message="Senha atualizada com sucesso." />
          </div>
        )}

        {/* Dados pessoais */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <UserCog size={20} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Dados pessoais</h2>
              <p className="text-sm text-gray-500">
                Mantenha suas informações de cadastro atualizadas.
              </p>
            </div>
          </div>

          <ProfileForm fullName={fullName} phone={phone} city={city} />
        </section>

        {/* Segurança */}
        <section className="mt-6 rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <ShieldCheck size={20} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Segurança</h2>
              <p className="text-sm text-gray-500">
                Escolha uma nova senha de acesso à plataforma.
              </p>
            </div>
          </div>

          <ChangePasswordForm />
        </section>
      </div>
    </div>
  );
}
