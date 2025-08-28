'use client';

import Link from "next/link"
import ProjectCarousel from "@/components/ProjectCarousel"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectImage {
  src: string
  alt: string
}

interface ProjectSectionProps {
  title: string
  description: string
  images: ProjectImage[]
  projectId: string
}

export default function ProjectSection(
  { title, description, images }: ProjectSectionProps
) {

  const [moreImages, setMoreImages] = useState(false);

  return (
    <section className="mb-12" data-aos="fade-up">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <p className="text-gray-800 mb-4">{description}</p>

      <AnimatePresence mode="wait">
        {moreImages ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-wrap gap-4 pb-5"
          >
            {
              images.map((image, index) => (
                <div key={index} className="flex-none">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              ))
            }
          </motion.div>
        ) : (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <ProjectCarousel images={images} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex justify-start">
        <a 
          onClick={() => setMoreImages(!moreImages)} 
          className="
            text-blue-700 hover:text-blue-900 font-medium
            cursor-pointer
          ">
          {moreImages ? "Suprimir imagens" : "Ver todas as imagens"}
        </a>
      </div>
    </section>
  )
}
