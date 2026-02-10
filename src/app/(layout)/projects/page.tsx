import React from "react";
import AosWrapper from "@/components/AosWrapper";
import BubbleParticles from "@/components/Particles/BubbleParticles"; 
import { createClient } from "@/lib/supabase/server";

export default async function ProjectsPage() {
  const supabase = await createClient();

  // Buscar projetos ativos com suas imagens
  const { data: projects } = await supabase
    .from("projects")
    .select(`
      *,
      project_images (*)
    `)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <BubbleParticles />
      </div>

      <AosWrapper>
        <div className="container mx-auto px-6 py-8 relative z-10">
          <h1 
            className="text-3xl font-bold mb-8 text-gray-900" 
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Projetos do CRC
          </h1>

          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <div
                key={project.id}
                className="mb-16 p-6 border rounded-lg shadow-md bg-white"
                data-aos="fade-up"
                data-aos-delay={index * 200}
                data-aos-duration="1000"
              >
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">{project.title}</h2>
                <p className="text-gray-700 mb-4">{project.description}</p>

                {project.full_description && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-1 text-gray-800">História do Projeto</h3>
                    <p className="text-gray-600 whitespace-pre-line">{project.full_description}</p>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-semibold mb-1 text-gray-800">Como Participar</h3>
                  <p className="text-gray-600">Entre em contato pelo site do CRC ou participe das nossas reuniões semanais para ser voluntário e fazer a diferença!</p>
                  <button 
                    className="mt-2 px-6 py-2 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition duration-300 transform hover:scale-105 shadow-md"
                  >
                    Quero Participar
                  </button>
                </div>

                {project.project_images && project.project_images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    {project.project_images
                      .sort((a: any, b: any) => (a.display_order || 0) - (b.display_order || 0))
                      .map((image: any, idx: number) => (
                        <img
                          key={image.id}
                          src={image.image_url}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded shadow-sm"
                          data-aos="zoom-in"
                          data-aos-delay={(index * 200) + (idx * 100)}
                          data-aos-duration="800"
                        />
                      ))
                    }
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl">
              <p className="text-gray-500">Nenhum projeto cadastrado no momento.</p>
            </div>
          )}
        </div>
      </AosWrapper>
    </div>
  );
}
