import Link from "next/link"
import ProjectCarousel from "@/components/ProjectCarousel"

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

export default function ProjectSection({ title, description, images, projectId }: ProjectSectionProps) {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      </div>

      <p className="text-gray-800 mb-4">{description}</p>

      <ProjectCarousel images={images} />

      <div className="flex justify-end">
        <Link href={`/projects/${projectId}`} className="text-blue-700 hover:text-blue-900 font-medium">
          Ver mais &gt;&gt;&gt;
        </Link>
      </div>
    </section>
  )
}
