import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import ImageCarousel from '@/components/Carousel';

import Logo from '@/public/assets/logo.png';
import ExampleImage from '@/public/assets/projects/project1/image1.png';

export default function MainPage() {
  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center text-2xl font-bold">
            {/* Logo */}
            <Image src={Logo} alt='crc univasf'/>
          </div>
        </div>
        
        {/* Navbar */}
        <nav className="
          bg-gradient-to-r from-orange-500 to-yellow-400 px-6 py-3 shadow-lg"
        >
          <ul className="flex justify-center space-x-8 text-white font-semibold">
            <li>
              <Link href="/" className="text-blue-300 hover:text-blue-500">
                Início
              </Link>
            </li>
            <li>
              <Link href="/projetos" className="hover:text-gray-200">
                Projetos
              </Link>
            </li>
            <li>
              <Link href="/noticias" className="hover:text-gray-200">
                Notícias
              </Link>
            </li>
            <li>
              <Link href="/equipe" className="hover:text-gray-200">
                Equipe CRC
              </Link>
            </li>
            <li>
              <Link href="/galeria" className="hover:text-gray-200">
                Galeria
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-gray-200">
                Informações de contato
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <section>
        <Image src={ExampleImage} alt='example image' />
      </section>
      <section>
        <ImageCarousel />
      </section>
    </>
  );
}
