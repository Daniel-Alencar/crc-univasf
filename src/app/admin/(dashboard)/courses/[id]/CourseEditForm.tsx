"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { ArrowLeft, Save, Video } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  category: string | null;
  duration_hours: number | null;
  is_published: boolean;
  display_order: number;
}

export default function CourseEditForm({ course }: { course: Course }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: course.title,
    description: course.description,
    thumbnail_url: course.thumbnail_url ?? "",
    category: course.category ?? "",
    duration_hours: course.duration_hours?.toString() ?? "",
    is_published: course.is_published,
    display_order: course.display_order,
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error: err } = await supabase
      .from("courses")
      .update({
        title: form.title,
        description: form.description,
        thumbnail_url: form.thumbnail_url || null,
        category: form.category || null,
        duration_hours: form.duration_hours ? Number(form.duration_hours) : null,
        is_published: form.is_published,
        display_order: Number(form.display_order),
      })
      .eq("id", course.id);

    setLoading(false);
    if (err) { setError(err.message); return; }
    setSuccess(true);
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/courses" className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">{error}</div>}
      {success && <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400">Curso atualizado com sucesso!</div>}

      <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-5 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Título *</label>
          <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Descrição *</label>
          <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">URL da Thumbnail</label>
          <input type="url" value={form.thumbnail_url} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="https://..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Categoria</label>
            <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="Ex: Tecnologia" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Carga horária (horas)</label>
            <input type="number" min="0" step="0.5" value={form.duration_hours} onChange={(e) => setForm({ ...form, duration_hours: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Ordem de exibição</label>
            <input type="number" min="0" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="w-5 h-5 rounded" />
              <span className="text-sm font-medium text-slate-300">Publicado</span>
            </label>
          </div>
        </div>
        <div className="pt-2 flex gap-3">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50">
            <Save size={18} />
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>
          <Link href={`/admin/courses/${course.id}/videos`}
            className="flex items-center gap-2 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
            <Video size={18} />
            Gerenciar Vídeos
          </Link>
        </div>
      </form>
    </div>
  );
}
