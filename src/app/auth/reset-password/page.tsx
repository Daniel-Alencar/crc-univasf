import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Nova senha | CRC UNIVASF",
  description: "Defina uma nova senha para sua conta do CRC UNIVASF.",
};

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Sem sessão de recuperação, o link expirou ou já foi usado.
  if (!user) {
    return (
      <>
        <h1 className="text-2xl font-bold text-gray-900">Link expirado</h1>
        <p className="mt-2 text-gray-500">
          Este link de recuperação não é mais válido. Solicite um novo e-mail para
          criar sua senha.
        </p>
        <Link
          href="/auth/forgot-password"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 px-4 py-3 font-semibold text-white shadow-md transition-all hover:brightness-105"
        >
          Solicitar novo link
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900">Criar nova senha</h1>
        <p className="mt-1 text-gray-500">
          Defina a nova senha da conta <strong>{user.email}</strong>.
        </p>
      </div>

      <ResetPasswordForm />
    </>
  );
}
