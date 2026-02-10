import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminNewsPage() {
  const supabase = await createClient();

  const { data: news } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Notícias</h1>
        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Nova Notícia</span>
        </Link>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">
                Título
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">
                Data
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-300">
                Status
              </th>
              <th className="text-right px-6 py-4 text-sm font-medium text-slate-300">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {news && news.length > 0 ? (
              news.map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {item.image_url && (
                        <img
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <span className="text-white font-medium">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(item.published_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.is_published
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {item.is_published ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/news/${item.id}`}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Pencil size={18} />
                      </Link>
                      <DeleteButton table="news" id={item.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                  Nenhuma notícia cadastrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
