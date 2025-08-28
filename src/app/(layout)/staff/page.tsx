'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AosWrapper from "@/components/AosWrapper";
import ParticlesBackground from "@/components/Particles/ParticlesBackground";

// Importações de todas as imagens da equipe
import Alec from '@/public/assets/staff/Alec.jpeg';
import AnaLarissa from '@/public/assets/staff/Ana Larissa.jpeg';
import Daniel from '@/public/assets/staff/Daniel.jpeg';
import Gabriel from '@/public/assets/staff/Gabriel.jpeg';
import Fernanda from '@/public/assets/staff/Fernanda.jpeg';
import Flora from '@/public/assets/staff/Flora.jpeg';
import HenriqueTakashi from '@/public/assets/staff/Henrique Takashi.jpeg';
import Jackson from '@/public/assets/staff/Jackson.jpeg';
import Jaldo from '@/public/assets/staff/Jaldo.jpg';
import LuizCarlos from '@/public/assets/staff/Luiz Carlos.jpeg';
import Marcia from '@/public/assets/staff/Marcia.jpeg';
import Sabino from '@/public/assets/staff/Sabino.jpeg';
import Sileide from '@/public/assets/staff/Sileide.jpeg';
import Simone from '@/public/assets/staff/Simone.jpeg';
import Thiago from '@/public/assets/staff/Thiago.jpeg';
import Weslley from '@/public/assets/staff/Weslley.jpeg';
import Flavio from '@/public/assets/staff/Flavio.jpeg';
import FernandaSabrina from '@/public/assets/staff/Fernanda Sabrina.jpeg';
import Ericles from '@/public/assets/staff/Ericles.jpeg';
import Wesckley from '@/public/assets/staff/Wesckley.jpeg'
import LuciaMarisy from '@/public/assets/staff/Lucia.jpeg'
import Lara from '@/public/assets/staff/Lara.jpeg'
// Futuros imports de imagens
//import Clecia from '@/public/assets/staff/Clecia.jpeg'
//import ArthurVinicius from '@/public/assets/staff/Arthur.jpeg'
//import FernandoAlves from '@/public/assets/staff/Fernando.jpeg'
//import Vitoria from '@/public/assets/staff/Vitoria.jpeg'
//import Arauna from '@/public/assets/staff/Arauna.jpeg'

// Estrutura de dados com a categoria de cada membro
const teamMembers = [
    // Coordenadores
    {
        name: "Márcia Bento Moreira",
        occupation: "Servidora Pública na UNIVASF",
        projectRole: "Coordenadora Geral",
        linkedinUrl: "www.linkedin.com/in/marcia-bento-moreira-964b6078",
        lattesUrl: "",
        emailUrl: "mailto:marcia.moreira@univasf.edu.br",
        imageUrl: Marcia.src,
        category: 'coordenadores',
    },
    {
        name: "Lucia Marisy",
        occupation: "Vice-Reitora",
        projectRole: "Coordenadora",
        imageUrl: LuciaMarisy.src,
        category: 'coordenadores',
    },
    {
        name: "Jaldo Pereira Lopes",
        occupation: "Técnico em Telecomunicações",
        projectRole: "Coordenador Técnico",
        linkedinUrl: "http://www.linkedin.com/in/jaldo-lopes-24a7041a0",
        emailUrl: "mailto:jaldo.lopes@univasf.edu.br",
        imageUrl: Jaldo.src,
        category: 'coordenadores',
    },

    // Professores
    {
        name: "Henrique Takashi Idogava",
        occupation: "Professor da UNIVASF",
        projectRole: "Professor colaborador",
        linkedinUrl: "https://www.linkedin.com/in/henriquetakashi/",
        emailUrl: "mailto:henrique.idogava@univasf.edu.br",
        imageUrl: HenriqueTakashi.src,
        category: 'professores',
    },
    {
        name: "Flora Romanelli Assumpção",
        occupation: "Professora de Artes Visuais",
        projectRole: "Colaboradora",
        lattesUrl: "http://lattes.cnpq.br/2919589905571219",
        emailUrl: "mailto:flora.assumpcao@univasf.edu.br",
        imageUrl: Flora.src,
        category: 'professores',
    },
    {
        name: "Clecia Simone Gonçalves Rosa Pacheco",
        occupation: "Docente do IFSertão PE",
        projectRole: "Coordenação de Pesquisa",
        linkedinUrl: "https://br.linkedin.com/in/clecia-pacheco-28217973",
        emailUrl: "mailto:clecia.pacheco@gmail.com",
        imageUrl: Simone.src,
        category: 'professores',
    },
    {
        name: "Weslley Darlyson da Silva",
        occupation: "Professor",
        projectRole: "Equipe estratégica",
        lattesUrl: "http://lattes.cnpq.br/9137986535767419",
        emailUrl: "mailto:⁠weslleydarlyson@hotmail.com",
        imageUrl: Weslley.src,
        category: 'professores',
    },
    {
        name: "Luiz Carlos Dantas Souza",
        occupation: "Técnico em TI e Recondicionamento de equipamentos",
        projectRole: "Professor de Hardware, Manutenção e recondicionamento de computadores",
        linkedinUrl: "https://www.linkedin.com/in/luiz-carlos-dantas-souza-3449491bb",
        emailUrl: "mailto:luiz.ifbajua@gmail.com",
        imageUrl: LuizCarlos.src,
        category: 'professores',
    },
    {
        name: "Thiago Batista de Sousa",
        occupation: "Integrante do CRC Univasf",
        projectRole: "Técnico de apoio ao usuário de informática/professor de Educação Ambiental",
        lattesUrl: "https://lattes.cnpq.br/1290738666797047",
        emailUrl: "mailto:dthiagobatista@gmail.com",
        imageUrl: Thiago.src,
        category: 'professores',
    },

    // Estudantes Bolsistas
    {
        name: "Alec Moreira Marques",
        occupation: "Estudante de Engenharia da Computação",
        projectRole: "Monitor e Desenvolvedor",
        linkedinUrl: "https://www.linkedin.com/in/alec-moreira-marques-4a3137241",
        emailUrl: "mailto:alec.marques@discente.univasf.edu.br",
        imageUrl: Alec.src,
        category: 'estudantes',
    },
    {
        name: "Daniel Alencar Penha Carvalho",
        occupation: "Estudante de Engenharia da Computação",
        projectRole: "Monitor e Desenvolvedor",
        linkedinUrl: "https://www.linkedin.com/in/daniel746",
        emailUrl: "mailto:daniel.apcarvalho@discente.univasf.edu.br",
        imageUrl: Daniel.src,
        category: 'estudantes',
    },
    {
        name: "Gabriel Dias Ferraz",
        occupation: "Estudante de Engenharia Mecânica",
        projectRole: "Monitor",
        emailUrl: "mailto:gabriel.diasferraz2001@gmail.com",
        linkedinUrl: "https://www.linkedin.com/in/gabriel-dias-9a2536266",
        imageUrl: Gabriel.src,
        category: 'estudantes',
    },
    {
        name: "Ana Larissa",
        occupation: "Estudante",
        projectRole: "Mídia/Instagram",
        linkedinUrl: "https://www.linkedin.com/in/ana-larissa-bezerra-a37b80145/",
        emailUrl: "mailto:larissa.ana1244@gmail.com",
        imageUrl: AnaLarissa.src,
        category: 'estudantes',
    },
    {
        name: "Fernanda Erie Yamaguchi",
        occupation: "Estudante de Administração",
        projectRole: "Auxiliar Administrativo",
        linkedinUrl: "www.linkedin.com/in/fernanda-erie-yamaguchi-950b13223",
        emailUrl: "mailto:yamaguchierie@gmail.com",
        imageUrl: Fernanda.src,
        category: 'estudantes',
    },
    {
        name: "Wesckley",
        occupation: "Estudante",
        projectRole: "Monitor",
        imageUrl: Wesckley.src,
        category: 'estudantes',
    },
    {
        name: "Lara",
        occupation: "Estudante",
        projectRole: "Monitor",
        imageUrl: Lara.src,
        category: 'estudantes',
    },
    // Futuros membros - Remova os comentários para ativá-los
    /*
    {
        name: "Clecia",
        occupation: "Estudante",
        projectRole: "Monitor",
        imageUrl: Clecia.src,
        category: 'estudantes',
    },
    {
        name: "Arthur Vinicius",
        occupation: "Estudante",
        projectRole: "Monitor",
        imageUrl: ArthurVinicius.src,
        category: 'estudantes',
    },
    {
        name: "Fernando Alves",
        occupation: "Estudante",
        projectRole: "Monitor",
        imageUrl: FernandoAlves.src,
        category: 'estudantes',
    },
    {
        name: "Vitoria",
        occupation: "Estudante",
        projectRole: "Monitor",
        imageUrl: Vitoria.src,
        category: 'estudantes',
    },
    {
        name: "Arauna",
        occupation: "Estudante",
        projectRole: "Monitor",
        imageUrl: Arauna.src,
        category: 'estudantes',
    },
    */
    
    // Contratados
    {
        name: "Jackson Pereira Lopes",
        occupation: "Técnico em informática",
        projectRole: "Manutenção de computadores, professor de Hardware e Software, instalação de PID",
        emailUrl: "mailto:jacksonpereiralopes@gmail.com",
        imageUrl: Jackson.src,
        category: 'contratados',
    },
    {
        name: "Flávio Rocha",
        occupation: "Técnico de Apoio ao usuário de Informática",
        projectRole: "Técnico de Informática",
        emailUrl: "mailto:flaviorocha.crc@gmail.com",
        imageUrl: Flavio.src,
        category: 'contratados',
    },
    {
        name: "Antônio Sabino da Silva Filho",
        occupation: "Assistente em Administração da Univasf",
        projectRole: "Colaborador Técnico",
        linkedinUrl: "www.linkedin.com/in/antonio-sabino-da-silva-filho-b5a950136",
        lattesUrl: "http://lattes.cnpq.br/0942230017489612",
        emailUrl: "mailto:antonio.sabino@univasf.edu.br",
        imageUrl: Sabino.src,
        category: 'contratados',
    },
    {
        name: "Fernanda Sabrina",
        occupation: "Assistente Administrativa",
        projectRole: "Secretaria",
        emailUrl: "mailto:fernandast.silva@gmail.com",
        imageUrl: FernandaSabrina.src,
        category: 'contratados',
    },

    // Voluntários
    {
        name: "Éricles da Silva Medrado",
        occupation: "Engenheiro Agrônomo",
        projectRole: "Equipe de educação ambiental",
        emailUrl: "mailto:ericlesmedrado@gmail.com",
        linkedinUrl: "https://br.linkedin.com/in/ericles-medrado",
        imageUrl: Ericles.src,
        category: 'voluntarios',
    },
    {
        name: "Sileide Dias das Neves",
        occupation: "Colaborador",
        projectRole: "Colaborador",
        emailUrl: "mailto:sileided.neves@gmail.com",
        imageUrl: Sileide.src,
        category: 'voluntarios',
    },
];

// O tipo de índice abaixo resolve o erro do TypeScript
const categoryDescriptions: { [key: string]: string } = {
    equipeCompleta: `Nada do que o CRC realiza seria possível sem uma equipe dedicada e apaixonada. Somos estudantes, professores, voluntários e profissionais unidos pelo propósito de levar tecnologia a quem mais precisa. Juntos, tornamos real a inclusão digital com afeto, criatividade e compromisso social.`,
    coordenadores: `A liderança por trás da visão do CRC. Nossos **coordenadores** são os guias estratégicos que traçam o caminho, garantem a execução dos projetos e inspiram a equipe a alcançar novos patamares de impacto social.`,
    estudantes: `A energia e inovação que movem o projeto. Nossos **estudantes bolsistas** são a prova de que a prática transforma a teoria em realidade, aplicando seus conhecimentos para desenvolver soluções criativas e recondicionar equipamentos com dedicação.`,
    professores: `Os mentores que semeiam o conhecimento. Os **professores** trazem sua vasta experiência para a equipe, capacitando os estudantes e garantindo que cada ação do projeto tenha uma base sólida de aprendizado e excelência técnica.`,
    voluntarios: `O coração solidário do nosso trabalho. Nossos **voluntários** dedicam tempo e talento de forma altruísta, fortalecendo a equipe e expandindo nosso alcance para comunidades, escolas e projetos que mais precisam.`,
    contratados: `O pilar de suporte operacional e técnico. Os **profissionais contratados** garantem que as operações do dia a dia funcionem sem falhas, cuidando da logística, da manutenção e da infraestrutura essencial para todas as nossas iniciativas.`,
};

export default function StaffPage() {
    // Estado para controlar a categoria de equipe selecionada
    const [activeCategory, setActiveCategory] = useState('equipeCompleta');

    // Mapeamento das categorias para nomes de exibição e valores
    const categories = [
        { name: 'Equipe Completa', value: 'equipeCompleta' },
        { name: 'Coordenadores', value: 'coordenadores' },
        { name: 'Estudantes Bolsistas', value: 'estudantes' },
        { name: 'Professores', value: 'professores' },
        { name: 'Voluntários', value: 'voluntarios' },
        { name: 'Contratados', value: 'contratados' },
    ];

    // Filtra os membros da equipe com base na categoria ativa
    const filteredTeam = activeCategory === 'equipeCompleta'
        ? teamMembers
        : teamMembers.filter(member => member.category === activeCategory);

    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0 z-0">
                <ParticlesBackground />
            </div>
            <AosWrapper>
                <div className="container mx-auto px-6 py-8 relative z-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Equipe CRC</h1>

                    <p className="text-gray-800 mb-8">
                        {/* Descrição inicial da página */}
                        Nada do que o CRC realiza — das doações de computadores às oficinas da Colônia Maker — seria possível sem uma equipe dedicada e apaixonada. Somos estudantes, professores e voluntários unidos pelo propósito de levar tecnologia a quem mais precisa, seja em comunidades indígenas, quilombolas ou escolas públicas. Cada integrante contribui com seu talento: uns recondicionam máquinas, outros ensinam informática, coordenam oficinas ou pensam a logística por trás das ações. Juntos, tornamos real o que seria apenas intenção: inclusão digital com afeto, criatividade e compromisso social.
                    </p>
                    
                    {/* Botões de filtro */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setActiveCategory(cat.value)}
                                className={`
                                    px-6 py-2 rounded-full font-semibold transition-colors duration-300
                                    ${activeCategory === cat.value
                                        ? 'bg-orange-500 text-white shadow-lg'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }
                                `}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                    
                    {/* Descrição engajada da categoria */}
                    <p className="text-lg text-gray-700 text-center mb-10">
                        {categoryDescriptions[activeCategory]}
                    </p>

                    {/* Título da seção filtrada */}
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                        {categories.find(c => c.value === activeCategory)?.name}
                    </h2>

                    {/* Grade de membros filtrada */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredTeam.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-6 border-4 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:scale-105"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-gray-300">
                                    <Image
                                        src={member.imageUrl}
                                        alt={member.name}
                                        width={128}
                                        height={128}
                                        objectFit="cover"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 text-center">{member.name}</h3>
                                <p className="text-sm text-gray-600 text-center">{member.projectRole}</p>

                                <div className="mt-4 text-center">
                                    {member.linkedinUrl && (
                                        <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
                                            LinkedIn
                                        </Link>
                                    )}
                                    {member.lattesUrl && (
                                        <Link href={member.lattesUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-orange-500 hover:underline">
                                            Lattes
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </AosWrapper>
        </div>
    );
}