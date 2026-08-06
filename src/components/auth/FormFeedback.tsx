import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
    >
      <AlertCircle size={18} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div
      role="status"
      className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
    >
      <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
