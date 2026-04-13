"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { ArrowLeft, Save, ExternalLink } from "lucide-react";
import { use } from "react";

export default function NewVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    youtube_video_id: "",
    duration_minutes: "",
    display_order: 0,
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Extract YouTube ID from URL or plain ID
  const parseYoutubeId = (input: string): string => {
    const urlMatch = input.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return urlMatch ? urlMatch[1] : input.trim();
  };

  const handleYoutubeChange = (value: string) => {
    const id = parseYoutubeId(value);
    setForm({ ...form, youtube_video_id: id });
    setPreview(id.length === 11 ? id : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: err } = await supabase.from("course_videos").insert([
      {
        course_id: courseId,
        title: form.title,
        description: form.description || null,
        youtube_video_id: form.youtube_video_id,
        duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
        display_order: Number(form.display_order),
      },
    ]);

    setLoading(false);
    if (err) { setError(err.message); return; }
    router.push(`/admin/courses/${courseId}/videos`);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href={`/admin/courses/${courseId}/videos`}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-white">Adicionar Vídeo</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">{error}</div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-5 flex-1 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Título da Aula *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="Ex: Aula 1 - Introdução ao curso"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              ID ou URL do YouTube *
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 text-xs"
              >
                <ExternalLink size={12} /> Abrir YouTube
              </a>
            </label>
            <input
              type="text"
              required
              onChange={(e) => handleYoutubeChange(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 font-mono"
              placeholder="Ex: dQw4w9WgXcQ ou https://youtube.com/watch?v=..."
            />
            {form.youtube_video_id && (
              <p className="text-xs text-slate-400 mt-1">
                ID detectado: <span className="text-emerald-400 font-mono">{form.youtube_video_id}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Descrição da Aula</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
              placeholder="O que será abordado nesta aula..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Duração (minutos)</label>
              <input
                type="number"
                min="0"
                value={form.duration_minutes}
                onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                placeholder="Ex: 15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Ordem de exibição</label>
              <input
                type="number"
                min="0"
                value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? "Salvando..." : "Salvar Vídeo"}
            </button>
            <Link
              href={`/admin/courses/${courseId}/videos`}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>

        {/* Preview */}
        {preview && (
          <div className="w-full lg:w-80 xl:w-96 shrink-0">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <h3 className="text-slate-300 text-sm font-medium mb-3">Pré-visualização</h3>
              <div className="relative w-full rounded-lg overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${preview}?rel=0`}
                  title="preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
