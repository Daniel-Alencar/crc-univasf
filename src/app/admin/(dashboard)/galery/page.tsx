import React from "react";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Image as ImageIcon, Layout } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminGalleryPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("gallery_categories")
    .select(`
      *,
      gallery_sections (
        id,
        title,
        gallery_images (id)
      )
    `)
    .order("display_order", { ascending: true });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Gerenciar Galeria</h1>
          <p className="text-slate-400 mt-1">Organize as fotos por categorias e seções.</p>
        </div>
        <Link
          href="/admin/galery/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Nova Categoria</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <Layout size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{category.title}</h2>
                  <p className="text-slate-400 text-sm">{category.description || "Sem descrição"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/galery/edit/${category.id}`}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Edit size={20} />
                </Link>
                <DeleteButton id={category.id} table="gallery_categories" />
              </div>
            </div>
            
            <div className="p-6 bg-slate-900/30">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Seções nesta categoria</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.gallery_sections?.map((section: any) => (
                  <div key={section.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <h4 className="font-semibold text-slate-200 mb-2">{section.title}</h4>
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <ImageIcon size={14} />
                      <span>{section.gallery_images?.length || 0} imagens</span>
                    </div>
                  </div>
                ))}
                {(!category.gallery_sections || category.gallery_sections.length === 0) && (
                  <p className="text-slate-500 text-sm italic">Nenhuma seção adicionada.</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {(!categories || categories.length === 0) && (
          <div className="text-center py-12 bg-slate-800/50 border border-slate-700 border-dashed rounded-xl">
            <ImageIcon size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400">Nenhuma categoria de galeria encontrada.</p>
            <Link
              href="/admin/galery/new"
              className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-medium"
            >
              Criar primeira categoria
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
