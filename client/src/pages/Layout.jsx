import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const [init, setInit] = useState(false);
  const location = useLocation();
  const isAuthRoute = location.pathname.includes('/auth');

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
          },
        },
        color: {
          value: '#727272',
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.7,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 5 },
          random: true,
          anim: {
            enable: true,
            speed: 90,
            size_min: 40,
            sync: false,
          },
        },
        links: {
          enable: true,
          distance: 200,
          color: '#0000ff',
          opacity: 0.7,
          width: 0.5,
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'bounce',
          bounce: false,
          // attract: {
          //   enable: true,
          //   rotateX: 600,
          //   rotateY: 1200,
          // },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onHover: {
            enable: true,
            mode: 'repulse',
          },
          onClick: {
            enable: false,
            mode: 'push',
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
          push: {
            quantity: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    }),
    []
  );

  return (
    <>
      {/* {!isAuthRoute && <Header />} */}
      <Header />
      {init && (
        <Particles
          id="tsparticles"
          options={options}
          className="fixed top-0 left-0 z-[-1]"
        />
      )}
      <main className="flex-1 container mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
