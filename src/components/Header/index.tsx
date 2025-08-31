'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/assets/logo.png';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="lg:hidden bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className=" flex items-center text-2xl font-bold">
            <Image src={Logo} alt='crc univasf' className="w-32 h-auto"/>
          </div>

          {/* Botão hamburger mobile */}
          <div className="">
            <button onClick={toggleMenu} className="text-3xl text-gray-700">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div> 

        {/* Menu mobile */}
        {isOpen && (
          <nav className=" bg-gradient-to-r from-orange-500 to-yellow-400 px-6 py-4 shadow-lg">
            <ul className="flex flex-col space-y-4 text-white font-semibold">
              <li><Link href="/" onClick={toggleMenu}>Início</Link></li>
              <li>
                <a href="https://crc.univasf.edu.br/courses/" rel="noopener noreferrer" onClick={toggleMenu}>
                  Cursos
                </a>
              </li>
              <li><Link href="/projects" onClick={toggleMenu}>Projetos</Link></li>
              <li><Link href="/news" onClick={toggleMenu}>Notícias</Link></li>
              <li><Link href="/staff" onClick={toggleMenu}>Equipe CRC</Link></li>
              <li><Link href="/galery" onClick={toggleMenu}>Galeria</Link></li>
              <li><Link href="/contact" onClick={toggleMenu}>Informações de contato</Link></li>
            </ul>
          </nav>
        )}
      </header>

      <header className="hidden lg:block bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center text-2xl font-bold">
            <Image src={Logo} alt='crc univasf' />
          </div>
        </div>

        <nav className="
            bg-gradient-to-r from-orange-500 to-yellow-400 px-6 py-3 shadow-lg
          "
          data-aos="fade-down"
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
    </>
  );
}
