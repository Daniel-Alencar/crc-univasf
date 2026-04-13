import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Pencil, Video } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminCoursesPage() {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from("courses")
    .select(`*, course_videos(count)`)
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Cursos</h1>
        <Link
          href="/admin/courses/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Novo Curso</span>
        </Link>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Título</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Categoria</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Vídeos</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">Status</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-slate-300">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {course.thumbnail_url ? (
                        <img
                          src={course.thumbnail_url}
                          alt={course.title}
                          className="w-14 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-14 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <Video size={20} className="text-orange-400" />
                        </div>
                      )}
                      <span className="text-white font-medium">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{course.category ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-400">
                    {course.course_videos?.[0]?.count ?? 0} vídeo(s)
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.is_published
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {course.is_published ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/courses/${course.id}/videos`}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                        title="Gerenciar vídeos"
                      >
                        <Video size={18} />
                      </Link>
                      <Link
                        href={`/admin/courses/${course.id}`}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                        title="Editar curso"
                      >
                        <Pencil size={18} />
                      </Link>
                      <DeleteButton table="courses" id={course.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  Nenhum curso cadastrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
