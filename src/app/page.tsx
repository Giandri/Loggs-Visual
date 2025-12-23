"use client";

import Navbar from "@/components/Navbar";
import FaultyTerminal from "@/components/FaultyTerminal";
import TargetCursor from "@/components/TargetCursor";
import HorizontalScroll from "@/components/HorizontalScroll";
import AnimatedNumber from "@/components/AnimatedNumber";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll>
        <TargetCursor spinDuration={2} hideDefaultCursor={true} parallaxOn={true} />
        <Navbar />
        <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
          <div style={{ pointerEvents: "auto", width: "100%", height: "100%" }}>
            <FaultyTerminal
              scale={2}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={1}
              pause={false}
              scanlineIntensity={1}
              glitchAmount={1}
              flickerAmount={1}
              noiseAmp={1}
              chromaticAberration={0}
              dither={0}
              curvature={0.1}
              tint="#f5f5f5"
              mouseReact={true}
              mouseStrength={1.0}
              pageLoadAnimation={false}
              brightness={1}
            />
          </div>
        </div>

        {/* Container 1 - Hero */}
        <div className="relative z-10 pt-16 min-h-screen">
          <div className="absolute left-0 bottom-0 z-20 flex flex-col justify-end h-full w-full pl-8 pb-16 pointer-events-none select-none">
            <span className="text-[8vw] md:text-[9vw] xl:text-[8vw] leading-[0.9] tracking-tight font-black uppercase text-white drop-shadow-xl flex">
              Local <span className=" left-[-20] text-[3vw] md:text-[2.2vw] lg:text-[24px] leading-snug font-black uppercase text-white pl-[1vw] mb-1 ">Visual</span>
            </span>

            <span className="block text-[8vw] md:text-[9vw] xl:text-[8vw] leading-[0.9] tracking-tight font-black uppercase text-white drop-shadow-xl">Gigs</span>
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
        <div className="relative z-10 bg-[#f5f5f5] backdrop-blur-sm min-h-screen ">
          {/* Sticky client text */}
          <div className="sticky top-10 left-0 z-20 mb-40 pt-8 pl-8 pointer-events-none select-none">
            <span className="text-sm md:text-xl font-mono text-black/60 drop-shadow-lg">[Our Client]</span>
          </div>

          {/* Middle thematic text */}
          <div className="mb-8 text-center flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-6xl font-serif text-black mb-2">Make Your Band a Portfolio</h2>
            <p className="text-sm font-mono text-black/80 max-w-2xl">We capture the energy, the crowd, and the soul of your performance.</p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-20">
            <div className="flex font-mono flex-col items-center">
              <AnimatedNumber end={20} showPlus={true} className="text-6xl font-bold text-black cursor-target" />
              <h3 className="text-sm text-black font-medium mt-2">Events</h3>
            </div>
            <div className="flex font-mono flex-col items-center">
              <AnimatedNumber end={10} showPlus={true} className="text-6xl font-bold text-black cursor-target" />
              <h3 className="text-sm text-black font-medium mt-2">Bands</h3>
            </div>
            <div className="flex font-mono flex-col items-center">
              <AnimatedNumber end={1000} className="text-6xl font-bold text-black cursor-target" />
              <h3 className="text-sm text-black font-medium mt-2">Photos</h3>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </SmoothScroll>
    </>
  );
}
