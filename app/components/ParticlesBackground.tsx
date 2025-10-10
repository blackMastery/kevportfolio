import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";

interface ParticlesBackgroundProps {
  id?: string;
}

export default function ParticlesBackground({ id = "tsparticles" }: ParticlesBackgroundProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    // Optional: do something after particles are loaded
  }, []);

  if (!init) {
    return null;
  }

  return (
    <Particles
      id={id}
      particlesLoaded={particlesLoaded}
      className="absolute inset-0 w-full h-full"
      options={{
        fullScreen: { enable: false },
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
              mode: "grab",
            },
            resize: {
              enable: true,
            },
          },
          modes: {
            push: {
              quantity: 2,
            },
            grab: {
              distance: 150,
              links: {
                opacity: 0.8,
                color: "#149ddd",
              },
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#149ddd",
          },
          links: {
            color: "#149ddd",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              width: 800,
              height: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: {
                  value: 40,
                },
                links: {
                  distance: 100,
                },
              },
            },
          },
          {
            maxWidth: 480,
            options: {
              particles: {
                number: {
                  value: 25,
                },
                links: {
                  distance: 80,
                },
              },
            },
          },
        ],
      }}
    />
  );
}

