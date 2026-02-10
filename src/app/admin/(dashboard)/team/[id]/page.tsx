import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import TeamMemberForm from "@/components/admin/TeamMemberForm";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-8">Novo Membro</h1>
        <TeamMemberForm />
      </div>
    );
  }

  const supabase = await createClient();
  const { data: member } = await supabase
    .from("team_members")
    .select("*")
    .eq("id", id)
    .single();

  if (!member) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Editar Membro</h1>
      <TeamMemberForm initialData={member} />
    </div>
  );
}
