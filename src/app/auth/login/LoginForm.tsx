"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

import { signIn, type AuthState } from "@/app/auth/actions";
import AuthField from "@/components/auth/AuthField";
import SubmitButton from "@/components/auth/SubmitButton";
import { FormError } from "@/components/auth/FormFeedback";

export default function LoginForm({
  redirectTo,
  initialError,
}: {
  redirectTo: string;
  initialError?: string;
}) {
  const [state, formAction] = useActionState<AuthState, FormData>(signIn, {});
  const error = state.error ?? initialError;

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <FormError message={error} />

      <AuthField
        label="E-mail"
        name="email"
        type="email"
        icon={Mail}
        placeholder="seu@email.com"
        autoComplete="email"
        defaultValue={state.email}
        required
      />

      <div>
        <AuthField
          label="Senha"
          name="password"
          type="password"
          icon={Lock}
          placeholder="Sua senha"
          autoComplete="current-password"
          required
        />
        <div className="mt-2 flex justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-sm font-semibold text-orange-500 transition-colors hover:text-orange-600"
          >
            Esqueci minha senha
          </Link>
        </div>
      </div>

      <SubmitButton loadingLabel="Entrando...">Entrar</SubmitButton>

      <p className="text-center text-sm text-gray-500">
        Ainda não tem conta?{" "}
        <Link
          href={`/auth/register?redirectTo=${encodeURIComponent(redirectTo)}`}
          className="font-semibold text-orange-500 transition-colors hover:text-orange-600"
        >
          Cadastre-se gratuitamente
        </Link>
      </p>
    </form>
  );
}
