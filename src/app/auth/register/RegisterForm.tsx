"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Phone, MapPin, MailCheck } from "lucide-react";

import { signUp, type AuthState } from "@/app/auth/actions";
import AuthField from "@/components/auth/AuthField";
import SubmitButton from "@/components/auth/SubmitButton";
import { FormError } from "@/components/auth/FormFeedback";

export default function RegisterForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction] = useActionState<AuthState, FormData>(signUp, {});

  // Cadastro concluído aguardando confirmação por e-mail
  if (state.success) {
    return (
      <div className="text-center">
        <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-white">
          <MailCheck size={30} />
        </span>
        <h2 className="text-xl font-bold text-gray-900">Confirme seu e-mail</h2>
        <p className="mt-2 text-gray-500">{state.success}</p>
        {state.email && (
          <p className="mt-3 rounded-xl bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-600 break-all">
            {state.email}
          </p>
        )}
        <p className="mt-4 text-sm text-gray-400">
          Não recebeu? Verifique a caixa de spam ou lixo eletrônico.
        </p>
        <Link
          href="/auth/login"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-yellow-400 px-4 py-3 font-semibold text-white shadow-md transition-all hover:brightness-105"
        >
          Ir para o login
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <FormError message={state.error} />

      <AuthField
        label="Nome completo"
        name="fullName"
        icon={User}
        placeholder="Seu nome completo"
        autoComplete="name"
        required
      />

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

      <div className="grid gap-5 sm:grid-cols-2">
        <AuthField
          label="Telefone"
          name="phone"
          type="tel"
          icon={Phone}
          placeholder="(87) 90000-0000"
          autoComplete="tel"
        />
        <AuthField
          label="Cidade"
          name="city"
          icon={MapPin}
          placeholder="Juazeiro / Petrolina..."
          autoComplete="address-level2"
        />
      </div>

      <AuthField
        label="Senha"
        name="password"
        type="password"
        icon={Lock}
        placeholder="Crie uma senha"
        autoComplete="new-password"
        hint="Mínimo de 8 caracteres."
        required
      />

      <AuthField
        label="Confirmar senha"
        name="passwordConfirmation"
        type="password"
        icon={Lock}
        placeholder="Repita a senha"
        autoComplete="new-password"
        required
      />

      <SubmitButton loadingLabel="Criando conta...">Criar conta gratuita</SubmitButton>

      <p className="text-center text-sm text-gray-500">
        Já tem uma conta?{" "}
        <Link
          href={`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`}
          className="font-semibold text-orange-500 transition-colors hover:text-orange-600"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
}
