import React from "react";
import type { Metadata } from "next";

import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Entrar | CRC UNIVASF",
  description: "Acesse sua conta para assistir aos cursos do CRC UNIVASF.",
};

const ERROR_MESSAGES: Record<string, string> = {
  "link-invalido":
    "Este link expirou ou já foi utilizado. Faça login ou solicite um novo e-mail.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; erro?: string }>;
}) {
  const { redirectTo, erro } = await searchParams;

  const safeRedirect =
    redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/courses";

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</h1>
        <p className="mt-1 text-gray-500">
          Entre com sua conta para continuar seus cursos.
        </p>
      </div>

      <LoginForm
        redirectTo={safeRedirect}
        initialError={erro ? ERROR_MESSAGES[erro] : undefined}
      />
    </>
  );
}
