'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import ParticlesBackground from "@/components/Particles/ParticlesBackground";
import Aos from 'aos';

interface TeamMember {
    name: string;
    category: string;
    imageUrl: string;
    linkedinUrl?: string;
    lattesUrl?: string;
    description: string;
}

const categoriesMap: { [key: string]: string } = {
    equipeCompleta: 'Equipe Completa',
    coordGeral: 'Coordenação Geral',
    coordPedagogica: 'Coordenação Pedagógica',
    artesVisuais: 'Artes Visuais e Expressão Criativa',
    manufatura: 'Manufatura Aditiva e Automação',
    comunicacao: 'Comunicação, Audiovisual e Marketing',
    coordCientifica: 'Coordenação Científica',
    capacitacao: 'Capacitação e Manutenção',
    gestao: 'Interlocução Institucional',
};

const MemberPopup = ({ member, onClose }: 
    { member: TeamMember | null; onClose: () => void }
) => {

    if (!member) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[1000] p-4" onClick={onClose}>
            <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold">
                    &times;
                </button>
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                    <div className="flex-shrink-0 mb-4 md:mb-0 max-w-sm">
                        <Image
                            src={member.imageUrl}
                            alt={member.name}
                            width={400}
                            height={400}
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <h2 className="text-3xl font-bold text-gray-900">{member.name}</h2>
                        <p className="text-lg text-orange-500 font-semibold mb-4">{categoriesMap[member.category] || member.category}</p>
                        
                        <p className="text-sm text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                            {member.description}
                        </p>
                        
                        <div className="flex justify-center md:justify-start gap-4 mt-auto">
                            {member.linkedinUrl && (
                                <Link href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white bg-blue-600 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition">
                                    <FaLinkedin /> LinkedIn
                                </Link>
                            )}
                            {member.lattesUrl && (
                                <Link href={member.lattesUrl} target="_blank" rel="noopener noreferrer" className="text-white bg-green-600 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-700 transition">
                                    <FaExternalLinkAlt /> Lattes
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function StaffClient({ initialMembers }: { initialMembers: TeamMember[] }) {
    const [selectedCategory, setSelectedCategory] = useState('equipeCompleta');
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    const filteredMembers = selectedCategory === 'equipeCompleta'
        ? initialMembers
        : initialMembers.filter(member => member.category === selectedCategory);

    return (
        <div className="relative min-h-screen bg-white overflow-hidden">
            <div className="absolute inset-0 z-0">
                <ParticlesBackground />
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12" data-aos="fade-down">
                    Nossa Equipe <span className="text-orange-500">CRC</span>
                </h1>

                {/* Filtro de Categorias */}
                <div className="flex flex-wrap justify-center gap-3 mb-16" data-aos="fade-up">
                    {Object.entries(categoriesMap).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setSelectedCategory(key)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md ${
                                selectedCategory === key
                                    ? 'bg-orange-500 text-white scale-105'
                                    : 'bg-white text-gray-700 hover:bg-orange-100'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Grid de Membros */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {filteredMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100 group"
                            data-aos="zoom-in"
                            data-aos-delay={index * 50}
                            onClick={() => setSelectedMember(member)}
                        >
                            <div className="relative h-72 w-full overflow-hidden">
                                <Image
                                    src={member.imageUrl}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                    <span className="text-white font-bold px-4 py-2 bg-orange-500 rounded-full text-sm">Ver Detalhes</span>
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">{member.name}</h3>
                                <p className="text-sm text-orange-500 font-semibold uppercase tracking-wider">
                                    {categoriesMap[member.category] || member.category}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredMembers.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-xl">Nenhum membro encontrado nesta categoria.</p>
                    </div>
                )}
            </div>

            <MemberPopup member={selectedMember} onClose={() => setSelectedMember(null)} />
        </div>
    );
}
