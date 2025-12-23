"use client";

import ZoomTrigger from "@/components/ZoomTrigger";
import { SmoothScroll } from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import TargetCursor from "@/components/TargetCursor";
import { Footer } from "@/components/Footer";
import AnimatedTimeline from "@/components/Timeline";

export default function About() {
  const experiences = [
    {
      description: "Founded as a passion-driven documentation project in Pangkal Pinang.",
      period: "Jan 2025 - Dec 2025",
      current: true,
    },
    {
      description: "Started growing with the local music scene and documenting more live performances.",
      period: "Jan 2024 - Apr 2024",
    },
    {
      description: "Founded as a passion-driven documentation project in Pangkal Pinang.",
      period: "Dec 2023",
    },
  ];
  return (
    <SmoothScroll>
      <div className="bg-gray-900 text-white ">
        <TargetCursor spinDuration={2} hideDefaultCursor={true} parallaxOn={true} />
        <Navbar />

        {/* Zoom Trigger Example - Image */}
        <div style={{ background: "#f5f5f5", color: "#2d3436  " }} className="max-w-full overflow-x-hidden ">
          <ZoomTrigger overlayColor="#f5f5f5" showArrow={true} arrowColor="#2d3436">
            <main>
              {/* Section Primary - Trigger Section */}
              <section className="keyhole-trigger" style={{ background: "#f5f5f5" }}>
                <div className="max-w-[900px] mx-auto pt-0 px-10 pb-20">
                  <figure className="relative left-1/2 w-screen -translate-x-1/2 m-0 mb-4">
                    <img src="/gallery/999.JPG" alt="Hero" className="w-full object-cover min-h-screen" />
                  </figure>
                  <h1 className="font-serif leading-none  text-[5.2rem]">Who We Are.</h1>
                  <p className="text-[18px] font-mono leading-[1.45] top-2 mb-4">A documentation project born from passion, capturing bands with honest visuals and raw energy. Based in Pangkal Pinang.</p>
                </div>
              </section>
            </main>
          </ZoomTrigger>
        </div>
        <AnimatedTimeline experiences={experiences} />
        {/* Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
