import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import NewsCarousel from "@/components/NewCarousel";
import AosWrapper from "@/components/AosWrapper";
import { createClient } from "@/lib/supabase/server";

export default async function NewsPage() {
  const supabase = await createClient();

  // Buscar notícias publicadas ordenadas pela data de publicação
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  // Pegar as 3 notícias mais recentes para o carrossel
  const carouselNews = news?.slice(0, 3) || [];
  // O restante das notícias para a listagem abaixo
  const listNews = news?.slice(3) || [];

  return (
    <AosWrapper>
      <div className="bg-white min-h-screen">
        {/* Seção para a barra de pesquisa */}
        <div className="container mx-auto py-4 px-4 md:px-8 flex justify-end">
          <div className="relative w-full md:w-auto max-w-md">
            {/* 
            <div className="flex items-center bg-orange-200 border border-orange-500 rounded-full overflow-hidden pr-2">
              <input
                type="text"
                placeholder="Pesquise uma notícia"
                className="w-full py-2 px-4 outline-none"
              />
              <div className="flex items-center">
                <Search className="h-5 text-gray-400" />
              </div>
            </div> 
            */}
          </div>
        </div>
        
        {/* Seção de notícias recentes com carousel */}
        {carouselNews.length > 0 && (
          <div className="container mx-auto py-8 px-4" data-aos="fade-right">
            <div className="relative mb-16">
              <div className="absolute -left-4 top-12 z-10" data-aos="zoom-in">
                <div className="bg-[#00A0E3] text-white font-bold rounded-full p-4 flex items-center justify-center w-24 h-24 relative">
                  <span className="text-2xl">NEW</span>
                  <span className="absolute text-3xl text-[#FF6B00] font-bold" style={{ right: "2px", top: "5px" }}>
                    +
                  </span>
                </div>
              </div>

              <div className="border-2 border-gray-300 rounded-lg bg-white p-4 ml-8">
                <NewsCarousel items={carouselNews} />
              </div>
            </div>
          </div>
        )}

        {/* Seção de notícias em destaque */}
        <div className="container mx-auto py-8 px-4">
          <div className="mt-8"> 
            <div className="space-y-16">
              {listNews.length > 0 ? (
                listNews.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`} 
                    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  >
                    <div className="w-full md:w-1/3">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.title}
                        className="rounded-lg w-full h-auto object-cover aspect-video"
                        width={400}
                        height={300}
                      />
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-gray-700 mb-4">{item.description}</p>
                      {item.external_link && (
                        <a 
                          href={item.external_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-orange-500 font-semibold hover:underline"
                        >
                          Leia mais →
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                carouselNews.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      Nenhuma notícia publicada no momento.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </AosWrapper>
  );
}
