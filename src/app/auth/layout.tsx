import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, GraduationCap, PlayCircle, Award } from "lucide-react";

import Logo from "@/public/assets/logo.png";

const highlights = [
  {
    icon: PlayCircle,
    title: "Cursos em vídeo gratuitos",
    description: "Assista às aulas quando e onde quiser, no seu ritmo.",
  },
  {
    icon: GraduationCap,
    title: "Conteúdo do CRC UNIVASF",
    description: "Formações produzidas pela equipe do Centro de Recondicionamento.",
  },
  {
    icon: Award,
    title: "Sua conta, seu progresso",
    description: "Um cadastro único para acessar todos os cursos da plataforma.",
  },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Painel institucional */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-orange-500 to-yellow-400 lg:flex lg:w-[45%] lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-white/10" />

        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-2xl bg-white px-5 py-3 shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Image src={Logo} alt="CRC UNIVASF" className="h-auto w-40" priority />
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-white">
            Aprenda com os cursos do CRC UNIVASF
          </h2>
          <p className="mt-3 text-white/90">
            Crie sua conta gratuita e tenha acesso completo à plataforma de cursos em vídeo.
          </p>

          <ul className="mt-8 space-y-5">
            {highlights.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                  <Icon size={22} />
                </span>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="text-sm text-white/80">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-sm text-white/70">
          Centro de Recondicionamento de Computadores — UNIVASF
        </p>
      </aside>

      {/* Formulários */}
      <main className="flex min-h-screen flex-1 flex-col items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Link href="/">
              <Image src={Logo} alt="CRC UNIVASF" className="h-auto w-28" priority />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 transition-colors hover:text-orange-600"
            >
              <ArrowLeft size={16} />
              Início
            </Link>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-md sm:p-9">{children}</div>

          <div className="mt-6 hidden justify-center lg:flex">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-orange-500"
            >
              <ArrowLeft size={16} />
              Voltar para o site
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
