"use client"

import type React from "react"
import { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NewsItem {
  id: string | number;
  title: string;
  image_url?: string;
  description: string;
}

interface NewsCarouselProps {
  items: NewsItem[];
}

const NewsCarousel = ({ items }: NewsCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  if (!items || items.length === 0) {
    return null;
  }

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
    infinite: items.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: items.length > 1,
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
        {items.map((item) => (
          <div key={item.id} className="outline-none">
            <h2 className="text-2xl font-bold mb-4 text-center">{item.title}</h2>
            <div className="flex flex-col items-center">
              <Image
                src={item.image_url || "/placeholder.svg"}
                alt={item.title}
                width={800}
                height={500}
                className="rounded-lg object-cover w-full max-h-[400px]"
              />
              <p className="mt-4 text-center max-w-2xl mx-auto">{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>

      <div className="h-10"></div>
    </div>
  )
}

export default NewsCarousel;
