'use client';

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from 'next/image';

import Image1 from "@/public/assets/carrousel/image1.png";
import Image2 from "@/public/assets/carrousel/image2.png";
import Image3 from "@/public/assets/carrousel/image3.jpeg";
import Image4 from "@/public/assets/carrousel/image4.png";

const sliderComponents = [
  {
    title: "Aqui tem Inclusão!",
    description: "Acreditamos que o acesso ao conhecimento digital é um direito de todos. Por isso, nossa equipe se dedica a oferecer capacitação de excelência em competências digitais, promovendo inclusão, autonomia e oportunidades. Nosso trabalho é voltado especialmente para comunidades historicamente afastadas do universo digital — como povos indígenas, fundo e fecho de pasto, quilombolas, ribeirinhos, agricultores familiares, assentados e pessoas em situação de vulnerabilidade social, exclusão socioeconômica e digital. Levamos tecnologia onde ela ainda não chegou, construindo pontes para um futuro mais justo, conectado e inclusivo. ",
    image: Image1,
  },
  {
    title: "Nossos Parceiros",
    description: "O CRC UNIVASF – Centro de Recondicionamento de Computadores da UNIVASF – atua em parceria com o Ministério das Comunicações (MCOM) e o Governo Federal para ampliar o acesso à tecnologia em comunidades de todo o Brasil. Juntos, realizamos a doação de computadores recondicionados para a instalação de Pontos de Inclusão Digital e a oferta de capacitação introdutória no universo digital. Essa união fortalece nosso compromisso com a inclusão digital, a sustentabilidade e a transformação social. Por meio dessa rede colaborativa, conectamos pessoas, criamos oportunidades e promovemos cidadania digital onde ela é mais necessária.",
    image: Image2,
  },
  {
    title: "Colonia Maker",
    description: "Um dos nossos grandes projetos é a Colônia Maker! Trata-se de colônia de férias para crianças de baixa renda com o foco em tecnologia. As atividades incluem: impressão 3D, uso de scanner, óculos de realidade virtual, drones, desmontagem e montagem de computadores, informatica básica, confecção de autômatos, manuseio do sistema operacional Linux, educação ambiental e cidadania",
    image: Image3,
  },
  {
    title: "Cursos Gratuitos em nossa Plataforma!",
    description: "Venha conhecer a nossa mais nova Plataforma Digital, especialmente desenvolvida para oferecer cursos gratuitos e exclusivos que abrangem todos os aspectos da inclusão digital. Com conteúdos acessíveis e didáticos, você poderá vivenciar a experiência do CRC UNIVASF diretamente da sua casa, de forma prática e confortável, sem precisar sair do sofá. Nosso objetivo é democratizar o acesso ao conhecimento tecnológico, conectando você a um universo de oportunidades e aprendizado.",
    image: Image4,
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
    afterChange: (index: number) => setCurrentSlide(index),
    customPaging: (i: number) => (
      <div className="w-6 h-6 flex items-center justify-center bg-yellow-400 text-black font-bold rounded-full cursor-pointer border text-sm">
        {i + 1}
      </div>
    ),
    dotsClass: "slick-dots flex justify-center space-x-2 mt-8 gap-2",
  };

  return (
    <div
      className="
        flex flex-col lg:flex-row 
        bg-gradient-to-r from-yellow-400 to-orange-500 
        rounded-xl shadow-lg w-full max-w-screen-xl mx-auto
      "
    >
      <div className="w-full lg:w-1/2 p-9">
        <Slider {...settings}>
          {sliderComponents.map((object, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full"
            >
              <Image
                src={object.image}
                alt={`Slide ${index + 1}`}
                className="rounded-lg object-cover w-full h-full"
                width={500}
                height={400}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">
          {sliderComponents[currentSlide].title}
        </h2>
        <p className="text-white text-lg sm:text-xl">
          {sliderComponents[currentSlide].description}
        </p>
      </div>
    </div>
  );
};

export default Carousel;
