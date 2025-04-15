'use-client';

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from 'next/image';

import Image1 from "@/public/assets/projects/project2/image1.png";
import Image2 from "@/public/assets/projects/project2/image2.png";
import Image3 from "@/public/assets/projects/project2/image1.png";
import Image4 from "@/public/assets/projects/project2/image1.png";

const sliderComponents = [
  {
    title: "Título 1",
    description: "Descrição 1",
    image: Image1,
  },
  {
    title: "Título 2",
    description: "Descrição 2",
    image: Image2,
  },
  {
    title: "Título 3",
    description: "Descrição 3",
    image: Image3,
  },
  {
    title: "Título 4",
    description: "Descrição 4",
    image: Image4,
  },
]

const Carousel = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    afterChange: (index: number) => setCurrentSlide(index),
    customPaging: (i: number) => (
      <div className="w-8 h-8 flex items-center justify-center bg-yellow-400 text-black font-bold rounded-full cursor-pointer border-4 border-green-800">
        {i + 1}
      </div>
    ),
    dotsClass: "slick-dots flex justify-center space-x-2 mt-8 gap-2",
  };

  return (
    <div className="
      flex bg-gradient-to-r from-yellow-400 to-orange-500 
      rounded-xl shadow-lg w-2/3
    "
    >
      <div className="
        max-w-lg mx-auto p-10 border-4 border-blue-700
      "
      >
        <Slider {...settings}>
          {sliderComponents.map((object, index) => (
            <div 
              key={index} 
              className="border-4 border-red-800 flex items-center justify-center h-[400px] w-full"
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
      <div className="border-4 flex-1 border-amber-950 p-10">
        <h2 className="text-white text-3xl font-bold">
          {sliderComponents[currentSlide].title}
        </h2>
        <p className="text-white text-2xl">
          {sliderComponents[currentSlide].description}
        </p>
      </div>
    </div>
  );
};

export default Carousel;
