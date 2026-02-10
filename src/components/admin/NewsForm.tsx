"use client";

import React from "react"

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface NewsData {
  id?: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  external_link: string;
  is_published: boolean;
  published_at: string;
}

export default function NewsForm({ initialData }: { initialData?: NewsData }) {
  const [formData, setFormData] = useState<NewsData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    image_url: initialData?.image_url || "",
    external_link: initialData?.external_link || "",
    is_published: initialData?.is_published ?? true,
    published_at: initialData?.published_at?.split("T")[0] || new Date().toISOString().split("T")[0],
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

    const dataToSave = {
      ...formData,
      published_at: new Date(formData.published_at).toISOString(),
    };

    if (initialData?.id) {
      const { error } = await supabase
        .from("news")
        .update(dataToSave)
        .eq("id", initialData.id);

      if (error) {
        setError("Erro ao atualizar notícia");
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.from("news").insert([dataToSave]);

      if (error) {
        setError("Erro ao criar notícia");
        setLoading(false);
        return;
      }
    }

    router.push("/admin/news");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <Link
        href="/admin/news"
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
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Título *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Descrição Curta *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Conteúdo Completo
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              URL da Imagem
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Link Externo
            </label>
            <input
              type="url"
              value={formData.external_link}
              onChange={(e) => setFormData({ ...formData, external_link: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Data de Publicação
            </label>
            <input
              type="date"
              value={formData.published_at}
              onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-800"
              />
              <span className="text-slate-300">Publicar notícia</span>
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
