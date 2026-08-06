"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

import { requestPasswordReset, type AuthState } from "@/app/auth/actions";
import AuthField from "@/components/auth/AuthField";
import SubmitButton from "@/components/auth/SubmitButton";
import { FormError, FormSuccess } from "@/components/auth/FormFeedback";

export default function ForgotPasswordForm() {
  const [state, formAction] = useActionState<AuthState, FormData>(
    requestPasswordReset,
    {}
  );

  return (
    <form action={formAction} className="space-y-5">
      <FormError message={state.error} />
      <FormSuccess message={state.success} />

      <AuthField
        label="E-mail cadastrado"
        name="email"
        type="email"
        icon={Mail}
        placeholder="seu@email.com"
        autoComplete="email"
        defaultValue={state.email}
        required
      />

      <SubmitButton loadingLabel="Enviando...">Enviar link de recuperação</SubmitButton>

      <p className="text-center text-sm text-gray-500">
        Lembrou a senha?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-orange-500 transition-colors hover:text-orange-600"
        >
          Voltar para o login
        </Link>
      </p>
    </form>
  );
}
