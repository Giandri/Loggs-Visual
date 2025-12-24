"use client";
import { motion, MotionProps, useMotionValueEvent, useScroll, useTransform } from "motion/react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OptimizedImage from "./OptimizedImage";

gsap.registerPlugin(ScrollTrigger);

export function throttle(fn: (...args: any[]) => any, wait: number) {
  let shouldWait = false;

  return function throttledFunction(this: any, ...args: any[]) {
    if (!shouldWait) {
      fn.apply(this, args);
      shouldWait = true;
      setTimeout(() => (shouldWait = false), wait);
    }
  };
}

import { galleryImages } from "@/config/gallery";

function useElementViewportPosition(ref: React.RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (!ref || !ref.current) return;

    const pageHeight = document.body.scrollHeight;
    const start = ref.current.offsetTop;
    const end = start + ref.current.offsetHeight;

    setPosition([start / pageHeight, end / pageHeight]);
  }, []);

  return { position };
}

const slideAnimation: MotionProps = {
  variants: {
    full: { backgroundColor: "#008299" },
    partial: { backgroundColor: "#ffffff" },
  },
  initial: "partial",
  whileInView: "full",
  viewport: { amount: 1, once: false },
};

export default function HorizontalScroll() {
  const mainRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const { position } = useElementViewportPosition(mainRef);
  const [carouselEndPosition, setCarouselEndPosition] = useState(0);
  const { scrollYProgress, scrollY } = useScroll();

  // Blur effect
  const blurValue = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [2, 0.5, 0, 0.5, 2], { clamp: true });

  const filterValue = useTransform(blurValue, (blurValue) => {
    return blurValue <= 0 ? "none" : `blur(${blurValue}px)`;
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, carouselEndPosition]);

  useEffect(() => {
    if (!carouselRef || !carouselRef.current) return;
    const parent = carouselRef.current.parentElement;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    const resetCarouselEndPosition = () => {
      if (carouselRef && carouselRef.current) {
        const newPosition = carouselRef.current.clientWidth - window.innerWidth + scrollbarWidth + (parent as HTMLElement).offsetLeft * 2;

        setCarouselEndPosition(-newPosition);
      }
    };

    resetCarouselEndPosition();
    const handleResize = throttle(resetCarouselEndPosition, 10);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ============================================
  // PILIHAN 3: Elastic Spring Path
  // ============================================
  const generateElasticPath = () => {
    const width = 3000;
    const height = 90;
    const points = 200;

    let path = `M 0 ${height / 2}`;

    for (let i = 1; i <= points; i++) {
      const x = (i / points) * width;
      const t = i / points;

      // Elastic easing formula
      const amplitude = 50 * Math.exp(-5 * t);
      const y = height / 2 + amplitude * Math.sin(20 * t * Math.PI);

      path += ` L ${x} ${y}`;
    }

    return path;
  };

  // Animate SVG path dengan GSAP
  useEffect(() => {
    if (!svgPathRef.current || !mainRef.current) return;

    const path = svgPathRef.current;
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    const ctx = gsap.context(() => {
      // Animate path drawing
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Animate dot following the path
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
          },
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const pathData = generateElasticPath(); // Style 3: Elastic

  return (
    <section ref={mainRef}>
      <div className="w-full mx-auto" style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen w-full flex flex-col items-start justify-center overflow-hidden">
          {/* Animated SVG Line */}
          <div className="absolute bottom-20 left-0 right-0 w-full overflow-visible pointer-events-none" style={{ height: "100px" }}>
            <svg
              className="w-full h-full"
              viewBox="0 0 3000 100"
              preserveAspectRatio="none"
              style={{
                overflow: "visible",
                transform: "translateY(-50%)",
              }}>
              <defs>
                {/* Gradient untuk line */}
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f5f5f5" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#f5f5f5" stopOpacity="1" />
                  <stop offset="100%" stopColor="#f5f5f5" stopOpacity="0.3" />
                </linearGradient>

                {/* Glow effect */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background shadow line */}
              <path d={pathData} stroke="rgba(0, 0, 0, 6)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(0, 52)" />

              {/* Main animated line */}
              <path ref={svgPathRef} d={pathData} stroke="url(#lineGradient)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" transform="translate(0, 50)" />
            </svg>
          </div>

          <motion.div
            ref={carouselRef}
            className="flex gap-10"
            style={{
              x,
              filter: filterValue,
            }}>
            {galleryImages.map((item, index) => (
              <motion.div {...slideAnimation} key={item.id} className="group relative h-[300px] w-[300px] overflow-hidden rounded-sm bg-black shrink-0">
                <OptimizedImage src={item.url} alt={item.title || `Gallery image ${item.id}`} className="w-full h-full" priority={index < 3} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
