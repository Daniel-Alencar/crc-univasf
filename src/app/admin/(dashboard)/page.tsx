import { createClient } from "@/lib/supabase/server";
import { Newspaper, FolderKanban, Users } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: newsCount },
    { count: projectsCount },
    { count: teamCount },
  ] = await Promise.all([
    supabase.from("news").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("team_members").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      label: "Notícias",
      count: newsCount || 0,
      icon: Newspaper,
      href: "/admin/news",
      color: "bg-blue-500",
    },
    {
      label: "Projetos",
      count: projectsCount || 0,
      icon: FolderKanban,
      href: "/admin/projects",
      color: "bg-emerald-500",
    },
    {
      label: "Membros da Equipe",
      count: teamCount || 0,
      icon: Users,
      href: "/admin/team",
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {stat.count}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/news/new"
            className="flex items-center gap-3 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
          >
            <Newspaper size={20} />
            <span>Adicionar Notícia</span>
          </Link>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-3 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
          >
            <FolderKanban size={20} />
            <span>Adicionar Projeto</span>
          </Link>
          <Link
            href="/admin/team/new"
            className="flex items-center gap-3 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
          >
            <Users size={20} />
            <span>Adicionar Membro</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
