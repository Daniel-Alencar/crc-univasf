'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AosWrapper from "@/components/AosWrapper";
import ParticlesBackground from "@/components/Particles/ParticlesBackground";
import { FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import Aos from 'aos';

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
import Clecia from '@/public/assets/staff/Simone.jpeg';
import Thiago from '@/public/assets/staff/Thiago.jpeg';
import Weslley from '@/public/assets/staff/Weslley.jpeg';
import Flavio from '@/public/assets/staff/Flavio.jpeg';
import FernandaSabrina from '@/public/assets/staff/Fernanda Sabrina.jpeg';
import Ericles from '@/public/assets/staff/Ericles.jpeg';
import Wesckley from '@/public/assets/staff/Wesckley.jpeg';
import LuciaMarisy from '@/public/assets/staff/Lucia.jpeg';
import Lara from '@/public/assets/staff/Lara.jpeg';
//import ArthurVinicius from '@/public/assets/staff/Arthur.jpeg';
//import FernandoAlves from '@/public/assets/staff/Fernando.jpeg';
import Vitoria from '@/public/assets/staff/Vitoria.jpeg';
//import Arauna from '@/public/assets/staff/Arauna.jpeg';
import Emanuelly from '@/public/assets/staff/Emanuelly.jpeg';

// Interface para definir o tipo de cada membro da equipe
interface TeamMember {
    name: string;
    category: string;
    imageUrl: string;
    linkedinUrl?: string;
    lattesUrl?: string;
    description: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Márcia Bento Moreira",
        category: 'coordGeral',
        imageUrl: Marcia.src,
        linkedinUrl: "https://www.linkedin.com/in/marcia-bento-moreira-964b6078",
        lattesUrl: "",
        description: `Professora de Medicina Veterinária e co-idealizadora do CRC-Univasf, atua na articulação com povos originários, comunidades tradicionais, agricultores familiares, assentados do MST e escolas públicas, fortalecendo a inclusão digital como instrumento de transformação social. Representa o CRC em eventos nacionais e internacionais, promovendo a divulgação de suas ações e resultados. Lidera a equipe técnica e especializada, de bolsistas e colaboradores voluntários, acompanhando todo o processo: desde o recebimento das doações e recondicionamento dos computadores até a montagem dos pontos de inclusão digital, a realização das capacitações e a celebração das formaturas, com ou sem a presença do MCom. É responsável pelo gerenciamento institucional do CRC junto à FADURPE e à UNIVASF, assegurando a captação de recursos, a execução das atividades, a prestação de contas e a inovação dos processos. Participa das reuniões gerenciais no MCom e responde pela condução estratégica e inovadora do projeto, garantindo sua expansão e impacto social.`,
    },
    {
        name: "Lucia Marisy Souza Ribeiro de Oliveira",
        category: 'coordPedagogica',
        imageUrl: LuciaMarisy.src,
        description: `Idealizadora do CRC-Univasf, foi a força visionária que deu início ao projeto e o conduziu em seus primeiros anos, articulando comunidades, instituições e lideranças. Hoje, como Vice-Reitora da UNIVASF, segue próxima ao CRC na Coordenação Pedagógica, deixando marcada sua contribuição como pilar fundamental da nossa história e inspiração para o futuro.`,
    },
    {
        name: "Weslley",
        category: 'coordPedagogica',
        imageUrl: Weslley.src,
        lattesUrl: "http://lattes.cnpq.br/9137986535767419",
        description: `É graduado em Ciências da Natureza (UNIVASF), graduando em Ciências Biológicas e mestrando em Dinâmicas de Desenvolvimento do Semiárido (UNIVASF), com pesquisas voltadas ao ensino de Ciências e à educação contextualizada no Semiárido. Integra a equipe do CRC-Univasf atuando junto à coordenação pedagógica na condução das capacitações em inclusão digital. É o elo com escolas e secretarias de educação, mobilizando estudantes e professores para capacitações presenciais e remotas; além de apoiar na implantação dos pontos de inclusão digital nas escolas. Na Colônia Maker, conduz processos criativos de aprendizagem e colabora na organização de eventos e formaturas do CRC. Sua marca é a criatividade, comunicação e a capacidade de conectar tecnologia, ciência e comunidade, transformando iniciativas de inclusão digital em experiências educativas de impacto social.`,
    },
    {
        name: "Flora Assumpção",
        category: 'artesVisuais',
        imageUrl: Flora.src,
        lattesUrl: "http://lattes.cnpq.br/2919589905571219",
        description: `Artista plástica e Professora de Artes Visuais na Univasf, em suas aulas trabalha com pesquisa de materiais para a criação de obras no campo da tridimensionalidade com reuso de materiais alternativos. É responsável pela parte artística e cultural do CRC, auxilia na expressão criativa dos jovens durante a colônia Maker, coordena a equipe de Artes visuais e Expressão Criativa no CRC.`,
    },
    {
        name: "Weskley",
        category: 'artesVisuais',
        imageUrl: Wesckley.src,
        description: `aluno de artes visuais da Univasf, membro da equipe de Artes Visuais e Expressão Criativa; membro voluntário no CRC, com conhecimentos em informática básica e software; atua como monitor nos cursos presenciais do CRC e na Colônia Maker.`,
    },
    {
        name: "Henrique Takashi",
        category: 'manufatura',
        imageUrl: HenriqueTakashi.src,
        linkedinUrl: "https://www.linkedin.com/in/henriquetakashi/",
        description: `Professor de Engenharia Mecânica, Coordenador do Projeto Cactus Rockets Design de foguetemodelismo e responsável pelo laboratório multiusuário NIMA (Núcleo Interdisciplinar de Manufatura Aditiva) da Univasf; responsável pela equipe de Manufatura aditiva e Automação no CRC, com destaque para Impressão 3D, Scanners e Óculos de Realidade Virtual. ministra cursos no CRC (presenciais e remotos), inclusive na colônia Maker;`,
    },
    {
        name: "Daniel Alencar",
        category: 'manufatura',
        imageUrl: Daniel.src,
        linkedinUrl: "https://www.linkedin.com/in/daniel746",
        description: `Estudante de Engenharia da Computação, líder da equipe do Projeto Cactus Rockets Design de foguetemodelismo na Univasf, é desenvolvedor, com expertise em: Web Designer, IoT, Engenharia Criativa e Drones. No CRC é responsável pela criação e manutenção do Site e da Plataforma Digital que hospeda nossos cursos virtuais; faz parte da equipe “Manufatura Aditiva e Automação”, coordenada pelo Prof. Henrique Takashi; ministra cursos virtuais e atua como monitor na Colônia Maker.`,
    },
    {
        name: "Alec Moreira Marques",
        category: 'manufatura',
        imageUrl: Alec.src,
        linkedinUrl: "https://www.linkedin.com/in/alec-moreira-marques-4a3137241",
        description: `Estudante da Engenharia da Computação na Univasf, membro da equipe Projeto Cactus Rockets Design de foguetemodelismo na Univasf; é desenvolvedor, com expertise em Web Designer, IoT e Visão Computacional. No CRC atua como monitor nos cursos presenciais e remotos; é responsável pela criação e manutenção do Site e da Plataforma Digital que hospeda nossos cursos virtuais; faz parte da equipe “Manufatura Aditiva e Automação”, coordenada pelo Prof. Henrique Takashi; ministra cursos virtuais e atua como monitor na Colônia Maker.`,
    },
    {
        name: "Gabriel",
        category: 'manufatura',
        imageUrl: Gabriel.src,
        linkedinUrl: "https://www.linkedin.com/in/gabriel-dias-9a2536266",
        description: `Estudante da Engenharia Mecânica na Univasf, especialista em Impressão 3D. No CRC faz parte da equipe “Manufatura Aditiva e Automação”, coordenada pelo Prof. Henrique Takashi; ministra cursos (presenciais e remotos); bem como, é monitor nas capacitações presenciais, incluindo a Colônia Maker; auxilia nas atividades de instalação dos pontos de inclusão digital e nas formaturas.`,
    },
    {
        name: "Jaldo Pereira Lopes",
        category: 'comunicacao',
        imageUrl: Jaldo.src,
        linkedinUrl: "http://www.linkedin.com/in/jaldo-lopes-24a7041a0",
        description: `Diretor da TV Caatinga; é responsável pela produção audiovisual do CRC-Univasf, coordenando a criação de vídeos, notícias, matérias e coberturas especiais. Coordena a equipe técnica de Comunicação, Audiovisual e Marketing, garantindo visibilidade às ações e resultados do centro. Sua atuação vai além da comunicação: participa da montagem dos Pontos de Inclusão Digital (PID), contribui nas capacitações de hardware e software, apoia o chamamento de turmas e colabora na Colônia Maker, desenvolvendo atividades com drones e óculos de realidade virtual. Reconhecido por unir criatividade e tecnologia, amplia o alcance e o impacto social do CRC.`,
    },
    /*{
        name: "Arthur Vinicius",
        category: 'comunicacao',
        imageUrl: ArthurVinicius.src,
        description: `Integrante da equipe técnica de Comunicação, Audiovisual e Marketing do CRC-Univasf; atua como social mídia, responsável pela criação de conteúdos, notícias e matérias para as redes sociais, com ou sem entrevistas. Faz parte do grupo que registra e divulga as atividades do CRC, garantindo presença digital e aproximando o público das ações e resultados do centro. Sua atuação fortalece a visibilidade institucional e o diálogo com a comunidade.`,
    },
    {
        name: "Carlos Arauna",
        category: 'comunicacao',
        imageUrl: Arauna.src,
        description: `Integrante da equipe técnica de Comunicação, Audiovisual e Marketing do CRC-Univasf; atua como cinegrafista, registrando em vídeo e fotografia as atividades do centro. Com olhar criativo e sensibilidade técnica, contribui para transformar ações e projetos em narrativas visuais que ampliam a visibilidade e o impacto social do CRC.`,
    },
    {
        name: "Fernando",
        category: 'comunicacao',
        imageUrl: FernandoAlves.src,
        description: `Jornalista da equipe técnica de Comunicação, Audiovisual e Marketing do CRC-Univasf; responsável pela elaboração de matérias, entrevistas e coberturas jornalísticas que registram e divulgam as ações do centro. Sua atuação contribui para fortalecer a comunicação institucional e aproximar a sociedade das iniciativas de inclusão sociodigital e transformação social promovidas pelo CRC.`,
    }, */
    {
        name: "Emanuelly",
        category: 'comunicacao',
        imageUrl: Emanuelly.src,
        description: `Estudante de Medicina Veterinária e Presidente da Mandrágora, compõe a equipe de Comunicação, Audiovisual e Marketing do CRC-Univasf. É responsável pelo registro de atividades por meio de fotos, vídeos e depoimentos, bem como pela organização e sistematização desse material no drive institucional. Além disso, contribui na criação das artes e peças gráficas que compõem a identidade visual do CRC, fortalecendo a presença digital e a divulgação das ações. Faz parte do grupo que administra o Instagram do CRC e atua com expertise em ferramentas como Canva, Instagram, YouTube, Streamyard e edição de vídeos, garantindo a presença digital e a aproximação do público às iniciativas do centro. Atua também como monitora nos cursos e na Colônia Maker, ministrando formações sobre redes sociais e apoiando processos pedagógicos, unindo criatividade, técnica e engajamento social.`,
    },
    {
        name: "Lara",
        category: 'comunicacao',
        imageUrl: Lara.src,
        description: `Estudante de Ciências Biológicas, integra a equipe de Comunicação, Audiovisual e Marketing do CRC-Univasf, registrando em fotos, vídeos e depoimentos as atividades do centro e organizando esse material no drive institucional e redes sociais. Além disso, contribui na criação das artes e peças gráficas que compõem a identidade visual do CRC, fortalecendo a presença digital e a divulgação das ações. Faz parte do grupo que administra o Instagram do CRC e atua com expertise em ferramentas como Canva, Instagram e YouTube, garantindo a presença digital e a aproximação do público às iniciativas do centro. Atua ainda como monitora nos cursos e na Colônia Maker, ministrando aulas presenciais e remotas sobre redes sociais, contribuindo para aproximar tecnologia, ciência e comunidade.`,
    },
    {
        name: "Ana Larissa",
        category: 'comunicacao',
        imageUrl: AnaLarissa.src,
        linkedinUrl: "https://www.linkedin.com/in/ana-larissa-bezerra-a37b80145/",
        description: `Estudante de Medicina Veterinária e integrante da Mandrágora, especialista em redes sociais e compõe a equipe de Comunicação, Audiovisual e Marketing do CRC-Univasf. Atua como monitora nos cursos presenciais, remotos e na Colônia Maker, confecciona certificados, cuida da identidade visual do centro e ministra formações sobre redes sociais e ferramentas digitais. Faz parte do grupo que administra o Instagram do CRC e atua com expertise em ferramentas como Canva, Instagram e YouTube, garantindo a presença digital e a aproximação do público às iniciativas do centro. Com domínio em Excel e forte atuação em gestão de mídias, alia organização e criatividade para fortalecer a presença digital e ampliar o alcance das ações do CRC.`,
    },
    {
        name: "Victória Louise",
        category: 'comunicacao',
        imageUrl: Vitoria.src,
        description: `Estudante de Medicina Veterinária, faz parte da equipe de Comunicação, Audiovisual e Marketing do CRC-Univasf, colaborando com registros audiovisuais, organização e divulgação das ações do centro. Como monitora, participa dos cursos e da Colônia Maker, ministrando aulas sobre redes sociais e fortalecendo a integração entre formação tecnológica, inclusão digital e cidadania.`,
    },
    {
        name: "Clécia Pacheco",
        category: 'coordCientifica',
        imageUrl: Clecia.src,
        linkedinUrl: "https://br.linkedin.com/in/clecia-pacheco-28217973",
        description: `Docente do IFSertão-PE, geógrafa e escritor; alia ciência, sensibilidade e compromisso socioambiental em sua atuação no CRC-Univasf. Como coordenadora científica, é responsável pela produção acadêmica do centro, juntamente com a Coordenação Geral, e pela liderança da equipe dedicada à Educação Ambiental e à Sustentabilidade. Com olhar interdisciplinar, garante que as ações do CRC estejam alinhadas aos Objetivos de Desenvolvimento Sustentável (ODS/ONU), ampliando o impacto social e ambiental do projeto. Reconhecida como cientista e ambientalista, contribui para que o CRC seja referência em inovação, inclusão e responsabilidade socioambiental.`,
    },
    {
        name: "Thiago",
        category: 'coordCientifica',
        imageUrl: Thiago.src,
        lattesUrl: "https://lattes.cnpq.br/1290738666797047",
        description: `Doutorando em Agroecologia e Desenvolvimento Territorial; integra a equipe de Educação Ambiental e Sustentabilidade do CRC-Univasf, contribuindo com aulas e formações presenciais e remotas sobre as temáticas, além de atuar na Colônia Maker. Com perfil interdisciplinar, também compõe a equipe de Capacitação e Manutenção de Hardware e Software, participando da instalação dos Pontos de Inclusão Digital (PID) e das formaturas realizadas pelo CRC. Sua atuação conecta ciência, educação e tecnologia, ampliando o alcance social e formativo do projeto.`,
    },
    {
        name: "Éricles",
        category: 'coordCientifica',
        imageUrl: Ericles.src,
        linkedinUrl: "https://br.linkedin.com/in/ericles-medrado",
        description: `Engenheiro agrônomo de formação; integra a equipe de Educação Ambiental e Sustentabilidade do CRC-Univasf, onde contribui com aulas e formações presenciais e remotas, além de participar ativamente da Colônia Maker. Colabora também na organização e execução das formaturas do CRC; fortalecendo o vínculo entre tecnologia, educação e comunidade. Sua atuação combina conhecimento técnico e compromisso socioambiental, ampliando o impacto das ações do centro.`,
    },
    {
        name: "Luiz",
        category: 'capacitacao',
        imageUrl: LuizCarlos.src,
        linkedinUrl: "https://www.linkedin.com/in/luiz-carlos-dantas-souza-3449491bb",
        description: `Formando em Ciências da Computação, responsável pelas capacitações em Hardware e colabora em Informática Básica e Software no CRC (presenciais e virtuais), incluindo as capacitações na Colônia Maker; faz parte da equipe responsável pelo recondicionamento dos computadores, montagem e manutenção dos pontos de inclusão digital, pelo registro e controle das informações sobre doações, recondicionamentos, pontos de inclusão digital, captação de público-alvo, recebimento e catalogação dos materiais recebidos de doação; confeccionar planilha em Excel como controle para acompanhamento das metas de Formação, Doação, Recondicionamento e montagem de PID. Participa ativamente da organização e execução das formaturas com ou sem a presença do MCom; auxilia à Coordenação Geral na confecção dos relatórios de acompanhamento de objeto, garantindo eficiência, organização e impacto das ações do CRC.`,
    },
    {
        name: "Jackson",
        category: 'capacitacao',
        imageUrl: Jackson.src,
        description: `Técnico em TIC, com expertise em Inteligência Artificial, responsável pelas capacitações em Software e colabora em Informática Básica e Hardware no CRC (presenciais e virtuais), incluindo as capacitações na Colônia Maker; faz parte da equipe responsável pelo recondicionamento dos computadores, montagem e manutenção dos pontos de inclusão digital, pelo registro e controle das informações sobre doações, recondicionamentos, pontos de inclusão digital, captação de público-alvo, recebimento e catalogação dos materiais recebidos de doação; confeccionar planilha em Excel como controle para acompanhamento das metas de Formação, Doação, Recondicionamento e montagem de PID. Participa ativamente da organização e execução das formaturas com ou sem a presença do MCom; auxilia à Coordenação Geral na confecção dos relatórios de acompanhamento de objeto, garantindo eficiência, organização e impacto das ações do CRC.`,
    },
    {
        name: "Sabino",
        category: 'gestao',
        imageUrl: Sabino.src,
        linkedinUrl: "https://www.linkedin.com/in/antonio-sabino-da-silva-filho-b5a950136",
        lattesUrl: "http://lattes.cnpq.br/0942230017489612",
        description: `Formado em Direito, atua conjuntamente com a Coordenação Geral fazendo o elo entre o CRC-Univasf e a Fundação responsável pela administração financeira do CRC (FADURPE). Coordena a equipe de Interlocução Institucional e Gestão Administrativa, sendo responsável pela preparação de documentação junto a órgãos de controle (CGU, TCU, MCom, dentre outros) e pela administração do fluxo do TED, garantindo a segurança jurídica e a boa governança das ações do CRC. Contribui também na construção e execução do plano de trabalho e na confecção do Relatório de Conclusão de Objeto, em parceria com a Coordenação Geral. Além disso, participa ativamente da organização e execução das formações do centro, assegurando que as ações sejam eficientes, transparentes e de alto impacto social.`,
    },
    {
        name: "Fernanda Erie Yamaguchi",
        category: 'gestao',
        imageUrl: Fernanda.src,
        linkedinUrl: "https://www.linkedin.com/in/fernanda-erie-yamaguchi-950b13223",
        description: `Estudante de Administração e professora de Língua Japonesa; integra a equipe de Interlocução Institucional e Gestão Administrativa do CRC-Univasf, auxiliando em todos os processos administrativos e institucionais desenvolvidos nessa equipe. Contribui na organização de compras e licitações, elaboração de relatórios, solicitações de pagamentos de bolsas, aquisição de passagens, diárias, criação de documentos, fluxos e processos. Participa ativamente da execução das formaturas, colabora com aulas e formações (presenciais e remotas), além de participar ativamente da Colônia Maker e das demais ações do centro, garantindo eficiência, organização e transparência em todas as atividades do CRC.`,
    },
    {
        name: "Sabrina Fernanda",
        category: 'gestao',
        imageUrl: FernandaSabrina.src,
        description: `Membro da equipe de Interlocução Institucional e Gestão Administrativa do CRC-Univasf; atua como assistente administrativa, sendo responsável pelo registro das turmas, confecção de diários de classe, termos de doação e organização de todo o fluxo de documentos necessários para o recebimento dos lotes provenientes do desfazimento do governo federal e de doação para a instalação dos PID. Coordena o fluxograma das capacitações presenciais e da Colônia Maker, atua como ponto focal no diálogo com a equipe de alimentação, confecciona as ATAs de reuniões, responde aos e-mails e é responsável pelo contato com o CRC INAC. Além disso, organiza e mantém atualizadas todas as informações do CRC no Drive, gerencia o agendamento do alojamento e do refeitório do Espaço Plural para capacitações; garantindo a eficiência, organização e a execução de todas as ações do centro.`,
    },
    {
        name: "Sileide",
        category: 'gestao',
        imageUrl: Sileide.src,
        description: `Doutora em Agroecologia e Desenvolvimento Territorial, com expertise em ESG, é vice coordenadora da equipe de Interlocução Institucional e Gestão Administrativa do CRC-Univasf. Contribui na preparação de documentos junto a órgãos de controle, como CGU, TCU e MCom, auxilia na administração do fluxo do TED, é responsável confecção do Relatório de Conclusão de Objeto, em parceria com a Coordenação Geral. Atua como elo entre a Fundação Nilo Coelho e o CRC, participando ativamente da organização e execução das formações do centro, bem como na captação do público-alvo. Sua atuação garante que as ações do CRC sejam eficientes, transparentes e de alto impacto social, fortalecendo a governança e a sustentabilidade institucional do projeto.`,
    },
];

const categoriesMap: { [key: string]: string } = {
    equipeCompleta: 'Equipe Completa',
    coordGeral: 'Coordenação Geral',
    coordPedagogica: 'Coordenação Pedagógica',
    artesVisuais: 'Artes Visuais e Expressão Criativa',
    manufatura: 'Manufatura Aditiva e Automação',
    comunicacao: 'Comunicação, Audiovisual e Marketing',
    coordCientifica: 'Coordenação Científica - Educação Ambiental e Sustentabilidade',
    capacitacao: 'Capacitação e Manutenção de Hardware e Software',
    gestao: 'Interlocução Institucional e Gestão Administrativa',
};

const MemberPopup = ({ member, onClose }: { member: TeamMember | null; onClose: () => void }) => {
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
                        <p className="text-lg text-orange-500 font-semibold mb-4">{categoriesMap[member.category]}</p>
                        
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

export default function StaffPage() {
    const [activeCategory, setActiveCategory] = useState('equipeCompleta');
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    useEffect(() => {
        if (Aos) {
            Aos.refresh();
        }
    }, [activeCategory]);

    const categories = [
        { name: 'Equipe Completa', value: 'equipeCompleta' },
        { name: 'Coordenação Geral', value: 'coordGeral' },
        { name: 'Coordenação Pedagógica', value: 'coordPedagogica' },
        { name: 'Artes Visuais e Expressão Criativa', value: 'artesVisuais' },
        { name: 'Manufatura Aditiva e Automação', value: 'manufatura' },
        { name: 'Comunicação, Audiovisual e Marketing', value: 'comunicacao' },
        { name: 'Coordenação Científica', value: 'coordCientifica' },
        { name: 'Capacitação e Manutenção', value: 'capacitacao' },
        { name: 'Interlocução Institucional', value: 'gestao' },
    ];

    const filteredTeam = activeCategory === 'equipeCompleta'
        ? teamMembers
        : teamMembers.filter(member => member.category === activeCategory);

    const handleCardClick = (member: TeamMember) => {
        setSelectedMember(member);
    };

    const handleClosePopup = () => {
        setSelectedMember(null);
    };

    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0 z-0">
                <ParticlesBackground />
            </div>
            <AosWrapper>
                <div className="container mx-auto px-6 py-8 relative z-10">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-12" data-aos="fade-up">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            NOSSA EQUIPE INTERDISCIPLINAR
                        </h1>
                        <p className="text-gray-800">
                            O CRC-Univasf é construído por pessoas diversas e interdisciplinares que acreditam na tecnologia como ferramenta de inclusão sociodigital, educação e transformação social. Aqui, cada membro é parte essencial dessa rede colaborativa: docentes, especialistas, estudantes e profissionais caminham juntos para tornar nossos projetos realidade e promover o desenvolvimento territorial. Mais do que uma equipe, somos uma comunidade que integra diferentes saberes e transforma tecnologia em oportunidade.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((cat, index) => (
                            <button
                                key={cat.value}
                                onClick={() => setActiveCategory(cat.value)}
                                className={`
                                    px-6 py-2 rounded-full font-semibold text-sm md:text-base transition-colors duration-300 whitespace-nowrap
                                    ${activeCategory === cat.value
                                        ? 'bg-orange-500 text-white shadow-lg'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }
                                `}
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredTeam.map((member, index) => (
                            <div
                                key={index}
                                onClick={() => handleCardClick(member)}
                                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-6 border-4 border-transparent hover:border-orange-500 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-gray-300">
                                    <Image
                                        src={member.imageUrl}
                                        alt={member.name}
                                        width={128}
                                        height={128}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 text-center">{member.name}</h3>
                                <p className="text-sm text-gray-600 text-center">{categoriesMap[member.category]}</p>
                                {/* Adicionado o link para o LinkedIn no card */}
                                {member.linkedinUrl && (
                                    <Link
                                        href={member.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 text-blue-600 hover:text-blue-800 transition"
                                        // Para evitar que o clique no link acione o popup, paramos a propagação do evento
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <FaLinkedin className="w-6 h-6" />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </section>
                </div>
            </AosWrapper>
            
            <MemberPopup member={selectedMember} onClose={handleClosePopup} />
        </div>
    );
}