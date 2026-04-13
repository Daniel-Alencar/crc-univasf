import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*, project_images(id, image_url)")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Projetos</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Novo Projeto</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden"
            >
              {project.project_images?.[0]?.image_url && (
                <img
                  src={project.project_images[0].image_url || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.is_active
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-500/20 text-slate-400"
                    }`}
                  >
                    {project.is_active ? "Ativo" : "Inativo"}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Pencil size={18} />
                    </Link>
                    <DeleteButton table="projects" id={project.id} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-slate-800 border border-slate-700 rounded-xl p-12 text-center text-slate-400">
            Nenhum projeto cadastrado
          </div>
        )}
      </div>
    </div>
  );
}
