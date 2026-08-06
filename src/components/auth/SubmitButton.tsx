"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  children: React.ReactNode;
  loadingLabel?: string;
  variant?: "primary" | "outline";
}

export default function SubmitButton({
  children,
  loadingLabel = "Aguarde...",
  variant = "primary",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-orange-500 to-yellow-400 text-white shadow-md hover:shadow-lg hover:brightness-105"
      : "border border-orange-500 text-orange-500 hover:bg-orange-50";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400/50 disabled:cursor-not-allowed disabled:opacity-70 ${styles}`}
    >
      {pending && <Loader2 size={18} className="animate-spin" />}
      {pending ? loadingLabel : children}
    </button>
  );
}
