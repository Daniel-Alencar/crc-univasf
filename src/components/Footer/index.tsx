import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

import Image from "next/image";

import univasfLogo from '@/public/assets/partners/univasf.png';
import computersLogo from '@/public/assets/partners/computadores para inclusao.png';
import mcomLogo from '@/public/assets/partners/mcom.png';
import governoLogo from '@/public/assets/partners/governo federal.png';

const partnersLogos = [
  {
    logo: univasfLogo,
  },
  {
    logo: computersLogo,
  },
  {
    logo: mcomLogo,
    link: "https://www.gov.br/mcom/pt-br/acesso-a-informacao/acoes-e-programas/programas-projetos-acoes-obras-e-atividades/computadores-para-inclusao-1"
  },
  {
    logo: governoLogo,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#abd0f3] text-white py-2 flex justify-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex gap-6 text-sm">
          
          {
            partnersLogos.map((partner) => {
              if(partner.link) {
                return(
                  <span>
                    <a 
                      href={partner.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Image height={55} src={partner.logo} alt='univasf' />
                    </a>
                  </span>
                )
              } else {
                return(
                  <span>
                    <Image height={55} src={partner.logo} alt='univasf' />
                  </span>
                )
              }
            })
          }
        </div>
        <div className="flex gap-4 text-xl">
          {/* 
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-gray-300" />
            </a>
          */}
          <a href="mailto:crc@univasf.edu.br" target="_blank" rel="noopener noreferrer">
            <SiGmail className="hover:text-gray-300" />
          </a>
          <a href="https://www.instagram.com/crcunivasf/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-gray-300" />
          </a>
        </div>
      </div>
    </footer>
  );
}
