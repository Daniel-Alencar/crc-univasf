import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import ImageCarousel from '@/components/Carousel';

import Logo from '@/public/assets/logo.png';
import ExampleImage from '@/public/assets/projects/project1/image1.png';

import CourseImage from '@/public/assets/rapid_access/courses.png';
import FormationImage from '@/public/assets/rapid_access/formations.png';
import NewsImage from '@/public/assets/rapid_access/news.png';
import ContactImage from '@/public/assets/rapid_access/Contact.png';
import DigitalPointImage from '@/public/assets/rapid_access/DigitalPoint.png';
import MakerColonyImage from '@/public/assets/rapid_access/MakerColony.png';
import Footer from '@/components/Footer';

export const rapidAccessMenu = [
  {
    name: "Cursos",
    image: CourseImage,
  },
  {
    name: "Colônia Maker",
    image: MakerColonyImage,
  },
  {
    name: "Notícias",
    image: NewsImage,
  },
  {
    name: "Formaturas",
    image: FormationImage,
  },
  {
    name: "Ponto digital",
    image: DigitalPointImage,
  },
  {
    name: "Contato",
    image: ContactImage,
  },
];

export default function MainPage() {
  return (
    <>
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center text-2xl font-bold">
            <Image src={Logo} alt='crc univasf'/>
          </div>
        </div>
        
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

      <section>
        <Image src={ExampleImage} alt='example image' />
      </section>

      <section className='
        flex flex-col justify-center items-center
        m-10
      '>
        <ImageCarousel />
      </section>

      <section
        className='m-10'>
        <div className="mb-8">
          <button 
            className="
              w-full bg-[#1E88E5] text-white py-3 rounded-lg
              text-2xl font-bold
            "
          >
            Acessar Rápido
          </button>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {rapidAccessMenu.map((item, index) => (
            <Link href="#" key={index} className="flex flex-col items-center">
              <div 
                className="
                  bg-[#FFE3AF] p-4 shadow-sm w-full aspect-square
                  flex flex-col items-center justify-center
                  border-4 border-[#FB6B2D]
                  font-bold
                "
              >
                <Image src={item.image} alt='Formaturas'/>
                <span 
                  className="
                    text-sm sm:text-base md:text-lg lg:text-lg xl:text-2xl mt-1 text-center text-[#FB6B2D]
                    leading-tight
                  "
                >
                  {item.name.toUpperCase()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <section className='flex'>
        <div className='
          flex flex-1 
          bg-amber-400 p-4 h-60
        '>
          {/* Google Maps */}
        </div>
        
        <div className="
            bg-[#3678ce] text-white p-4
            flex flex-col flex-1
          "
        >
          <h3 className="
            text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
            font-bold mb-2
          ">
            COMO CHEGAR NO CRC UNIVASF
          </h3>
          <div className="flex items-center mb-2">
            <div className="mr-2">📍</div>
            <div className="
              text-sm sm:text-base md:text-lg lg:text-lg
            ">
              Av. Dr. Luiz, 1.001 - Londrina
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-2">📞</div>
            <div className="
              text-sm sm:text-base md:text-lg lg:text-lg
            ">
              (43) 3375-7000
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
