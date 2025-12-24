"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  description: string;
  period: string;
  current?: boolean;
  technologies?: string[];
}

interface AnimatedTimelineProps {
  experiences: Experience[];
}

export default function AnimatedTimeline({ experiences }: AnimatedTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate timeline line drawing
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          {
            height: 0,
          },
          {
            height: "100%",
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          }
        );
      }

      // Animate each timeline item
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [experiences]);

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#f5f5f5] py-24 px-6 relative overflow-hidden">
      {/* Decorative Elements */}

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif text-black mb-6"
        >
          Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl font-mono text-black/80"
        >
          The Story Behind Loggs Visual.
        </motion.p>
      </div>

      {/* Timeline Container */}
      <div className="max-w-5xl mx-auto relative">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-0 md:-translate-x-1/2 w-0.5  h-full bg-gray-300">
          <div ref={lineRef} className="w-full bg-black origin-top rounded-full" style={{ height: 0 }} />
        </div>

        {/* Timeline Items */}
        <div className="space-y-20">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className={`relative flex items-start ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-black rounded-full  z-10 shadow-lg" />

              {/* Content Card */}
              <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4"></div>
                  <p className="text-gray-700 leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 font-medium">{exp.period}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
