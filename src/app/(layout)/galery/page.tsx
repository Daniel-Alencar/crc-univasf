import React from "react";
import ProjectSection from "@/components/ProjectSection";
import AosWrapper from "@/components/AosWrapper";
import { createClient } from "@/lib/supabase/server";

export default async function GaleryPage() {
  const supabase = await createClient();

  // Buscar categorias da galeria com suas seções e imagens
  const { data: categories } = await supabase
    .from("gallery_categories")
    .select(`
      *,
      gallery_sections (
        *,
        gallery_images (*)
      )
    `)
    .order("display_order", { ascending: true });

  return (
    <AosWrapper>
      <div className="container mx-auto px-6 py-8">
        <h1 className="sr-only">Galeria de Projetos</h1>

        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="mb-10">
              <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
              {category.description && <p className="mb-6 text-gray-700">{category.description}</p>}

              {category.gallery_sections
                ?.sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
                .map((section: any) => (
                  <ProjectSection
                    key={section.id}
                    title={section.title}
                    description={section.description || ""}
                    images={section.gallery_images
                      ?.sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
                      .map((img: any) => ({
                        src: img.image_url,
                        alt: img.alt_text || section.title
                      })) || []
                    }
                    projectId={section.id}
                  />
                ))
              }
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">Nenhum conteúdo na galeria no momento.</p>
          </div>
        )}
      </div>
    </AosWrapper>
  );
}
