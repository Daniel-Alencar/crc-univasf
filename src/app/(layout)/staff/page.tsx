import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import TeamMember from "@/components/TeamMember";

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

// Dados de exemplo para os coordenadores
const coordinators = [
  {
    name: "Márcia Bento Moreira",
    occupation: "Servidora Pública na UNIVASF",
    projectRole: "Coordenadora Geral",
    linkedinUrl: "www.linkedin.com/in/marcia-bento-moreira-964b6078",
    lattesUrl: "",
    emailUrl: "mailto:marcia.moreira@univasf.edu.br",
    imageUrl: Marcia.src,
  },
]

// Dados de exemplo para os auxiliares
const assistants = [
  {
    name: "Henrique Takashi Idogava",
    occupation: "Professor da UNIVASF",
    projectRole: "Professor colaborador",
    linkedinUrl: "https://www.linkedin.com/in/henriquetakashi/",
    emailUrl: "mailto:henrique.idogava@univasf.edu.br",
    imageUrl: HenriqueTakashi.src,
  },
  {
    name: "Flora Romanelli Assumpção",
    occupation: "Professora de Artes Visuais",
    projectRole: "Colaboradora",
    lattesUrl: "http://lattes.cnpq.br/2919589905571219",
    emailUrl: "mailto:flora.assumpcao@univasf.edu.br",
    imageUrl: Flora.src,
  },
  {
    name: "Clecia Simone Gonçalves Rosa Pacheco",
    occupation: "Docente do IFSertão PE",
    projectRole: "Coordenação de Pesquisa",
    linkedinUrl: "https://br.linkedin.com/in/clecia-pacheco-28217973",
    emailUrl: "mailto:clecia.pacheco@gmail.com",
    imageUrl: Simone.src,
  },
  {
    name: "Weslley Darlyson da Silva",
    occupation: "Professor",
    projectRole: "Equipe estratégica",
    lattesUrl: "http://lattes.cnpq.br/9137986535767419",
    emailUrl: "mailto:⁠weslleydarlyson@hotmail.com",
    imageUrl: Weslley.src,
  },
  {
    name: "Jaldo Pereira Lopes",
    occupation: "Técnico em Telecomunicações",
    projectRole: "Coordenador Técnico",
    linkedinUrl: "http://www.linkedin.com/in/jaldo-lopes-24a7041a0",
    emailUrl: "mailto:jaldo.lopes@univasf.edu.br",
    imageUrl: Jaldo.src,
  },
  {
    name: "Jackson Pereira Lopes",
    occupation: "Técnico em informática",
    projectRole: "Manutenção de computadores, professor de Hardware e Software, instalação de PID",
    emailUrl: "mailto:jacksonpereiralopes@gmail.com",
    imageUrl: Jackson.src,
  },
  {
    name: "Luiz Carlos Dantas Souza",
    occupation: "Técnico em TI e Recondicionamento de equipamentos",
    projectRole: "Professor de Hardware, Manutenção e recondicionamento de computadores",
    linkedinUrl: "https://www.linkedin.com/in/luiz-carlos-dantas-souza-3449491bb",
    emailUrl: "mailto:luiz.ifbajua@gmail.com",
    imageUrl: LuizCarlos.src,
  },
  {
    name: "Flávio Rocha",
    occupation: "Técnico de Apoio ao usuário de Informática",
    projectRole: "Técnico de Informática",
    emailUrl: "mailto:flaviorocha.crc@gmail.com",
    imageUrl: Flavio.src,
  },
  {
    name: "Antônio Sabino da Silva Filho",
    occupation: "Assistente em Administração da Univasf",
    projectRole: "Colaborador Técnico",
    linkedinUrl: "www.linkedin.com/in/antonio-sabino-da-silva-filho-b5a950136",
    lattesUrl: "http://lattes.cnpq.br/0942230017489612",
    emailUrl: "mailto:antonio.sabino@univasf.edu.br",
    imageUrl: Sabino.src,
  },
  {
    name: "Sileide Dias das Neves",
    occupation: "Colaborador",
    projectRole: "Colaborador",
    emailUrl: "mailto:sileided.neves@gmail.com",
    imageUrl: Sileide.src,
  },
  {
    name: "Thiago Batista de Sousa",
    occupation: "Integrante do CRC Univasf",
    projectRole: "Técnico de apoio ao usuário de informática/professor de Educação Ambiental",
    lattesUrl: "https://lattes.cnpq.br/1290738666797047",
    emailUrl: "mailto:dthiagobatista@gmail.com",
    imageUrl: Thiago.src,
  },
  {
    name: "Fernanda Erie Yamaguchi",
    occupation: "Estudante de Administração",
    projectRole: "Auxiliar Administrativo",
    linkedinUrl: "www.linkedin.com/in/fernanda-erie-yamaguchi-950b13223",
    emailUrl: "mailto:yamaguchierie@gmail.com",
    imageUrl: Fernanda.src,
  },
  {
    name: "Alec Moreira Marques",
    occupation: "Estudante de Engenharia da Computação",
    projectRole: "Monitor e Desenvolvedor",
    linkedinUrl: "https://www.linkedin.com/in/alec-moreira-marques-4a3137241",
    emailUrl: "mailto:alec.marques@discente.univasf.edu.br",
    imageUrl: Alec.src,
  },
  {
    name: "Daniel Alencar Penha Carvalho",
    occupation: "Estudante de Engenharia da Computação",
    projectRole: "Monitor e Desenvolvedor",
    linkedinUrl: "https://www.linkedin.com/in/daniel746",
    emailUrl: "mailto:daniel.apcarvalho@discente.univasf.edu.br",
    imageUrl: Daniel.src,
  },
  {
    name: "Gabriel Dias Ferraz",
    occupation: "Estudante de Engenharia Mecânica",
    projectRole: "Monitor",
    emailUrl: "mailto:gabriel.diasferraz2001@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/gabriel-dias-9a2536266",
    imageUrl: Gabriel.src,
  },
  {
    name: "Ana Larissa",
    occupation: "Estudante",
    projectRole: "Mídia/Instagram",
    linkedinUrl: "https://www.linkedin.com/in/ana-larissa-bezerra-a37b80145/",
    emailUrl: "mailto:larissa.ana1244@gmail.com",
    imageUrl: AnaLarissa.src,
  },
]

export default function StaffPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Equipe CRC</h1>

      <p className="text-gray-800 mb-12">
        Nada do que o CRC realiza — das doações de computadores às oficinas da Colônia Maker — seria possível sem uma equipe dedicada e apaixonada. Somos estudantes, professores e voluntários unidos pelo propósito de levar tecnologia a quem mais precisa, seja em comunidades indígenas, quilombolas ou escolas públicas. Cada integrante contribui com seu talento: uns recondicionam máquinas, outros ensinam informática, coordenam oficinas ou pensam a logística por trás das ações. Juntos, tornamos real o que seria apenas intenção: inclusão digital com afeto, criatividade e compromisso social.
      </p>

      {/* Seção Coordenadores */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Coordenadores</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coordinators.map((coordinator, index) => (
            <TeamMember
              key={`coordinator-${index}`}
              name={coordinator.name}
              occupation={coordinator.occupation}
              projectRole={coordinator.projectRole}
              linkedinUrl={coordinator.linkedinUrl}
              emailUrl={coordinator.emailUrl}
              imageUrl={coordinator.imageUrl}
              lattesUrl={coordinator.lattesUrl}
            />
          ))}
        </div>
      </section>

      {/* Seção Auxiliares */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Colaboradores</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assistants.map((assistant, index) => (
            <TeamMember
              key={`assistant-${index}`}
              name={assistant.name}
              occupation={assistant.occupation}
              projectRole={assistant.projectRole}
              linkedinUrl={assistant.linkedinUrl}
              emailUrl={assistant.emailUrl}
              imageUrl={assistant.imageUrl}
              lattesUrl={assistant.lattesUrl}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
