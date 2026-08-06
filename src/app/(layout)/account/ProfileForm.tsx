"use client";

import React, { useActionState } from "react";
import { User, Phone, MapPin } from "lucide-react";

import { updateProfile, type AuthState } from "@/app/auth/actions";
import AuthField from "@/components/auth/AuthField";
import SubmitButton from "@/components/auth/SubmitButton";
import { FormError, FormSuccess } from "@/components/auth/FormFeedback";

export default function ProfileForm({
  fullName,
  phone,
  city,
}: {
  fullName: string;
  phone: string;
  city: string;
}) {
  const [state, formAction] = useActionState<AuthState, FormData>(updateProfile, {});

  return (
    <form action={formAction} className="space-y-5">
      <FormError message={state.error} />
      <FormSuccess message={state.success} />

      <AuthField
        label="Nome completo"
        name="fullName"
        icon={User}
        defaultValue={fullName}
        autoComplete="name"
        required
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <AuthField
          label="Telefone"
          name="phone"
          type="tel"
          icon={Phone}
          placeholder="(87) 90000-0000"
          defaultValue={phone}
          autoComplete="tel"
        />
        <AuthField
          label="Cidade"
          name="city"
          icon={MapPin}
          placeholder="Juazeiro / Petrolina..."
          defaultValue={city}
          autoComplete="address-level2"
        />
      </div>

      <div className="sm:max-w-xs">
        <SubmitButton loadingLabel="Salvando...">Salvar alterações</SubmitButton>
      </div>
    </form>
  );
}
