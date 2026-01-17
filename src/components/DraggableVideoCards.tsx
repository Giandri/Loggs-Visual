"use client";

import { motion, useDragControls } from "framer-motion";
import { useState, useEffect } from "react";

interface EmbedCard {
  id: string;
  type: "youtube" | "maps" | "iframe";
  youtubeId?: string;
  url?: string;
  title: string;
  initialPosition?: { x: string; y: string };
  initialRotation?: number;
}

interface DraggableCardProps {
  card: EmbedCard;
  index: number;
  isMobile: boolean;
  totalCards: number;
}

function DraggableCard({ card, index, isMobile, totalCards }: DraggableCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(10 + index);
  const [shouldLoad, setShouldLoad] = useState(false);
  const dragControls = useDragControls();

  // Auto-load iframe after component mounts with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 500 + index * 200); // Stagger loading to prevent overwhelming

    return () => clearTimeout(timer);
  }, [index]);

  // Desktop positions - use card's initialPosition or fallback
  const getDesktopPosition = () => ({
    x: card.initialPosition?.x ?? "40%",
    y: card.initialPosition?.y ?? "30%",
    rotate: card.initialRotation ?? 0,
  });

  // Mobile positions - vertical column layout
  const getMobilePosition = () => {
    // Simple vertical layout: stack cards in one column
    const positions = [
      { x: "50%", y: "15%" }, // Card 1: top
      { x: "50%", y: "35%" }, // Card 2: middle
      { x: "50%", y: "55%" }, // Card 3: bottom
      { x: "50%", y: "80%" }, // Card 4: if needed
    ];

    return {
      ...(positions[index] || positions[0]),
      rotate: 0,
    };
  };

  const pos = isMobile ? getMobilePosition() : getDesktopPosition();

  const startDrag = (event: React.PointerEvent) => {
    dragControls.start(event);
    setIsDragging(true);
    setZIndex(100);
  };

  // Generate iframe src based on type
  const getIframeSrc = () => {
    switch (card.type) {
      case "youtube":
        return `https://www.youtube.com/embed/${card.youtubeId}?rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=${card.youtubeId}&controls=0&showinfo=0&iv_load_policy=3`;
      case "maps":
      case "iframe":
        return card.url || "";
      default:
        return "";
    }
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
        rotate: card.initialRotation ?? pos.rotate,
        x: isMobile ? "-50%" : 0,
      }}
      animate={{
        opacity: 1,
        scale: isDragging ? 1.05 : 1,
        rotate: isDragging ? 0 : card.initialRotation ?? pos.rotate,
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
        left: pos.x,
        top: pos.y,
        zIndex,
      }}
      className={isDragging ? "cursor-grabbing" : ""}>
      <div
        className={`
          relative
          w-[240px] xs:w-[260px] sm:w-[360px] md:w-[380px] lg:w-[400px] xl:w-[420px]
          aspect-video
          bg-black rounded-lg overflow-hidden
          border border-white/30
          shadow-2xl shadow-black/60
          ${isDragging ? "ring-2 ring-white/50" : ""}
          transition-shadow duration-200
        `}>
        {/* Iframe */}
        {shouldLoad && <iframe src={getIframeSrc()} title={card.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full pointer-events-auto" />}

        {/* Title overlay - DRAG HANDLE */}
        <div onPointerDown={startDrag} className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-2 xs:p-3 sm:p-4 md:p-5 cursor-grab active:cursor-grabbing touch-none select-none">
          <div className="flex items-center justify-between">
            <p className="text-white text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-mono truncate flex-1">{card.title}</p>
            {/* Drag icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-60 ml-1 xs:ml-2 w-4 h-4 xs:w-5 xs:h-5 flex-shrink-0">
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

interface DraggableCardsProps {
  cards: EmbedCard[];
}

export default function DraggableVideoCards({ cards }: DraggableCardsProps) {
  const totalCards = cards.length;
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
      {cards.map((card, index) => (
        <DraggableCard key={card.id} card={card} index={index} isMobile={isMobile} totalCards={totalCards} />
      ))}
    </>
  );
}
