'use client';

import AosWrapper from "@/components/AosWrapper";
// Não precisamos do ProjectSection aqui, pois o layout é customizado
// import ProjectSection from "@/components/ProjectSection"; 
// Removendo o import de ParticlesBackground e usando o novo componente de bolhas
import BubbleParticles from "@/components/Particles/BubbleParticles"; 

// Imagens de exemplo (mantendo as mesmas para demonstração)
import Image1Project1 from "@/public/assets/projects/project3/1.jpeg";
import Image2Project1 from "@/public/assets/projects/project3/2.jpeg";
import Image3Project1 from "@/public/assets/projects/project3/3.jpeg";

// Dados dos projetos
const projectsData = [
  {
    id: "project-1",
    title: "Instalação de Ponto Digital",
    description: "Projeto de inclusão tecnológica com instalação de pontos digitais em comunidades.",
    story: "O projeto nasceu da necessidade de aproximar jovens da tecnologia, oferecendo acesso gratuito a internet e computadores. Começou com uma equipe pequena e hoje já atende dezenas de pessoas na região de Petrolina, Pernambuco.",
    howToJoin: "Entre em contato pelo site do CRC ou participe das nossas reuniões semanais para ser voluntário e fazer a diferença em Petrolina e região!",
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
    story: "A Colônia Maker foi criada para estimular a criatividade e o aprendizado tecnológico nas férias escolares em Petrolina, oferecendo oficinas de robótica, programação e artes digitais para as crianças da nossa comunidade.",
    howToJoin: "Inscreva-se através do formulário online ou compareça às nossas oficinas abertas para garantir a vaga do seu filho na próxima Colônia Maker!",
    images: [
      { src: Image1Project1.src, alt: "Oficina de robótica" },
      { src: Image2Project1.src, alt: "Crianças programando" },
      { src: Image3Project1.src, alt: "Apresentação final do projeto" },
    ],
  },
];

export default function GaleryPage() {
  return (
    <div className="relative min-h-screen">
      {/* Fundo de partículas agora com o estilo de bolhas */}
      <div className="absolute inset-0 z-0">
        <BubbleParticles />
      </div>

      <AosWrapper>
        <div className="container mx-auto px-6 py-8 relative z-10">
          <h1 
            className="text-3xl font-bold mb-8 text-gray-900" 
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Projetos do CRC
          </h1>

          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="mb-16 p-6 border rounded-lg shadow-md bg-white"
              data-aos="fade-up"
              data-aos-delay={index * 200}
              data-aos-duration="1000"
            >
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{project.title}</h2>
              <p className="text-gray-700 mb-4">{project.description}</p>

              <div className="mb-4">
                <h3 className="font-semibold mb-1 text-gray-800">História do Projeto</h3>
                <p className="text-gray-600">{project.story}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-1 text-gray-800">Como Participar</h3>
                <p className="text-gray-600">{project.howToJoin}</p>
                <button 
                  className="mt-2 px-6 py-2 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition duration-300 transform hover:scale-105 shadow-md"
                >
                  Quero Participar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {project.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 object-cover rounded shadow-sm"
                    data-aos="zoom-in"
                    data-aos-delay={(index * 200) + (idx * 100)}
                    data-aos-duration="800"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </AosWrapper>
    </div>
  );
}