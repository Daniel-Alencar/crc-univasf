"use client";

import React, { useActionState } from "react";
import { Lock } from "lucide-react";

import { updatePassword, type AuthState } from "@/app/auth/actions";
import AuthField from "@/components/auth/AuthField";
import SubmitButton from "@/components/auth/SubmitButton";
import { FormError } from "@/components/auth/FormFeedback";

export default function ResetPasswordForm() {
  const [state, formAction] = useActionState<AuthState, FormData>(updatePassword, {});

  return (
    <form action={formAction} className="space-y-5">
      <FormError message={state.error} />

      <AuthField
        label="Nova senha"
        name="password"
        type="password"
        icon={Lock}
        placeholder="Digite a nova senha"
        autoComplete="new-password"
        hint="Mínimo de 8 caracteres."
        required
      />

      <AuthField
        label="Confirmar nova senha"
        name="passwordConfirmation"
        type="password"
        icon={Lock}
        placeholder="Repita a nova senha"
        autoComplete="new-password"
        required
      />

      <SubmitButton loadingLabel="Salvando...">Salvar nova senha</SubmitButton>
    </form>
  );
}
