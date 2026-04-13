"use client";

import React from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, ArrowLeft, Plus, X, Trash2, Layout } from "lucide-react";
import Link from "next/link";

interface GalleryImage {
  id?: string;
  image_url: string;
  alt_text?: string;
  display_order: number;
}

interface GallerySection {
  id?: string;
  title: string;
  description: string;
  display_order: number;
  images: GalleryImage[];
}

interface GalleryCategory {
  id?: string;
  title: string;
  description: string;
  display_order: number;
  sections?: GallerySection[];
}

export default function GalleryForm({ initialData }: { initialData?: GalleryCategory }) {
  const [formData, setFormData] = useState<GalleryCategory>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    display_order: initialData?.display_order || 0,
  });

  const [sections, setSections] = useState<GallerySection[]>(
    initialData?.sections || []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const addSection = () => {
    const newSection: GallerySection = {
      title: "",
      description: "",
      display_order: sections.length,
      images: [],
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSection = (index: number, data: Partial<GallerySection>) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], ...data };
    setSections(newSections);
  };

  const addImageToSection = (sectionIndex: number, url: string) => {
    if (!url) return;
    const newSections = [...sections];
    newSections[sectionIndex].images.push({
      image_url: url,
      display_order: newSections[sectionIndex].images.length,
    });
    setSections(newSections);
  };

  const removeImageFromSection = (sectionIndex: number, imageIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].images = newSections[sectionIndex].images.filter(
      (_, i) => i !== imageIndex
    );
    setSections(newSections);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let categoryId = initialData?.id;

      // 1. Save Category
      if (categoryId) {
        const { error: catError } = await supabase
          .from("gallery_categories")
          .update({
            title: formData.title,
            description: formData.description,
            display_order: formData.display_order,
          })
          .eq("id", categoryId);

        if (catError) throw catError;

        // Clean up old sections (simplified approach: delete and recreate)
        await supabase.from("gallery_sections").delete().eq("category_id", categoryId);
      } else {
        const { data: catData, error: catError } = await supabase
          .from("gallery_categories")
          .insert([{
            title: formData.title,
            description: formData.description,
            display_order: formData.display_order,
          }])
          .select()
          .single();

        if (catError) throw catError;
        categoryId = catData.id;
      }

      // 2. Save Sections and Images
      if (categoryId && sections.length > 0) {
        for (const [sIndex, section] of sections.entries()) {
          const { data: sData, error: sError } = await supabase
            .from("gallery_sections")
            .insert([{
              category_id: categoryId,
              title: section.title,
              description: section.description,
              display_order: sIndex,
            }])
            .select()
            .single();

          if (sError) throw sError;

          if (section.images.length > 0) {
            const imagesToInsert = section.images.map((img, iIndex) => ({
              section_id: sData.id,
              image_url: img.image_url,
              display_order: iIndex,
            }));
            const { error: iError } = await supabase.from("gallery_images").insert(imagesToInsert);
            if (iError) throw iError;
          }
        }
      }

      router.push("/admin/galery");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao salvar galeria");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl">
      <Link
        href="/admin/galery"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Voltar para lista</span>
      </Link>

      {error && (
        <div className="p-4 mb-6 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {/* Category Info */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layout className="text-blue-500" />
            Informações da Categoria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Título da Categoria * (Ex: Eventos 2024)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Ordem
              </label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Descrição da Categoria
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Seções de Fotos</h2>
            <button
              type="button"
              onClick={addSection}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm"
            >
              <Plus size={18} />
              <span>Adicionar Seção</span>
            </button>
          </div>

          {sections.map((section, sIndex) => (
            <div key={sIndex} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <input
                    type="text"
                    placeholder="Título da Seção (Ex: Entrega de Certificados)"
                    value={section.title}
                    onChange={(e) => updateSection(sIndex, { title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Descrição da seção (opcional)"
                    value={section.description}
                    onChange={(e) => updateSection(sIndex, { description: e.target.value })}
                    rows={1}
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeSection(sIndex)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* Images in Section */}
              <div className="space-y-4 pt-2 border-t border-slate-700/50">
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="URL da imagem para esta seção"
                    className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addImageToSection(sIndex, (e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      const input = e.currentTarget.previousSibling as HTMLInputElement;
                      addImageToSection(sIndex, input.value);
                      input.value = "";
                    }}
                    className="px-4 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg transition-colors text-sm font-medium"
                  >
                    Adicionar
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {section.images.map((img, iIndex) => (
                    <div key={iIndex} className="relative group aspect-square">
                      <img
                        src={img.image_url}
                        alt="Gallery item"
                        className="w-full h-full object-cover rounded-lg border border-slate-700"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageFromSection(sIndex, iIndex)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {sections.length === 0 && (
            <div className="text-center py-12 bg-slate-800/30 border border-dashed border-slate-700 rounded-xl">
              <p className="text-slate-500">Nenhuma seção adicionada ainda.</p>
              <button
                type="button"
                onClick={addSection}
                className="mt-2 text-blue-400 hover:text-blue-300 font-medium"
              >
                Criar primeira seção
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-700">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
          >
            <Save size={20} />
            <span>{loading ? "Salvando Galeria..." : "Salvar Galeria Completa"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
