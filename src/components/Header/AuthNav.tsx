"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { ChevronDown, LogIn, LogOut, UserCircle, UserPlus, GraduationCap } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/app/auth/actions";
import { getFirstName, getInitials, resolveDisplayName } from "@/lib/auth/displayName";

/**
 * Área de autenticação do cabeçalho. Reage ao login/logout em tempo real
 * através do onAuthStateChange do Supabase.
 */
export default function AuthNav({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Nome cadastrado no perfil (contas antigas podem não ter nome no metadata).
  useEffect(() => {
    if (!user) {
      setProfileName(null);
      return;
    }

    let active = true;
    const supabase = createClient();

    supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setProfileName(data?.full_name ?? null);
      });

    return () => {
      active = false;
    };
  }, [user]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const name = user ? resolveDisplayName(user, profileName) : "";

  if (variant === "mobile") {
    if (loading) return null;

    if (!user) {
      return (
        <>
          <li>
            <Link href="/auth/login" onClick={onNavigate} className="flex items-center gap-2">
              <LogIn size={18} />
              Entrar
            </Link>
          </li>
          <li>
            <Link
              href="/auth/register"
              onClick={onNavigate}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-orange-500"
            >
              <UserPlus size={18} />
              Criar conta
            </Link>
          </li>
        </>
      );
    }

    return (
      <>
        <li className="border-t border-white/30 pt-4 text-sm text-white/80">
          Olá, {getFirstName(name)}
        </li>
        <li>
          <Link href="/account" onClick={onNavigate} className="flex items-center gap-2">
            <UserCircle size={18} />
            Minha conta
          </Link>
        </li>
        <li>
          <form action={signOut}>
            <button type="submit" className="flex items-center gap-2 font-semibold">
              <LogOut size={18} />
              Sair
            </button>
          </form>
        </li>
      </>
    );
  }

  if (loading) {
    return <div className="h-10 w-40 animate-pulse rounded-full bg-gray-100" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-gray-600 transition-colors hover:text-orange-500"
        >
          <LogIn size={18} />
          Entrar
        </Link>
        <Link
          href="/auth/register"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 px-5 py-2 font-semibold text-white shadow-md transition-all hover:brightness-105"
        >
          <UserPlus size={18} />
          Criar conta
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-gray-200 py-1.5 pl-1.5 pr-3 transition-colors hover:border-orange-300 hover:bg-orange-50"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 text-sm font-bold text-white">
          {getInitials(name)}
        </span>
        <span className="max-w-[10rem] truncate text-sm font-semibold text-gray-700">
          {getFirstName(name)}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
        >
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="truncate text-sm font-bold text-gray-800">{name}</p>
            <p className="truncate text-xs text-gray-400">{user.email}</p>
          </div>

          <Link
            href="/courses"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-orange-50 hover:text-orange-600"
          >
            <GraduationCap size={18} />
            Meus cursos
          </Link>

          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-orange-50 hover:text-orange-600"
          >
            <UserCircle size={18} />
            Minha conta
          </Link>

          <form action={signOut} className="border-t border-gray-100">
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={18} />
              Sair
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
