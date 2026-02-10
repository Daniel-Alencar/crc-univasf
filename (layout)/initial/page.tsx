import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import ImageCarousel from '@/components/Carousel';
import AosWrapper from "@/components/AosWrapper";

import ExampleImage from '@/public/assets/equipe CRC.jpeg';

import Footer from '@/components/Footer';
import { rapidAccessMenu } from '@/constants/rapidAccessMenu';
import Map from '@/components/Map';
import YouTubeEmbed from '@/components/YoutubeEmbed';
import Header from '@/components/Header';

export default function MainPage() {

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return (
    <AosWrapper>
      <Header/>

      {/* Animação para a seção da imagem principal */}
      <section data-aos="fade-up">
        { <Image src={ExampleImage} alt='example image' /> } 
      </section> 
  
      <section className='
        flex flex-col justify-center items-center
        m-10'
        // Animação para a seção do carrossel de imagens
        data-aos="zoom-in"
      >
        <ImageCarousel />
      </section>

      <section className="
          mr-10 ml-10
          mx-auto
          bg-gradient-to-r from-orange-500 to-yellow-400
          px-6 py-6 shadow-lg
          flex flex-wrap justify-center items-center gap-4
          text-white font-semibold
          rounded-2xl
        "
        // Animação para a seção dos vídeos do YouTube
        data-aos="fade-left"
      >
        <div className="flex flex-col items-center max-w-sm w-full">
          <YouTubeEmbed 
            title="Conheça a Colônia Maker"
            description=""
            videoId="gZG9AnddsM4"
          />
        </div>

        <div className="flex flex-col items-center max-w-sm w-full">
          <YouTubeEmbed 
            title="Formatura de jovens quilombolas"
            description=""
            videoId="Sw3kMJD6ABo"
          />
        </div>

        <div className="flex flex-col items-center max-w-sm w-full">
          <YouTubeEmbed 
            title="Ponto Digital em Sobradinho"
            description=""
            videoId="31SJ0oL_tiQ"
          />
        </div>
      </section>

      {/* Animação para a seção de acesso rápido */}
      <section className='m-10' data-aos="fade-up"> 
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
              data-aos="zoom-in"
              data-aos-delay={index * 100}
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
      
      {/* Animação para a seção do mapa e informações */}
      <section className='flex flex-wrap lg:flex-nowrap' data-aos="fade-up">
        <div className='
          flex w-full
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
            flex flex-col w-full
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