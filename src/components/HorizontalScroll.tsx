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
// Import gallery images from config
import { galleryImages } from "@/config/gallery";

// * based on: https://gist.github.com/coleturner/34396fb826c12fbd88d6591173d178c2
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
  const lineRef = useRef<HTMLDivElement>(null);
  const { position } = useElementViewportPosition(mainRef);
  const [carouselEndPosition, setCarouselEndPosition] = useState(0);
  const { scrollYProgress, scrollY } = useScroll();
  const x = useTransform(scrollYProgress, position, [0, carouselEndPosition]);

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

  // Animate horizontal line
  useEffect(() => {
    if (!lineRef.current || !mainRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        {
          width: 0,
        },
        {
          width: "100%",
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={mainRef}>
      <div className="w-full mx-auto" style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen w-full flex flex-col items-start justify-center overflow-hidden">
          {/* Horizontal Line */}
          <div className="absolute bottom-20 left-0 right-0 h-0.5 bg-gray-300">
            <div ref={lineRef} className="h-full bg-black origin-left rounded-full" style={{ width: 0 }} />
          </div>

          <motion.div ref={carouselRef} className="flex gap-10" style={{ x }}>
            {galleryImages.map((item, index) => (
              <motion.div {...slideAnimation} key={item.id} className="group relative h-[300px] w-[300px] overflow-hidden rounded-sm bg-black shrink-0">
                <OptimizedImage
                  src={item.url}
                  alt={item.title || `Gallery image ${item.id}`}
                  className="w-full h-full"
                  priority={index < 3} // Prioritize loading first 3 images
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
