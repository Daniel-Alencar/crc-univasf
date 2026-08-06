import React from "react";
import type { Metadata } from "next";

import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Recuperar senha | CRC UNIVASF",
  description: "Receba um link por e-mail para criar uma nova senha.",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-gray-900">Recuperar senha</h1>
        <p className="mt-1 text-gray-500">
          Informe seu e-mail e enviaremos um link para você criar uma nova senha.
        </p>
      </div>

      <ForgotPasswordForm />
    </>
  );
}
