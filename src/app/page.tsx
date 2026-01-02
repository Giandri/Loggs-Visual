"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FaultyTerminal from "@/components/FaultyTerminal";
import TargetCursor from "@/components/TargetCursor";
import HorizontalScroll from "@/components/HorizontalScroll";
import AnimatedNumber from "@/components/AnimatedNumber";
import DraggableVideoCards from "@/components/DraggableVideoCards";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import ScrollFloat from "@/components/ScrollFloat";
import { motion } from "framer-motion";

export default function Home() {
  const [terminalSettings, setTerminalSettings] = useState({
    scale: 2,
    gridMul: [2, 1] as [number, number],
    dpr: 1,
    noiseAmp: 1,
    mouseReact: true,
    timeScale: 1,
    scanlineIntensity: 0.7,
  });

  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile - same visual, lower resolution for performance
        setTerminalSettings({
          scale: 2,
          gridMul: [2, 1],
          dpr: 0.5,
          noiseAmp: 1,
          mouseReact: false,
          timeScale: 1,
          scanlineIntensity: 0.7,
        });
      } else if (width < 1024) {
        // Tablet
        setTerminalSettings({
          scale: 2,
          gridMul: [2, 1],
          dpr: 0.75,
          noiseAmp: 1,
          mouseReact: true,
          timeScale: 1,
          scanlineIntensity: 0.7,
        });
      } else {
        // Desktop - full quality
        setTerminalSettings({
          scale: 2,
          gridMul: [2, 1],
          dpr: 1,
          noiseAmp: 1,
          mouseReact: true,
          timeScale: 1,
          scanlineIntensity: 0.7,
        });
      }
    };

    updateSettings();
    window.addEventListener("resize", updateSettings);
    return () => window.removeEventListener("resize", updateSettings);
  }, []);

  return (
    <>
      <SmoothScroll>
        <TargetCursor spinDuration={2} hideDefaultCursor={true} parallaxOn={true} />
        <Navbar />
        <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
          <div style={{ pointerEvents: "auto", width: "100%", height: "100%" }}>
            <FaultyTerminal
              scale={terminalSettings.scale}
              gridMul={terminalSettings.gridMul}
              digitSize={1.2}
              timeScale={terminalSettings.timeScale}
              pause={false}
              scanlineIntensity={terminalSettings.scanlineIntensity}
              glitchAmount={1}
              flickerAmount={1}
              noiseAmp={terminalSettings.noiseAmp}
              chromaticAberration={0}
              dither={0}
              curvature={0.1}
              tint="#f5f5f5"
              mouseReact={terminalSettings.mouseReact}
              mouseStrength={1.0}
              pageLoadAnimation={false}
              brightness={1}
              dpr={terminalSettings.dpr}
            />
          </div>
        </div>

        {/* Container 1 - Hero */}
        <div className="relative z-10 pt-16 min-h-screen overflow-hidden">
          {/* Draggable Video Cards */}
          <DraggableVideoCards cards={[{ id: "1", type: "youtube", youtubeId: "Q_MZ79uFtD4", title: "New Project" }]} />

          <div className="absolute left-0 bottom-0 z-20 flex flex-col justify-end h-full w-full pl-8 pb-16 pointer-events-none select-none">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-[18vw] md:text-[9vw] xl:text-[8vw] leading-[0.9] tracking-tight font-black uppercase text-white drop-shadow-xl flex">
              Local{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1.0, delay: 0.3, ease: "backOut" }}
                className="text-[4vw] md:text-[2.2vw] lg:text-[24px] leading-snug font-black uppercase text-white pl-[1vw] mb-1">
                Visual
              </motion.span>
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
              className="block text-[8vw] md:text-[9vw] xl:text-[8vw] leading-[0.9] tracking-tight font-black uppercase text-white drop-shadow-xl">
              Gigs
            </motion.span>
          </div>
          <div className="absolute right-0 bottom-0 z-20 pr-8 pb-16 pointer-events-none select-none">
            <span className="text-sm md:text-xl  font-mono text-white drop-shadow-lg">[.jpg/.mp4]</span>
          </div>
        </div>

        {/* Container 2 - Highlight*/}
        <div className="relative z-10 bg-black backdrop-blur-sm min-h-screen">
          {/* Sticky highlight text */}
          <div className="sticky top-10 mb-10 left-0 z-20 pt-8 pl-8 pointer-events-none select-none">
            <span className="text-sm md:text-xl font-mono text-white/70 drop-shadow-lg">[Highlight]</span>
          </div>
          <HorizontalScroll />
        </div>

        {/* Container 3 - Stats */}
        <div className="relative z-10 bg-[#f5f5f5] backdrop-blur-sm min-h-[70vh] md:min-h-screen">
          {/* Sticky client text */}
          <div className="sticky top-6 md:top-10 left-0 z-20 mb-20 md:mb-40 pt-4 md:pt-8 pl-4 md:pl-8 pointer-events-none select-none">
            <span className="text-xs md:text-sm xl:text-xl font-mono text-black/60 drop-shadow-lg">[Our Client]</span>
          </div>

          {/* Middle thematic text */}
          <div className="mb-4 md:mb-8 text-center flex flex-col items-center justify-center px-4 pt-8 md:pt-12">
            <ScrollFloat scrollStart="top bottom" animationDuration={1.0} ease="back.inOut(1.7)" stagger={0.02} containerClassName="mb-[-1px]" textClassName="text-xl md:text-4xl lg:text-6xl font-serif text-black leading-tight">
              Make Your Band a Portfolio
            </ScrollFloat>

            <ScrollFloat scrollStart="center bottom" animationDuration={0.8} ease="back.inOut(1.5)" stagger={0.01} containerClassName="max-w-2xl px-2" textClassName="text-sm font-mono text-black/80">
              We capture the energy, the crowd, and the soul of your performance.
            </ScrollFloat>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-20 px-4 pb-8 md:pb-12">
            <div className="flex font-mono flex-col items-center">
              <AnimatedNumber end={20} showPlus={true} className="text-4xl md:text-6xl font-bold text-black cursor-target" />
              <h3 className="text-xs md:text-sm text-black font-medium mt-1 md:mt-2">Events</h3>
            </div>
            <div className="flex font-mono flex-col items-center">
              <AnimatedNumber end={10} showPlus={true} className="text-4xl md:text-6xl font-bold text-black cursor-target" />
              <h3 className="text-xs md:text-sm text-black font-medium mt-1 md:mt-2">Bands</h3>
            </div>
            <div className="flex font-mono flex-col items-center">
              <AnimatedNumber end={1000} className="text-4xl md:text-6xl font-bold text-black cursor-target" />
              <h3 className="text-xs md:text-sm text-black font-medium mt-1 md:mt-2">Photos</h3>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </SmoothScroll>
    </>
  );
}
