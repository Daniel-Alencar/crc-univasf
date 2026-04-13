import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminTeamPage() {
  const supabase = await createClient();

  const { data: members } = await supabase
    .from("team_members")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Equipe</h1>
        <Link
          href="/admin/team/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Novo Membro</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {members && members.length > 0 ? (
          members.map((member) => (
            <div
              key={member.id}
              className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden"
            >
              {member.image_url ? (
                <img
                  src={member.image_url || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-slate-700 flex items-center justify-center">
                  <span className="text-4xl text-slate-500">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-400 text-sm mb-2">{member.role}</p>
                <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                  {member.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.is_active
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-500/20 text-slate-400"
                    }`}
                  >
                    {member.is_active ? "Ativo" : "Inativo"}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/team/${member.id}`}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Pencil size={18} />
                    </Link>
                    <DeleteButton table="team_members" id={member.id} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-slate-800 border border-slate-700 rounded-xl p-12 text-center text-slate-400">
            Nenhum membro cadastrado
          </div>
        )}
      </div>
    </div>
  );
}
