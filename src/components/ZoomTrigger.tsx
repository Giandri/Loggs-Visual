"use client";

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ZoomTriggerProps {
  children: ReactNode;
  overlayColor?: string;
  showArrow?: boolean;
  arrowColor?: string;
  clipPathFrom?: string;
  clipPathTo?: string;
  triggerClass?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

export default function ZoomTrigger({
  children,
  overlayColor = '#fdcb6e',
  showArrow = true,
  arrowColor = '#2d3436',
  clipPathFrom = 'polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)',
  clipPathTo = 'polygon(0% 0%, 0% 100%, 0 100%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%, 100% 100%, 100% 0%)',
  triggerClass = '.keyhole-trigger',
  start = 'top top',
  end = 'bottom bottom',
  scrub = true,
  markers = false,
}: ZoomTriggerProps) {
  const keyholeRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isAnimationOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

    if (!isAnimationOk) return;

    const ctx = gsap.context(() => {
      // Animasi keyhole clip-path
      gsap.from(keyholeRef.current, {
        clipPath: clipPathFrom,
        scrollTrigger: {
          trigger: triggerClass,
          start,
          end,
          scrub,
          markers,
        }
      });

      // Animasi arrow fade
      if (showArrow && arrowRef.current) {
        gsap.to(arrowRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: triggerClass,
            start: 'top top',
            end: '+=200',
            scrub: true,
          }
        });
      }
    });

    return () => ctx.revert();
  }, [clipPathFrom, clipPathTo, triggerClass, start, end, scrub, markers, showArrow]);

  return (
    <>
      {/* Keyhole Overlay */}
      <span
        ref={keyholeRef}
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: overlayColor,
          clipPath: clipPathTo,
        }}
        aria-hidden="true"
      />

      {/* Arrow Indicator */}
      {showArrow && (
        <span
          ref={arrowRef}
          className="absolute left-1/2 z-[2]"
          style={{
            top: '72.5vh',
            animation: 'float 1s ease-in-out infinite alternate both',
          }}
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="-5 -5 30 30"
            className="w-8 -ml-4 h-auto"
            style={{
              transform: 'rotate(90deg)',
              stroke: arrowColor,
            }}
          >
            <path
              d="M 0 10 H 20 L 10 0 M 20 10 L 10 20"
              strokeWidth="4"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}

      {/* Content */}
      {children}

      {/* Float Animation */}
      <style jsx>{`
        @keyframes float {
          from {
            transform: translateY(-50%);
          }
          to {
            transform: translateY(50%);
          }
        }
      `}</style>
    </>
  );
}