"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import FaultyTerminal from "@/components/FaultyTerminal";
import TargetCursor from "@/components/TargetCursor";
import HorizontalScroll from "@/components/HorizontalScroll";
import AnimatedNumber from "@/components/AnimatedNumber";
import { Footer } from "@/components/Footer";
import MotionLayer from "@/components/MotionLayer";
import { SmoothScroll } from "@/components/SmoothScroll";
import WorkModal from "@/components/WorkModal";
import OptimizedImage from "@/components/OptimizedImage";
import { worksItems, WorkItem } from "@/config/works";

export default function Home() {
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (work: WorkItem) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWork(null);
  };

  return (
    <>
      <div className="overflow-hidden">
        <TargetCursor spinDuration={2} hideDefaultCursor={true} parallaxOn={true} />
        <Navbar />
        <div style={{ width: "100vw", height: "100vh" }}>
          <MotionLayer
            backgroundColor="#f5f5f5"
            perspective={1900}
            cameraTilt={-25}
            cameraRotation={-45}
            scrollSensitivity={0.5}
            minLayers={20}
            layerSettings={{
              spacing: 150,
              width: 400,
              widthType: 0,
              height: 300,
              heightType: 0,
              borderRadius: 12,
              color: "rgb(30, 30, 30)",
              opacity: 0.9,
              shadow: {
                enabled: true,
                x: 0,
                y: 10,
                blur: 30,
                spread: 0,
                color: "rgba(0,0,0,0.5)",
              },
              border: {
                enabled: false,
                width: 2,
                style: "solid",
                color: "rgba(255,255,255,0.3)",
              },
            }}
            hoverSettings={{
              enabled: true,
              elevation: 20,
              scale: 1.05,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            autoPlay={{
              enabled: true,
              mode: "continuous",
              speed: 30,
            }}
            depthOfField={{
              enabled: true,
              opacityFactor: 0.7,
              blurFactor: 3,
              focusRange: 0.3,
            }}>
            {/* Dynamic content for each work */}
            {worksItems.map((work, index) => (
              <div key={work.id} className="cursor-pointer cursor-target group" style={{ padding: 20, color: "white", height: "100%" }} onClick={() => openModal(work)}>
                <div className="flex flex-col h-full transition-transform group-hover:scale-[0.98]">
                  {/* Image */}
                  <div className="flex-1 mb-4 overflow-hidden rounded-lg relative">
                    <OptimizedImage src={work.imageUrl} alt={work.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" priority={index < 2} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">Click to view</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-medium">{work.category}</span>
                      <span className="text-xs text-white/70">{work.year}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-white/90 transition-colors">{work.title}</h3>

                    <p className="text-sm text-white/80 leading-relaxed group-hover:text-white/70 transition-colors">{work.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </MotionLayer>
        </div>
        <Footer />

        {/* Work Modal */}
        <WorkModal work={selectedWork} isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
}
