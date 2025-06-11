import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import ImageCarousel from '@/components/Carousel';

import Logo from '@/public/assets/logo.png';
import ExampleImage from '@/public/assets/equipe CRC.jpeg';

import Footer from '@/components/Footer';
import { rapidAccessMenu } from '@/constants/rapidAccessMenu';
import Map from '@/components/Map';
import YouTubeEmbed from '@/components/YoutubeEmbed';

export default function MainPage() {

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

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
              <a
                href="https://crc.univasf.edu.br/courses/"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-500"
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

      <section>
       { <Image src={ExampleImage} alt='example image' /> } 
      </section> 
 
      <section className='
        flex flex-col justify-center items-center
        m-10
      '>
        <ImageCarousel />
      </section>

      <section className='
        m-10
        border rounded-lg shadow-md my-8 p-4
        flex gap-4
      '>
        <YouTubeEmbed 
          title={"Site do CRC"}
          description={""}
          videoId={"QjvzCTqkBDQ"}
        />
        <YouTubeEmbed 
          title={"Plataforma de Cursos"}
          description={""}
          videoId={"QjvzCTqkBDQ"}
        />
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
            <Link href={item.link} key={index} className="flex flex-col items-center">
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
          bg-amber-400 p-0
        '>
          {
            apiKey ? (
            <Map apiKey={apiKey} />
            ) : (
              <p>API Key não definida</p>
            )
          }
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
              Rod. BA-210, Km 4, S/n - Malhada da Areia, Juazeiro - BA
            </div>
          </div>
          <div className="flex items-center">
            {
            /* 
              <div className="mr-2">📞</div>
              <div className="
                text-sm sm:text-base md:text-lg lg:text-lg
              ">
                (XX) XXXX-XXXX
              </div>
            */
            }
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
