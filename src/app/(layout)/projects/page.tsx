import AosWrapper from "@/components/AosWrapper";
import ProjectSection from "@/components/ProjectSection";

// Imagens de exemplo
import Image1Project1 from "@/public/assets/projects/project3/1.jpeg";
import Image2Project1 from "@/public/assets/projects/project3/2.jpeg";
import Image3Project1 from "@/public/assets/projects/project3/3.jpeg";

// Dados dos projetos
const projectsData = [
  {
    id: "project-1",
    title: "Instalação de Ponto Digital",
    description: "Projeto de inclusão tecnológica com instalação de pontos digitais em comunidades.",
    story: "O projeto nasceu da necessidade de aproximar jovens da tecnologia, oferecendo acesso gratuito a internet e computadores. Começou com uma equipe pequena e hoje já atende dezenas de pessoas na região.",
    howToJoin: "Entre em contato pelo site do CRC ou participe das nossas reuniões semanais para ser voluntário.",
    images: [
      { src: Image1Project1.src, alt: "Equipe instalando ponto digital" },
      { src: Image2Project1.src, alt: "Alunos utilizando computadores" },
      { src: Image3Project1.src, alt: "Espaço finalizado" },
    ],
  },
  {
    id: "project-2",
    title: "Colônia Maker",
    description: "Cursos ofertados nas férias para crianças explorarem tecnologia e criatividade.",
    story: "A Colônia Maker foi criada para estimular a criatividade e o aprendizado tecnológico nas férias escolares, oferecendo oficinas de robótica, programação e artes digitais.",
    howToJoin: "Inscreva-se através do formulário online ou compareça às nossas oficinas abertas.",
    images: [
      { src: Image1Project1.src, alt: "Oficina de robótica" },
      { src: Image2Project1.src, alt: "Crianças programando" },
      { src: Image3Project1.src, alt: "Apresentação final do projeto" },
    ],
  },
];

export default function GaleryPage() {
  return (
    <AosWrapper>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Projetos do CRC</h1>

        {projectsData.map((project) => (
          <div
            key={project.id}
            className="mb-16 p-6 border rounded-lg shadow-md bg-white"
          >
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-700 mb-4">{project.description}</p>

            <div className="mb-4">
              <h3 className="font-semibold mb-1">História do Projeto</h3>
              <p className="text-gray-600">{project.story}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-1">Como Participar</h3>
              <p className="text-gray-600">{project.howToJoin}</p>
              <button className="mt-2 px-4 py-2 bg-[#1E88E5]  text-white rounded hover:bg-[#1565C0] transition cursor-pointer">
                Quero Participar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {project.images.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover rounded"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AosWrapper>
  );
}
