"use client";

import { motion, useDragControls } from "framer-motion";
import { useState, useEffect } from "react";

interface VideoCard {
  id: string;
  youtubeId: string;
  title: string;
  initialPosition?: { x: number; y: number };
  initialRotation?: number;
}

interface DraggableVideoCardProps {
  video: VideoCard;
  index: number;
  isMobile: boolean;
}

function DraggableVideoCard({ video, index, isMobile }: DraggableVideoCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(10 + index);
  const dragControls = useDragControls();

  // Desktop positions - scattered
  const desktopPositions = [
    { x: "65%", y: "40%", rotate: 0 },
    { x: "55%", y: "15%", rotate: 0 },
    { x: "35%", y: "45%", rotate: 0 },
  ];

  // Mobile positions - stacked center
  const mobilePositions = [
    { x: "50%", y: "25%", rotate: 0 },
    { x: "50%", y: "30%", rotate: 2 },
    { x: "50%", y: "35%", rotate: -1 },
  ];

  const positions = isMobile ? mobilePositions : desktopPositions;
  const pos = positions[index % positions.length];

  const startDrag = (event: React.PointerEvent) => {
    dragControls.start(event);
    setIsDragging(true);
    setZIndex(100);
  };

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.05}
      onDragEnd={() => {
        setIsDragging(false);
        setTimeout(() => setZIndex(10 + index), 300);
      }}
      initial={{
        opacity: 0,
        scale: 0.8,
        rotate: video.initialRotation ?? pos.rotate,
        x: isMobile ? "-50%" : 0,
      }}
      animate={{
        opacity: 1,
        scale: isDragging ? 1.05 : 1,
        rotate: isDragging ? 0 : video.initialRotation ?? pos.rotate,
        x: isMobile ? "-50%" : 0,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        opacity: { duration: 0.6, delay: 0.3 + index * 0.15 },
        scale: { duration: 0.3 },
      }}
      style={{
        position: "absolute",
        left: video.initialPosition?.x ?? pos.x,
        top: video.initialPosition?.y ?? pos.y,
        zIndex,
      }}
      className={isDragging ? "cursor-grabbing" : ""}>
      <div
        className={`
          relative w-[260px] sm:w-[300px] md:w-[400px] aspect-video
          bg-black rounded-lg overflow-hidden
          border border-white/30
          shadow-2xl shadow-black/60
          ${isDragging ? "ring-2 ring-white/50" : ""}
          transition-shadow duration-200
        `}>
        {/* YouTube iframe */}
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full pointer-events-auto"
        />

        {/* Title overlay - DRAG HANDLE */}
        <div onPointerDown={startDrag} className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 md:p-4 cursor-grab active:cursor-grabbing touch-none select-none">
          <div className="flex items-center justify-between">
            <p className="text-white text-[10px] md:text-xs font-mono truncate flex-1">{video.title}</p>
            {/* Drag icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-60 ml-2 flex-shrink-0">
              <circle cx="9" cy="5" r="1.5" fill="white" />
              <circle cx="15" cy="5" r="1.5" fill="white" />
              <circle cx="9" cy="12" r="1.5" fill="white" />
              <circle cx="15" cy="12" r="1.5" fill="white" />
              <circle cx="9" cy="19" r="1.5" fill="white" />
              <circle cx="15" cy="19" r="1.5" fill="white" />
            </svg>
          </div>
        </div>

        {/* Top drag handle */}
        <div onPointerDown={startDrag} className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/60 to-transparent cursor-grab active:cursor-grabbing touch-none select-none flex items-center justify-center">
          <div className="w-10 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}

interface DraggableVideoCardsProps {
  videos: VideoCard[];
}

export default function DraggableVideoCards({ videos }: DraggableVideoCardsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {videos.map((video, index) => (
        <DraggableVideoCard key={video.id} video={video} index={index} isMobile={isMobile} />
      ))}
    </>
  );
}
