"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

interface CourseVideo {
  id: string;
  title: string;
  description: string | null;
  youtube_video_id: string;
  duration_minutes: number | null;
  display_order: number;
}

export default function VideoEditForm({
  video,
  courseId,
}: {
  video: CourseVideo;
  courseId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: video.title,
    description: video.description ?? "",
    youtube_video_id: video.youtube_video_id,
    duration_minutes: video.duration_minutes?.toString() ?? "",
    display_order: video.display_order,
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const parseYoutubeId = (input: string): string => {
    const urlMatch = input.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return urlMatch ? urlMatch[1] : input.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error: err } = await supabase
      .from("course_videos")
      .update({
        title: form.title,
        description: form.description || null,
        youtube_video_id: parseYoutubeId(form.youtube_video_id),
        duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
        display_order: Number(form.display_order),
      })
      .eq("id", video.id);

    setLoading(false);
    if (err) { setError(err.message); return; }
    setSuccess(true);
    router.refresh();
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
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">{error}</div>}
      {success && <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400">Vídeo atualizado com sucesso!</div>}

      <div className="flex flex-col lg:flex-row gap-6">
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-5 flex-1 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Título *</label>
            <input type="text" required value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">ID ou URL do YouTube *</label>
            <input type="text" required value={form.youtube_video_id}
              onChange={(e) => setForm({ ...form, youtube_video_id: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 font-mono" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Descrição</label>
            <textarea rows={3} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Duração (minutos)</label>
              <input type="number" min="0" value={form.duration_minutes}
                onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Ordem de exibição</label>
              <input type="number" min="0" value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="pt-2 flex gap-3">
            <button type="submit" disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50">
              <Save size={18} />
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>
            <Link href={`/admin/courses/${courseId}/videos`}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
              Cancelar
            </Link>
          </div>
        </form>

        {/* Preview */}
        <div className="w-full lg:w-80 xl:w-96 shrink-0">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <h3 className="text-slate-300 text-sm font-medium mb-3">Pré-visualização</h3>
            <div className="relative w-full rounded-lg overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
              <iframe
                src={`https://www.youtube.com/embed/${parseYoutubeId(form.youtube_video_id)}?rel=0`}
                title="preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
