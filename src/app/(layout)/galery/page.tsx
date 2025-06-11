import ProjectSection from "@/components/ProjectSection"

// Projeto 1
import Image1Project1 from "@/public/assets/projects/project3/1.jpeg";
import Image2Project1 from "@/public/assets/projects/project3/2.jpeg";
import Image3Project1 from "@/public/assets/projects/project3/3.jpeg";
import Image4Project1 from "@/public/assets/projects/project3/4.jpeg";
import Image5Project1 from "@/public/assets/projects/project3/5.jpeg";

// Projeto 2
import Image1Project2 from "@/public/assets/projects/project4/6.jpeg";
import Image2Project2 from "@/public/assets/projects/project4/7.jpeg";
import Image3Project2 from "@/public/assets/projects/project4/8.jpeg";
import Image4Project2 from "@/public/assets/projects/project4/9.jpeg";
import Image5Project2 from "@/public/assets/projects/project4/10.jpeg";

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
    title: "Projeto 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo diam, eget ultrices lorem. Fusce ultrices justo arcu, vitae dapibus urna tincidunt vel. Nullam porta laoreet ex, sit amet scelerisque metus pretium sit amet. Quisque vitae enim accumsan, ultricies risus et, euismod ligula.",
    images: [
      { src: Image1Project1.src, alt: "Colônia maker 1" },
      { src: Image2Project1.src, alt: "Colônia maker 2" },
      { src: Image3Project1.src, alt: "Colônia maker 3" },
      { src: Image4Project1.src, alt: "Colônia maker 4" },
      { src: Image5Project1.src, alt: "Colônia maker 5" },
    ],
  },
  {
    id: "projeto-2",
    title: "Projeto 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo diam, eget ultrices lorem. Fusce ultrices justo arcu, vitae dapibus urna tincidunt vel. Nullam porta laoreet ex, sit amet scelerisque metus pretium sit amet. Quisque vitae enim accumsan, ultricies risus et, euismod ligula.",
    images: [
      { src: Image1Project2.src, alt: "Outro projeto 1" },
      { src: Image2Project2.src, alt: "Outro projeto 2" },
      { src: Image3Project2.src, alt: "Outro projeto 3" },
      { src: Image4Project2.src, alt: "Outro projeto 4" },
      { src: Image5Project2.src, alt: "Outro projeto 5" },
    ],
  },
  {
    id: "projeto-3",
    title: "Projeto 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo diam, eget ultrices lorem. Fusce ultrices justo arcu, vitae dapibus urna tincidunt vel. Nullam porta laoreet ex, sit amet scelerisque metus pretium sit amet. Quisque vitae enim accumsan, ultricies risus et, euismod ligula.",
    images: [
      { src: Image1Project3.src, alt: "Outro projeto 1" },
      { src: Image2Project3.src, alt: "Outro projeto 2" },
      { src: Image3Project3.src, alt: "Outro projeto 3" },
      { src: Image4Project3.src, alt: "Outro projeto 4" },
      { src: Image5Project3.src, alt: "Outro projeto 5" },
    ],
  },
  {
    id: "projeto-4",
    title: "Projeto 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo diam, eget ultrices lorem. Fusce ultrices justo arcu, vitae dapibus urna tincidunt vel. Nullam porta laoreet ex, sit amet scelerisque metus pretium sit amet. Quisque vitae enim accumsan, ultricies risus et, euismod ligula.",
    images: [
      { src: Image1Project4.src, alt: "Outro projeto 1" },
      { src: Image2Project4.src, alt: "Outro projeto 1" },
      { src: Image3Project4.src, alt: "Outro projeto 1" },
      { src: Image4Project4.src, alt: "Outro projeto 1" },
      { src: Image5Project4.src, alt: "Outro projeto 1" },
      { src: Image6Project4.src, alt: "Outro projeto 1" },
      { src: Image7Project4.src, alt: "Outro projeto 1" },
      { src: Image8Project4.src, alt: "Outro projeto 1" },
      { src: Image9Project4.src, alt: "Outro projeto 1" },
      { src: Image10Project4.src, alt: "Outro projeto 1" },
    ],
  },
  {
    id: "projeto-5",
    title: "Projeto 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo diam, eget ultrices lorem. Fusce ultrices justo arcu, vitae dapibus urna tincidunt vel. Nullam porta laoreet ex, sit amet scelerisque metus pretium sit amet. Quisque vitae enim accumsan, ultricies risus et, euismod ligula.",
    images: [
      { src: Image1Project5.src, alt: "Outro projeto 1" },
      { src: Image2Project5.src, alt: "Outro projeto 1" },
      { src: Image3Project5.src, alt: "Outro projeto 1" },
      { src: Image4Project5.src, alt: "Outro projeto 1" },
      { src: Image5Project5.src, alt: "Outro projeto 1" },
      { src: Image6Project5.src, alt: "Outro projeto 1" },
      { src: Image7Project5.src, alt: "Outro projeto 1" },
      { src: Image8Project5.src, alt: "Outro projeto 1" },
      { src: Image9Project5.src, alt: "Outro projeto 1" },
      { src: Image10Project5.src, alt: "Outro projeto 1" },
      { src: Image11Project5.src, alt: "Outro projeto 1" },
      { src: Image12Project5.src, alt: "Outro projeto 1" },
      { src: Image13Project5.src, alt: "Outro projeto 1" },
      { src: Image14Project5.src, alt: "Outro projeto 1" },
      { src: Image15Project5.src, alt: "Outro projeto 1" },
      { src: Image16Project5.src, alt: "Outro projeto 1" },
      { src: Image17Project5.src, alt: "Outro projeto 1" },
      { src: Image18Project5.src, alt: "Outro projeto 1" },
      { src: Image19Project5.src, alt: "Outro projeto 1" },
      { src: Image20Project5.src, alt: "Outro projeto 1" },
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
