"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import AosWrapper from "../AosWrapper"

interface ProjectImage {
  src: string
  alt: string
}

interface ProjectCarouselProps {
  images: ProjectImage[]
}

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleImages, setVisibleImages] = useState(4)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateVisibleImages = () => {
      if (window.innerWidth < 640) {
        setVisibleImages(1)
      } else if (window.innerWidth < 768) {
        setVisibleImages(2)
      } else if (window.innerWidth < 1024) {
        setVisibleImages(3)
      } else {
        setVisibleImages(4)
      }
    }

    updateVisibleImages()
    window.addEventListener("resize", updateVisibleImages)
    return () => window.removeEventListener("resize", updateVisibleImages)
  }, [])

  const totalSlides = Math.max(0, images.length - visibleImages + 1)

  const nextSlide = () => {
    if (currentIndex < images.length - visibleImages) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex < images.length - visibleImages

  return (
    <AosWrapper>
      <div className="relative w-full my-6">
        <div className="flex items-center">
          <button
            onClick={prevSlide}
            className={`absolute left-0 z-10 p-2 rounded-full bg-orange-500 text-white ${
              !canScrollLeft ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="w-full overflow-hidden" ref={containerRef}>
            <div
              className="flex transition-transform duration-300 ease-in-out gap-4"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleImages)}%)` }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-none"
                  style={{ 
                    width: `calc(${100 / visibleImages}% - ${((visibleImages - 1) * 16) / visibleImages}px)` 
                  }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className={`absolute right-0 z-10 p-2 rounded-full bg-orange-500 text-white ${
              !canScrollRight ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
            disabled={!canScrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </AosWrapper>
  )
}
