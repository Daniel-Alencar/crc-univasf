"use client";

import React from "react"

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

interface ProjectImage {
  id?: string;
  image_url: string;
  display_order: number;
}

interface ProjectData {
  id?: string;
  title: string;
  description: string;
  full_description: string;
  is_active: boolean;
  display_order: number;
  project_images?: ProjectImage[];
}

export default function ProjectForm({ initialData }: { initialData?: ProjectData }) {
  const [formData, setFormData] = useState<ProjectData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    full_description: initialData?.full_description || "",
    is_active: initialData?.is_active ?? true,
    display_order: initialData?.display_order || 0,
  });
  const [images, setImages] = useState<ProjectImage[]>(
    initialData?.project_images || []
  );
  const [newImageUrl, setNewImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const addImage = () => {
    if (!newImageUrl) return;
    setImages([...images, { image_url: newImageUrl, display_order: images.length }]);
    setNewImageUrl("");
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let projectId = initialData?.id;

    if (initialData?.id) {
      const { error } = await supabase
        .from("projects")
        .update(formData)
        .eq("id", initialData.id);

      if (error) {
        setError("Erro ao atualizar projeto");
        setLoading(false);
        return;
      }

      // Delete old images and insert new ones
      await supabase
        .from("project_images")
        .delete()
        .eq("project_id", initialData.id);
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert([formData])
        .select()
        .single();

      if (error || !data) {
        setError("Erro ao criar projeto");
        setLoading(false);
        return;
      }
      projectId = data.id;
    }

    // Insert images
    if (images.length > 0 && projectId) {
      const imagesToInsert = images.map((img, index) => ({
        project_id: projectId,
        image_url: img.image_url,
        display_order: index,
      }));

      await supabase.from("project_images").insert(imagesToInsert);
    }

    router.push("/admin/projects");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <Link
        href="/admin/projects"
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

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Título *
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
            Descrição Curta *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Descrição Completa
          </label>
          <textarea
            value={formData.full_description}
            onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Imagens do Projeto
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://... (URL da imagem)"
            />
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.image_url || "/placeholder.svg"}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Ordem de Exibição
            </label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-800"
              />
              <span className="text-slate-300">Projeto ativo</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-lg transition-colors"
          >
            <Save size={20} />
            <span>{loading ? "Salvando..." : "Salvar"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
