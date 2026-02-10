'use client';

import { useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import NewsCarousel from "@/components/NewCarousel"
import AosWrapper from "@/components/AosWrapper"

// Imagens de exemplo para as notícias em destaque
import NewsImage from "@/public/assets/projects/project3/1.jpeg"

const featuredNews = [
  {
    id: 1,
    title: "Criação de autômato",
    image: NewsImage,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo diam, eget ultrices lorem. Fusce ultrices justo arcu, vitae dapibus urna tincidunt vel. Nullam porta laoreet ex, sit amet scelerisque metus pretium sit amet. Quisque vitae enim accumsan, ultricies risus et, euismod ligula.",
  },
  {
    id: 2,
    title: "Capacitação em impressão 3D",
    image: NewsImage,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo diam, eget ultrices lorem. Fusce ultrices justo arcu, vitae dapibus urna tincidunt vel. Nullam porta laoreet ex, sit amet scelerisque metus pretium sit amet. Quisque vitae enim accumsan, ultricies risus et, euismod ligula.",
  },
  {
    id: 3,
    title: "Apresentações em equipe",
    image: NewsImage,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo diam, eget ultrices lorem. Fusce ultrices justo arcu, vitae dapibus urna tincidunt vel. Nullam porta laoreet ex, sit amet scelerisque metus pretium sit amet. Quisque vitae enim accumsan, ultricies risus et, euismod ligula.",
  },
]

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AosWrapper>
      <div className="bg-white min-h-screen">
        {/* Seção para a barra de pesquisa com borda laranja */}
        <div className="container mx-auto py-4 px-4 md:px-8 flex justify-end">
          <div className="relative w-full md:w-auto max-w-md">
            <div className="flex items-center bg-orange-200 border border-orange-500 rounded-full overflow-hidden pr-2">
              <input
                type="text"
                placeholder="Pesquise uma notícia"
                className="w-full py-2 px-4 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="flex items-center">
                <Search className="h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Seção de notícias recentes com carousel */}
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
              <NewsCarousel items={featuredNews}/>
            </div>
          </div>

          {/* Seção de notícias em destaque */}
          <div className="mt-16"> 

            <div className="space-y-16">
              {/* Primeiro item - imagem à esquerda */}
              <div className="flex flex-col md:flex-row gap-8 items-center" data-aos="fade-right">
                <div className="w-full md:w-1/3">
                  <Image
                    src={featuredNews[0].image || "/placeholder.svg"}
                    alt={featuredNews[0].title}
                    className="rounded-lg w-full h-auto object-cover"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">{featuredNews[0].title}</h3>
                  <p>{featuredNews[0].description}</p>
                </div>
              </div>

              {/* Segundo item - imagem à direita */}
              <div className="flex flex-col md:flex-row-reverse gap-8 items-center" data-aos="fade-left">
                <div className="w-full md:w-1/3">
                  <Image
                    src={featuredNews[1].image || "/placeholder.svg"}
                    alt={featuredNews[1].title}
                    className="rounded-lg w-full h-auto object-cover"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">{featuredNews[1].title}</h3>
                  <p>{featuredNews[1].description}</p>
                </div>
              </div>

              {/* Terceiro item - imagem à esquerda */}
              <div className="flex flex-col md:flex-row gap-8 items-center" data-aos="fade-right">
                <div className="w-full md:w-1/3">
                  <Image
                    src={featuredNews[2].image || "/placeholder.svg"}
                    alt={featuredNews[2].title}
                    className="rounded-lg w-full h-auto object-cover"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">{featuredNews[2].title}</h3>
                  <p>{featuredNews[2].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AosWrapper>
  )
}