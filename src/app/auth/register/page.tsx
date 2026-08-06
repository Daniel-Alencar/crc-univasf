import React from "react";
import type { Metadata } from "next";

import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Criar conta | CRC UNIVASF",
  description: "Cadastre-se gratuitamente para acessar os cursos do CRC UNIVASF.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { redirectTo } = await searchParams;

  const safeRedirect =
    redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/courses";

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900">Crie sua conta</h1>
        <p className="mt-1 text-gray-500">
          É gratuito e leva menos de um minuto. Depois é só começar a assistir.
        </p>
      </div>

      <RegisterForm redirectTo={safeRedirect} />
    </>
  );
}
