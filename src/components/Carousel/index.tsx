'use-client';

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from 'next/image';

import Image1 from "@/public/assets/projects/project2/image1.png";
import Image2 from "@/public/assets/projects/project2/image1.png";
import Image3 from "@/public/assets/projects/project2/image1.png";
import Image4 from "@/public/assets/projects/project2/image1.png";

const Images = [
  Image1, Image2, Image3, Image4
]

const Carousel = () => {
  const images = [
    "@/public/assets/projects/project2/image1.png",
    "@/public/assets/projects/project2/image1.png",
    "@/public/assets/projects/project2/image1.png",
    "@/public/assets/projects/project2/image1.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    customPaging: (i: number) => (
      <div className="w-8 h-8 flex items-center justify-center bg-yellow-400 text-black font-bold rounded-full cursor-pointer">
        {i + 1}
      </div>
    ),
    dotsClass: "slick-dots flex justify-center space-x-2 mt-4",
  };

  return (
    <div className="
      flex bg-gradient-to-r from-yellow-400 to-orange-500 
      rounded-xl shadow-lg w-2/3
    "
    >
      <div className="
        max-w-lg mx-auto p-7
      "
      >
        <Slider {...settings}>
          {images.map((src, index) => (
            <div 
              key={index} 
              className="flex justify-center"
            >
              <Image 
                src={Images[index]} 
                alt={`Slide ${index + 1}`} 
                className="rounded-lg"
                height={400}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="p-5">
        <h2 className="text-white font-bold">Titulo muito Top!</h2>
        <p className="text-white">
          Aqui descreveremos em forma de resumo as atividades do crc. Também pensei em colocar essa sua parte de onde atuamos aqui também em uma das 4 bolinhas abaixo.
        </p>
      </div>
    </div>
  );
};

export default Carousel;
