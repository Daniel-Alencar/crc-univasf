import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import ImageCarousel from '@/components/Carousel';
import AosWrapper from "@/components/AosWrapper";

import Logo from '@/public/assets/logo.png';
import ExampleImage from '@/public/assets/equipe CRC.jpeg';

import Footer from '@/components/Footer';
import { rapidAccessMenu } from '@/constants/rapidAccessMenu';
import Map from '@/components/Map';
import YouTubeEmbed from '@/components/YoutubeEmbed';
import FloatButton from '@/components/FloatButton';
import Header from '@/components/Header';

export default function MainPage() {

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return (
    <AosWrapper>
      <Header/>

      <section data-aos="fade-up"> {/* Animação para a seção da imagem principal */}
        { <Image src={ExampleImage} alt='example image' /> } 
      </section> 
  
      <section className='
        flex flex-col justify-center items-center
        m-10'
        data-aos="zoom-in" // Animação para a seção do carrossel de imagens
      >
        <ImageCarousel />
      </section>

      <section className="
        m-10
        max-w-5xl mx-auto
        bg-gradient-to-r from-orange-500 to-yellow-400
        px-6 py-6 shadow-lg
        flex justify-center items-center space-x-8
        text-white font-semibold
        rounded-2xl
      "
        data-aos="fade-left" // Animação para a seção dos vídeos do YouTube
      >
        <div className="flex flex-col items-center max-w-md w-full">
          <YouTubeEmbed 
            title="Conheça a Colônia Maker"
            description=""
            videoId="gZG9AnddsM4"
          />
        </div>

        <div className="flex flex-col items-center max-w-md w-full">
          <YouTubeEmbed 
            title="Formatura de jovens quilombolas"
            description=""
            videoId="Sw3kMJD6ABo"
          />
        </div>
      </section>

      <section className='m-10' data-aos="fade-up"> {/* Animação para a seção de acesso rápido */}
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
            <Link 
              href={item.link} 
              key={index} 
              className="flex flex-col items-center"
              data-aos="zoom-in" // Animação para cada item individualmente
              data-aos-delay={index * 100} // Adiciona um pequeno atraso para criar um efeito cascata
            >
              <div 
                className="
                  bg-[#FFE3AF] p-4 shadow-sm w-full aspect-square
                  flex flex-col items-center justify-center
                  border-4 border-[#FB6B2D]
                  font-bold
                "
              >
                <Image src={item.image} alt='Formaturas' />
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
      
      <section className='flex' data-aos="fade-up"> {/* Animação para a seção do mapa e informações */}
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
          </div>
        </div>
      </section>
      
      <Footer />
    </AosWrapper>
  );
}