'use client';

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const BubbleParticles = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log("Particles loaded successfully!", container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "bubble",
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 200,
            duration: 2,
            size: 60, // Aumentado para um tamanho maior no hover
            opacity: 1, // Aumentado para máxima opacidade no hover
            color: {
                value: ["#FF8C00", "#4682B4"]
            }
          },
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ["#FFA07A", "#ADD8E6"],
        },
        links: {
          enable: false,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1,
          straight: false,
          vibrate: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 30,
        },
        opacity: {
          value: { min: 0.5, max: 0.9 }, // Opacidade aumentada
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.5,
            sync: false,
          },
        },
        shape: {
          type: "polygon",
          options: {
            polygon: {
              sides: 6,
            },
          },
        },
        size: {
          value: { min: 12, max: 25 }, // Tamanho aumentado
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 12,
            sync: false,
            startValue: "random",
            destroy: "max",
          },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return null;
};

export default BubbleParticles;