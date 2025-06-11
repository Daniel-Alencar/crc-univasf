import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import TeamMember from "@/components/TeamMember";

import Alec from '@/public/assets/staff/Alec.png';

// Dados de exemplo para os coordenadores
const coordinators = [
  {
    name: "Alec Moreira Marques",
    occupation: "Estudante",
    projectRole: "Monitor",
    linkedinUrl: "https://linkedin.com/in/alec-moreira",
    emailUrl: "mailto:alec.moreira@example.com",
    imageUrl: Alec.src,
  },
  {
    name: "Alec Moreira Marques",
    occupation: "Estudante",
    projectRole: "Monitor",
    linkedinUrl: "https://linkedin.com/in/alec-moreira-2",
    emailUrl: "mailto:alec.moreira2@example.com",
    imageUrl: Alec.src,
  },
]

// Dados de exemplo para os auxiliares
const assistants = [
  {
    name: "Alec Moreira Marques",
    occupation: "Estudante",
    projectRole: "Monitor",
    linkedinUrl: "https://linkedin.com/in/alec-moreira-3",
    emailUrl: "mailto:alec.moreira3@example.com",
    imageUrl: Alec.src,
  },
  {
    name: "Alec Moreira Marques",
    occupation: "Estudante",
    projectRole: "Monitor",
    linkedinUrl: "https://linkedin.com/in/alec-moreira-4",
    emailUrl: "mailto:alec.moreira4@example.com",
    imageUrl: Alec.src,
  },
  {
    name: "Alec Moreira Marques",
    occupation: "Estudante",
    projectRole: "Monitor",
    linkedinUrl: "https://linkedin.com/in/alec-moreira-5",
    emailUrl: "mailto:alec.moreira5@example.com",
    imageUrl: Alec.src,
  },
  {
    name: "Alec Moreira Marques",
    occupation: "Estudante",
    projectRole: "Monitor",
    linkedinUrl: "https://linkedin.com/in/alec-moreira-6",
    emailUrl: "mailto:alec.moreira6@example.com",
    imageUrl: Alec.src,
  },
  {
    name: "Alec Moreira Marques",
    occupation: "Estudante",
    projectRole: "Monitor",
    linkedinUrl: "https://linkedin.com/in/alec-moreira-7",
    emailUrl: "mailto:alec.moreira7@example.com",
    imageUrl: Alec.src,
  },
  {
    name: "Alec Moreira Marques",
    occupation: "Estudante",
    projectRole: "Monitor",
    linkedinUrl: "https://linkedin.com/in/alec-moreira-8",
    emailUrl: "mailto:alec.moreira8@example.com",
    imageUrl: Alec.src,
  },
]

export default function StaffPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Equipe CRC</h1>

      <p className="text-gray-800 mb-12 max-w-4xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et commodo diam, eget ultrices lorem. Fusce
        ultrices justo arcu, vitae dapibus urna tincidunt vel. Nullam porta laoreet ex, sit amet scelerisque metus
        pretium sit amet. Quisque vitae enim accumsan, ultricies risus et, euismod ligula.
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
            />
          ))}
        </div>
      </section>

      {/* Seção Auxiliares */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Auxiliares</h2>

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
            />
          ))}
        </div>
      </section>
    </div>
  )
}
