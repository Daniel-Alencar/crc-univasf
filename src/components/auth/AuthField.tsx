"use client";

import React, { useId, useState } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

interface AuthFieldProps {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  icon: LucideIcon;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  hint?: string;
}

export default function AuthField({
  label,
  name,
  type = "text",
  icon: Icon,
  placeholder,
  autoComplete,
  defaultValue,
  required,
  disabled,
  hint,
}: AuthFieldProps) {
  const id = useId();
  const isPassword = type === "password";
  const [visible, setVisible] = useState(false);
  const inputType = isPassword && visible ? "text" : type;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-orange-500"> *</span>}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          className={`w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 text-gray-800 placeholder-gray-400 transition-all focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400/40 disabled:cursor-not-allowed disabled:opacity-60 ${
            isPassword ? "pr-11" : "pr-4"
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-orange-500"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {hint && <p className="mt-1.5 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
