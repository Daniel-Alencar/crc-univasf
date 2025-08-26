import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import Logo from '@/public/assets/logo.png';
import Footer from '@/components/Footer';

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-white shadow-md z-20 relative">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center text-2xl font-bold">
            <Image src={Logo} alt='crc univasf'/>
          </div>
        </div>
        
        <nav className="
          bg-gradient-to-r from-orange-500 to-yellow-400 px-6 py-3 shadow-lg z-20 relative"
        >
          <ul className="flex justify-center space-x-8 text-white font-semibold">
            <li>
              <Link href="/" className="hover:text-gray-200">
                Início
              </Link>
            </li>
            <li>
              <a
                href="https://crc.univasf.edu.br/courses/"
                rel="noopener noreferrer"
                className="hover:text-gray-200"
              >
                Cursos
              </a>
            </li>
            <li>
              <Link href="/projects" className="hover:text-gray-200">
                Projetos
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-gray-200">
                Notícias
              </Link>
            </li>
            <li>
              <Link href="/staff" className="hover:text-gray-200">
                Equipe CRC
              </Link>
            </li>
            <li>
              <Link href="/galery" className="hover:text-gray-200">
                Galeria
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-200">
                Informações de contato
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <Footer />
    </>
  );
}