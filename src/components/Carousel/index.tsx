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
      max-w-lg mx-auto p-4 
      bg-gradient-to-r from-yellow-400 to-orange-500 
      rounded-xl shadow-lg
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
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
