'use client';

import React, { useRef } from 'react';
import AosWrapper from "@/components/AosWrapper";
import Link from 'next/link';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import dynamic from "next/dynamic";

// Importa Player e Controls só no client (ssr desativado)
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  { ssr: false }
);
const Controls = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Controls),
  { ssr: false }
);

// Importação dos JSONs
import liveChatbotAnimation from '@/components/animacoesJSON/LiveChatbot.json'; 
import girlOnComputerAnimation from '@/components/animacoesJSON/girl-on-computer.json'; 

export default function ContactPage() {
  const lottiePlayer1 = useRef(null);
  const lottiePlayer2 = useRef(null);
  
  return (
    <div className="relative min-h-screen bg-white">
      <AosWrapper>
        <div className="container mx-auto px-6 py-12 relative z-10 text-center">
          <div 
            className="flex flex-col md:flex-row items-center justify-center gap-10"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {/* Lottie Animation - Esquerda */}
            <div className="w-full md:w-1/3">
              <Player
                // ref={lottiePlayer1}
                autoplay
                loop
                src={liveChatbotAnimation}
                style={{ width: '350px', height: '350px' }}
              >
                <Controls visible={false} />
              </Player>
            </div>

            {/* Cartão de Contato Central */}
            <div 
              className="max-w-xl mx-auto bg-gray-50 rounded-xl p-8 md:p-12 shadow-2xl backdrop-blur-sm"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Entre em Contato
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Estamos ansiosos para ouvir suas ideias, sugestões ou responder a qualquer dúvida. Escolha a forma de contato que preferir!
              </p>

              <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-12">
                {/* Contato via E-mail */}
                <div 
                  className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full md:w-auto"
                  data-aos="zoom-in"
                  data-aos-delay="400"
                >
                  <div className="text-5xl text-orange-500 mb-4">
                    <FaEnvelope />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Envie um E-mail</h3>
                  <p className="text-gray-600 mb-4">
                    Para dúvidas e propostas, mande uma mensagem para nossa caixa de entrada.
                  </p>
                  <Link 
                    href="mailto:seu-email@example.com"
                    className="px-6 py-2 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Enviar E-mail
                  </Link>
                </div>

                {/* Contato via Instagram */}
                <div 
                  className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full md:w-auto"
                  data-aos="zoom-in"
                  data-aos-delay="600"
                >
                  <div className="text-5xl text-[#E1306C] mb-4">
                    <FaInstagram />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Siga no Instagram</h3>
                  <p className="text-gray-600 mb-4">
                    Acompanhe nosso trabalho e interaja diretamente pelas redes sociais.
                  </p>
                  <Link 
                    href="https://www.instagram.com/seu-instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Abrir Instagram
                  </Link>
                </div>
              </div>
            </div>

            {/* Lottie Animation - Direita */}
            <div className="w-full md:w-1/3">
              <Player
                // ref={lottiePlayer2}
                autoplay
                loop
                src={girlOnComputerAnimation}
                style={{ width: '250px', height: '250px' }}
              >
                <Controls visible={false} />
              </Player>
            </div>
          </div>
        </div>
      </AosWrapper>
    </div>
  );
}
