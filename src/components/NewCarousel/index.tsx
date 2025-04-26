"use client"

import type React from "react"

import { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Imagem de exemplo para o carrossel
import NewsImage from "@/public/assets/projects/project2/image1.png"

const newsItems = [
  {
    id: 1,
    title: "TÍTULO DA NOTÍCIA MAIS RECENTE",
    image: NewsImage,
    description:
      "Breve descrição da notícia aqui em baixo ou varias fotos das outras notícias que fazem parte deste carrossel",
  },
  {
    id: 2,
    title: "SEGUNDA NOTÍCIA IMPORTANTE",
    image: NewsImage,
    description:
      "Breve descrição da notícia aqui em baixo ou varias fotos das outras notícias que fazem parte deste carrossel",
  },
  {
    id: 3,
    title: "TERCEIRA NOTÍCIA DO DIA",
    image: NewsImage,
    description:
      "Breve descrição da notícia aqui em baixo ou varias fotos das outras notícias que fazem parte deste carrossel",
  },
]

const NewsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const PrevArrow = (props: any) => {
    const { onClick } = props
    return (
      <button
        onClick={onClick}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-[#FF6B00] text-white rounded-full w-12 h-12 flex items-center justify-center"
      >
        <ChevronLeft size={24} />
      </button>
    )
  }

  const NextArrow = (props: any) => {
    const { onClick } = props
    return (
      <button
        onClick={onClick}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-[#FF6B00] text-white rounded-full w-12 h-12 flex items-center justify-center"
      >
        <ChevronRight size={24} />
      </button>
    )
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    afterChange: (index: number) => setCurrentSlide(index),
    customPaging: (i: number) => (
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-sm font-bold ${i === currentSlide ? "bg-[#FF6B00] text-white" : "bg-[#FFB800] text-black"}`}
      >
        {i + 1}
      </div>
    ),
    dotsClass: "slick-dots flex justify-center space-x-2 mt-4",
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex justify-center gap-2 mt-4"> {dots} </ul>
      </div>
    ),
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Slider {...settings}>
        {newsItems.map((item) => (
          <div key={item.id} className="outline-none">
            <h2 className="text-2xl font-bold mb-4 text-center">{item.title}</h2>
            <div className="flex flex-col items-center">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full max-h-[400px]"
              />
              <p className="mt-4 text-center max-w-2xl mx-auto">{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>

      {/* Paginação numérica */}
      <div className="flex justify-center mt-6 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              num === currentSlide + 1 ? "bg-[#FF6B00] text-white" : "bg-[#FFB800] text-black"
            }`}
            onClick={() => setCurrentSlide(num - 1)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}

export default NewsCarousel;
