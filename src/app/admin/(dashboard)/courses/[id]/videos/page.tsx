import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminCourseVideosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", id)
    .single();

  if (!course) notFound();

  const { data: videos } = await supabase
    .from("course_videos")
    .select("*")
    .eq("course_id", id)
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <Link href="/admin/courses" className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Vídeos do Curso</h1>
          <p className="text-slate-400 text-sm mt-1">{course.title}</p>
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <Link
          href={`/admin/courses/${id}/videos/new`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          Adicionar Vídeo
        </Link>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Ordem</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Título</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">YouTube ID</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Duração</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-slate-300">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {videos && videos.length > 0 ? (
              videos.map((video) => (
                <tr key={video.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4 text-slate-400 text-center w-16">{video.display_order}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtube_video_id}/default.jpg`}
                        alt={video.title}
                        className="w-16 h-12 rounded object-cover bg-slate-700"
                      />
                      <div>
                        <p className="text-white font-medium">{video.title}</p>
                        {video.description && (
                          <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{video.description}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtube_video_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-mono text-sm"
                    >
                      {video.youtube_video_id}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {video.duration_minutes ? `${video.duration_minutes} min` : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/courses/${id}/videos/${video.id}`}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Pencil size={18} />
                      </Link>
                      <DeleteButton table="course_videos" id={video.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  Nenhum vídeo cadastrado. Clique em "Adicionar Vídeo" para começar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
