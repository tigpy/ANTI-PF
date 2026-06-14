import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: { value: 40, density: { enable: true, area: 900 } },
          color: { value: ["#00FF9D", "#4CC9F0"] },
          opacity: { value: { min: 0.05, max: 0.2 } },
          size:    { value: { min: 1, max: 2.5 } },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: true,
            outModes: { default: "out" },
          },
          links: {
            enable: true,
            distance: 140,
            color: "#4CC9F0",
            opacity: 0.06,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
          },
          modes: {
            repulse: { distance: 80, duration: 0.4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
