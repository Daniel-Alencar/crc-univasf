import ProjectSection from "@/components/ProjectSection"

// Usando imagens existentes do projeto para demonstração
import Image1 from "@/public/assets/projects/project1/image1.png"
import Image2 from "@/public/assets/projects/project2/image1.png"
import Image3 from "@/public/assets/projects/project2/image2.png"

// Dados de exemplo para os projetos
const projectsData = [
  {
    id: "colonia-maker",
    title: "Colônia maker",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo diam, eget ultrices lorem. Fusce ultrices justo arcu, vitae dapibus urna tincidunt vel. Nullam porta laoreet ex, sit amet scelerisque metus pretium sit amet. Quisque vitae enim accumsan, ultricies risus et, euismod ligula.",
    images: [
      { src: Image1.src, alt: "Colônia maker 1" },
      { src: Image2.src, alt: "Colônia maker 2" },
      { src: Image3.src, alt: "Colônia maker 3" },
      { src: Image1.src, alt: "Colônia maker 4" },
      { src: Image2.src, alt: "Colônia maker 5" },
      { src: Image3.src, alt: "Colônia maker 6" },
    ],
  },
  {
    id: "projeto-2",
    title: "Outro projeto",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo diam, eget ultrices lorem. Fusce ultrices justo arcu, vitae dapibus urna tincidunt vel. Nullam porta laoreet ex, sit amet scelerisque metus pretium sit amet. Quisque vitae enim accumsan, ultricies risus et, euismod ligula.",
    images: [
      { src: Image3.src, alt: "Outro projeto 1" },
      { src: Image1.src, alt: "Outro projeto 2" },
      { src: Image2.src, alt: "Outro projeto 3" },
      { src: Image3.src, alt: "Outro projeto 4" },
      { src: Image1.src, alt: "Outro projeto 5" },
      { src: Image2.src, alt: "Outro projeto 6" },
    ],
  },
  {
    id: "projeto-3",
    title: "Outro projeto",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo diam, eget ultrices lorem. Fusce ultrices justo arcu, vitae dapibus urna tincidunt vel. Nullam porta laoreet ex, sit amet scelerisque metus pretium sit amet. Quisque vitae enim accumsan, ultricies risus et, euismod ligula.",
    images: [
      { src: Image2.src, alt: "Outro projeto 1" },
      { src: Image3.src, alt: "Outro projeto 2" },
      { src: Image1.src, alt: "Outro projeto 3" },
      { src: Image2.src, alt: "Outro projeto 4" },
      { src: Image3.src, alt: "Outro projeto 5" },
      { src: Image1.src, alt: "Outro projeto 6" },
    ],
  },
]

export default function GaleryPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="sr-only">Galeria de Projetos</h1>

      {projectsData.map((project) => (
        <ProjectSection
          key={project.id}
          title={project.title}
          description={project.description}
          images={project.images}
          projectId={project.id}
        />
      ))}
    </div>
  )
}
