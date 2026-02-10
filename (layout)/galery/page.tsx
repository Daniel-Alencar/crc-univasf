import ProjectSection from "@/components/ProjectSection"
import AosWrapper from "@/components/AosWrapper"

// Projeto 1
import Image1Project1 from "@/public/assets/projects/project3/1.jpeg";
import Image2Project1 from "@/public/assets/projects/project3/2.jpeg";
import Image3Project1 from "@/public/assets/projects/project3/3.jpeg";
import Image4Project1 from "@/public/assets/projects/project3/4.jpeg";
import Image5Project1 from "@/public/assets/projects/project3/5.jpeg";

// Projeto 2
import Image1Project2 from "@/public/assets/projects/project4/maker1.jpg";
import Image2Project2 from "@/public/assets/projects/project4/maker2.jpg";
import Image3Project2 from "@/public/assets/projects/project4/maker3.jpg";
import Image4Project2 from "@/public/assets/projects/project4/maker4.jpg";
import Image5Project2 from "@/public/assets/projects/project4/maker5.jpg";
import Image6Project2 from "@/public/assets/projects/project4/maker6.jpg";
import Image7Project2 from "@/public/assets/projects/project4/maker7.jpg";

// Projeto 3
import Image1Project3 from "@/public/assets/projects/project5/11.jpeg";
import Image2Project3 from "@/public/assets/projects/project5/12.jpeg";
import Image3Project3 from "@/public/assets/projects/project5/13.jpeg";
import Image4Project3 from "@/public/assets/projects/project5/14.jpeg";
import Image5Project3 from "@/public/assets/projects/project5/15.jpeg";

// Projeto 4
import Image1Project4 from "@/public/assets/projects/project6/16.jpeg";
import Image2Project4 from "@/public/assets/projects/project6/17.jpeg";
import Image3Project4 from "@/public/assets/projects/project6/18.jpeg";
import Image4Project4 from "@/public/assets/projects/project6/19.jpeg";
import Image5Project4 from "@/public/assets/projects/project6/20.jpeg";
import Image6Project4 from "@/public/assets/projects/project6/21.jpeg";
import Image7Project4 from "@/public/assets/projects/project6/22.jpeg";
import Image8Project4 from "@/public/assets/projects/project6/23.jpeg";
import Image9Project4 from "@/public/assets/projects/project6/24.jpeg";
import Image10Project4 from "@/public/assets/projects/project6/25.jpeg";

// Projeto 5
import Image1Project5 from "@/public/assets/projects/project7/26.jpeg";
import Image2Project5 from "@/public/assets/projects/project7/27.jpeg";
import Image3Project5 from "@/public/assets/projects/project7/28.jpeg";
import Image4Project5 from "@/public/assets/projects/project7/29.jpeg";
import Image5Project5 from "@/public/assets/projects/project7/30.jpeg";
import Image6Project5 from "@/public/assets/projects/project7/31.jpeg";
import Image7Project5 from "@/public/assets/projects/project7/32.jpeg";
import Image8Project5 from "@/public/assets/projects/project7/33.jpeg";
import Image9Project5 from "@/public/assets/projects/project7/34.jpeg";
import Image10Project5 from "@/public/assets/projects/project7/35.jpeg";
import Image11Project5 from "@/public/assets/projects/project7/36.jpeg";
import Image12Project5 from "@/public/assets/projects/project7/37.jpeg";
import Image13Project5 from "@/public/assets/projects/project7/38.jpeg";
import Image14Project5 from "@/public/assets/projects/project7/39.jpeg";
import Image15Project5 from "@/public/assets/projects/project7/40.jpeg";
import Image16Project5 from "@/public/assets/projects/project7/41.jpeg";
import Image17Project5 from "@/public/assets/projects/project7/42.jpeg";
import Image18Project5 from "@/public/assets/projects/project7/43.jpeg";
import Image19Project5 from "@/public/assets/projects/project7/44.jpeg";
import Image20Project5 from "@/public/assets/projects/project7/45.jpeg";

const projectsData = [
  {
    id: "project-1",
    title: "Entrega de Computadores",
    description:
      "",
    versions: [
      {
        title: "Entrega de Computadores para a Acenibra",
        description: "Doação de 10 computadores a ACENIBRA - Associação Nipobrasileira de Juazeiro/BA.",
        images: [
          { src: Image1Project1.src, alt: "Entrega ACENIBRA 1" },
          { src: Image2Project1.src, alt: "Entrega ACENIBRA 2" },
          { src: Image3Project1.src, alt: "Entrega ACENIBRA 3" },
          { src: Image4Project1.src, alt: "Entrega ACENIBRA 4" },
          { src: Image5Project1.src, alt: "Entrega ACENIBRA 5" },
        ],
      },
    ],
  },
  {
    id: "projeto-2",
    title: "Colônia Maker",
    description: "",
    versions: [
      {
        title: "Colônia Maker (Janeiro 2025)",
        description: "Aulas de cursos diversos da colônia maker.",
        images: [
          { src: Image1Project2.src, alt: "Colônia maker 1" },
          { src: Image2Project2.src, alt: "Colônia maker 2" },
          { src: Image3Project2.src, alt: "Colônia maker 3" },
          { src: Image4Project2.src, alt: "Colônia maker 4" },
          { src: Image5Project2.src, alt: "Colônia maker 5" },
          { src: Image6Project2.src, alt: "Colônia maker 6" },
          { src: Image7Project2.src, alt: "Colônia maker 7" },
        ],
      },
    ],
  },
  {
    id: "projeto-3",
    title: "Reuniões do CRC",
    description: "",
    versions: [
      {
        title: "Primeira reunião da nova equipe CRC de 2025",
        description: "A nova equipe do CRC realiza sua primeira reunião.",
        images: [
          { src: Image1Project3.src, alt: "Reunião CRC 1" },
          { src: Image2Project3.src, alt: "Reunião CRC 2" },
          { src: Image3Project3.src, alt: "Reunião CRC 3" },
          { src: Image4Project3.src, alt: "Reunião CRC 4" },
          { src: Image5Project3.src, alt: "Reunião CRC 5" },
        ],
      },
      {
        title: "Reunião gerencial no MCom",
        description: "Reunião gerencial no MCom em Brasília 2024.",
        images: [
          { src: Image1Project5.src, alt: "Reunião MCom 1" },
          { src: Image2Project5.src, alt: "Reunião MCom 2" },
          { src: Image3Project5.src, alt: "Reunião MCom 3" },
          { src: Image4Project5.src, alt: "Reunião MCom 4" },
          { src: Image5Project5.src, alt: "Reunião MCom 5" },
          { src: Image6Project5.src, alt: "Reunião MCom 6" },
          { src: Image7Project5.src, alt: "Reunião MCom 7" },
          { src: Image8Project5.src, alt: "Reunião MCom 8" },
          { src: Image9Project5.src, alt: "Reunião MCom 9" },
          { src: Image10Project5.src, alt: "Reunião MCom 10" },
          { src: Image11Project5.src, alt: "Reunião MCom 11" },
          { src: Image12Project5.src, alt: "Reunião MCom 12" },
          { src: Image13Project5.src, alt: "Reunião MCom 13" },
          { src: Image14Project5.src, alt: "Reunião MCom 14" },
          { src: Image15Project5.src, alt: "Reunião MCom 15" },
          { src: Image16Project5.src, alt: "Reunião MCom 16" },
          { src: Image17Project5.src, alt: "Reunião MCom 17" },
          { src: Image18Project5.src, alt: "Reunião MCom 18" },
          { src: Image19Project5.src, alt: "Reunião MCom 19" },
          { src: Image20Project5.src, alt: "Reunião MCom 20" },
        ],
      }
    ],
  },
  {
    id: "projeto-4",
    title:
      "Entrega de microchips",
    description:
      "",
    versions: [
      {
        title: "Entrega de microchips às escolas estaduais de Petrolina e Juazeiro ",
        description: "Entrega de 15.000 microchips e 800 computadores às escolas estaduais. O evento ocorreu no Cineteatro de Petrolina.",
        images: [
          { src: Image1Project4.src, alt: "Evento chips 1" },
          { src: Image2Project4.src, alt: "Evento chips 2" },
          { src: Image3Project4.src, alt: "Evento chips 3" },
          { src: Image4Project4.src, alt: "Evento chips 4" },
          { src: Image5Project4.src, alt: "Evento chips 5" },
          { src: Image6Project4.src, alt: "Evento chips 6" },
          { src: Image7Project4.src, alt: "Evento chips 7" },
          { src: Image8Project4.src, alt: "Evento chips 8" },
          { src: Image9Project4.src, alt: "Evento chips 9" },
          { src: Image10Project4.src, alt: "Evento chips 10" },
        ],
      },
    ],
  },
]

export default function GaleryPage() {
  return (
    <AosWrapper>
      <div className="container mx-auto px-6 py-8">
        <h1 className="sr-only">Galeria de Projetos</h1>

        {projectsData.map((project) => (
          <div key={project.id} className="mb-10">
            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
            <p className="mb-6">{project.description}</p>

            {project.versions.map((version, idx) => (
              <ProjectSection
                key={`${project.id}-version-${idx}`}
                title={version.title}
                description={version.description}
                images={version.images}
                projectId={`${project.id}-version-${idx}`}
              />
            ))}
          </div>
        ))}
      </div>
    </AosWrapper>
  )
}
