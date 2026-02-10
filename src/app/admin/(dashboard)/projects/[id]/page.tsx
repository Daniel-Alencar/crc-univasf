import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-8">Novo Projeto</h1>
        <ProjectForm />
      </div>
    );
  }

  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*, project_images(id, image_url, display_order)")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Editar Projeto</h1>
      <ProjectForm initialData={project} />
    </div>
  );
}
