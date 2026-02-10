"use client";

import React from "react"

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TeamMemberData {
  id?: string;
  name: string;
  role: string;
  description: string;
  image_url: string;
  linkedin_url: string;
  lattes_url: string;
  email: string;
  is_active: boolean;
  display_order: number;
}

export default function TeamMemberForm({ initialData }: { initialData?: TeamMemberData }) {
  const [formData, setFormData] = useState<TeamMemberData>({
    name: initialData?.name || "",
    role: initialData?.role || "",
    description: initialData?.description || "",
    image_url: initialData?.image_url || "",
    linkedin_url: initialData?.linkedin_url || "",
    lattes_url: initialData?.lattes_url || "",
    email: initialData?.email || "",
    is_active: initialData?.is_active ?? true,
    display_order: initialData?.display_order || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (initialData?.id) {
      const { error } = await supabase
        .from("team_members")
        .update(formData)
        .eq("id", initialData.id);

      if (error) {
        setError("Erro ao atualizar membro");
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.from("team_members").insert([formData]);

      if (error) {
        setError("Erro ao criar membro");
        setLoading(false);
        return;
      }
    }

    router.push("/admin/team");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <Link
        href="/admin/team"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Voltar para lista</span>
      </Link>

      {error && (
        <div className="p-4 mb-6 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nome *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Cargo/Função *
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Pesquisador, Coordenador..."
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Descrição/Bio
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            URL da Foto
          </label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              value={formData.linkedin_url}
              onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Lattes
            </label>
            <input
              type="url"
              value={formData.lattes_url}
              onChange={(e) => setFormData({ ...formData, lattes_url: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="http://lattes.cnpq.br/..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Ordem de Exibição
            </label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-800"
              />
              <span className="text-slate-300">Membro ativo</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-lg transition-colors"
          >
            <Save size={20} />
            <span>{loading ? "Salvando..." : "Salvar"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
