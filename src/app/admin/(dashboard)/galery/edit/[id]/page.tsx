import React from "react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import GalleryForm from "@/components/admin/GalleryForm";

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch category with its sections and images
  const { data: category } = await supabase
    .from("gallery_categories")
    .select(`
      *,
      sections:gallery_sections (
        *,
        images:gallery_images (*)
      )
    `)
    .eq("id", id)
    .single();

  if (!category) {
    notFound();
  }

  // Ensure data is sorted for the form
  if (category.sections) {
    category.sections.sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0));
    category.sections.forEach((section: any) => {
      if (section.images) {
        section.images.sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0));
      }
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Editar Galeria</h1>
        <p className="text-slate-400 mt-1">Atualize as informações, seções e imagens desta categoria.</p>
      </div>

      <GalleryForm initialData={category} />
    </div>
  );
}
