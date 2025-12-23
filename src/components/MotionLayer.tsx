"use client";

import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface ShadowSettings {
  enabled: boolean;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

interface BorderSettings {
  enabled: boolean;
  width: number;
  style: "solid" | "dashed" | "dotted";
  color: string;
}

interface LayerSettings {
  spacing: number;
  width: number;
  widthType: number;
  height: number;
  heightType: number;
  borderRadius: number;
  border: BorderSettings;
  shadow: ShadowSettings;
  color: string;
  opacity: number;
}

interface HoverSettings {
  enabled: boolean;
  elevation: number;
  scale: number;
  transition: any;
}

interface ContentSettings {
  sizing: "fill" | "fit" | "fixed" | "stretched";
  fixedWidth?: number;
  fixedHeight?: number;
  padding: number;
  alignment: "center" | "start" | "end" | "stretch";
}

interface AutoPlaySettings {
  enabled: boolean;
  mode: "continuous" | "step";
  speed?: number;
  stepDelay?: number;
  stepTransition?: any;
}

interface DepthOfFieldSettings {
  enabled: boolean;
  opacityFactor: number;
  blurFactor: number;
  focusRange: number;
}

interface MotionLayerScrollerProps {
  backgroundColor?: string;
  scrollSensitivity?: number;
  perspective?: number;
  cameraTilt?: number;
  cameraRotation?: number;
  minLayers?: number;
  layerSettings?: LayerSettings;
  hoverSettings?: HoverSettings;
  contentSettings?: ContentSettings;
  autoPlay?: AutoPlaySettings;
  depthOfField?: DepthOfFieldSettings;
  children?: React.ReactNode[];
}

const defaultLayerSettings: LayerSettings = {
  spacing: 128,
  width: 400,
  widthType: 0,
  height: 400,
  heightType: 0,
  borderRadius: 8,
  border: { enabled: false, width: 2, style: "solid", color: "rgba(255,255,255,0.3)" },
  shadow: { enabled: false, x: 0, y: 4, blur: 30, spread: 0, color: "rgba(0,0,0,0.3)" },
  color: "rgb(50, 50, 50)",
  opacity: 0.9,
};

const defaultHoverSettings: HoverSettings = {
  enabled: true,
  elevation: 20,
  scale: 1.05,
  transition: { duration: 0.2, ease: "easeOut" },
};

const defaultContentSettings: ContentSettings = {
  sizing: "fill",
  padding: 16,
  alignment: "center",
  fixedWidth: 200,
  fixedHeight: 150,
};

const defaultAutoPlay: AutoPlaySettings = {
  enabled: false,
  mode: "continuous",
  speed: 50,
  stepDelay: 1000,
};

const defaultDepthOfField: DepthOfFieldSettings = {
  enabled: false,
  opacityFactor: 0.6,
  blurFactor: 0,
  focusRange: 0.3,
};

export default function MotionLayer({
  backgroundColor = "#000000",
  scrollSensitivity = 0.5,
  perspective = 1900,
  cameraTilt = -25,
  cameraRotation = -45,
  minLayers = 20,
  layerSettings = defaultLayerSettings,
  hoverSettings = defaultHoverSettings,
  contentSettings = defaultContentSettings,
  autoPlay = defaultAutoPlay,
  depthOfField = defaultDepthOfField,
  children,
}: MotionLayerScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Motion values for smooth animations
  const scrollY = useMotionValue(0);
  const smoothScroll = useSpring(scrollY, { stiffness: 100, damping: 30 });

  // Calculate total layers needed
  const numLinked = children?.length || 0;
  const totalLayers = Math.max(minLayers, numLinked > 0 ? Math.max(numLinked * 2, minLayers) : minLayers);

  // Handle manual wheel scrolling
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      const delta = e.deltaY * factor * scrollSensitivity;
      const current = scrollY.get() + delta;
      scrollY.set(current);
    },
    [scrollSensitivity, scrollY]
  );

  // Update container size and add wheel listener
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const updateSize = () => {
      if (container) {
        setContainerSize({
          width: container.offsetWidth,
          height: container.offsetHeight,
        });
      }
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // Auto Play functionality
  useEffect(() => {
    if (!autoPlay?.enabled) return;

    if (autoPlay.mode === "continuous") {
      let animationFrameId: number;
      let lastTime = performance.now();

      const animate = (currentTime: number) => {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        const increment = (autoPlay.speed || 50) * (deltaTime / 1000);
        const current = scrollY.get();
        scrollY.set(current + increment);
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrameId);
    } else if (autoPlay.mode === "step") {
      const stepInterval = setInterval(() => {
        const current = scrollY.get();
        const targetScroll = current + layerSettings.spacing;
        const startScroll = current;
        const duration = autoPlay.stepTransition?.duration || 0.5;
        const startTime = performance.now();

        const animateStep = (currentTime: number) => {
          const elapsed = (currentTime - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          const newScroll = startScroll + (targetScroll - startScroll) * eased;
          scrollY.set(newScroll);
          if (progress < 1) {
            requestAnimationFrame(animateStep);
          }
        };

        requestAnimationFrame(animateStep);
      }, autoPlay.stepDelay || 1000);

      return () => clearInterval(stepInterval);
    }
  }, [autoPlay, scrollY, layerSettings.spacing]);

  // Scene rotation
  const sceneRotateX = useTransform(smoothScroll, [-5000, 5000], [cameraTilt - 5, cameraTilt + 5]);

  // Helper functions
  const getSizeValue = (value: number, type: number) => {
    return type === 0 ? `${value}px` : value;
  };

  const getBoxShadow = (shadow: ShadowSettings) => {
    if (!shadow.enabled) return "none";
    return `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
  };

  const getBorder = (border: BorderSettings) => {
    if (!border?.enabled) return "none";
    return `${border.width}px ${border.style} ${border.color}`;
  };

  const getContentStyles = (): React.CSSProperties => {
    const settings = contentSettings || defaultContentSettings;
    const baseStyles: React.CSSProperties = {
      boxSizing: "border-box",
      padding: `${settings.padding}px`,
      borderRadius: layerSettings.borderRadius > 0 ? `${layerSettings.borderRadius - 4}px` : "0px",
      pointerEvents: "auto",
    };

    switch (settings.sizing) {
      case "fill":
        return {
          ...baseStyles,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: settings.alignment === "start" ? "flex-start" : settings.alignment === "end" ? "flex-end" : "center",
          alignItems: settings.alignment === "start" ? "flex-start" : settings.alignment === "end" ? "flex-end" : "center",
        };
      case "fit":
        return {
          ...baseStyles,
          width: "fit-content",
          height: "fit-content",
          maxWidth: "100%",
          maxHeight: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        };
      case "fixed":
        return {
          ...baseStyles,
          width: settings.fixedWidth ? `${settings.fixedWidth}px` : "100%",
          height: settings.fixedHeight ? `${settings.fixedHeight}px` : "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        };
      default:
        return {
          ...baseStyles,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        };
    }
  };

  // Layer component
  const Layer = memo(({ index, content }: { index: number; content: React.ReactNode }) => {
    const [hovered, setHovered] = useState(false);

    const layerBackgroundColor = React.useMemo(() => {
      if (!depthOfField?.enabled) {
        const color = layerSettings.color;
        if (color.startsWith("rgba")) {
          const match = color.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*[\d.]+\)/);
          if (match) return `rgb(${match[1]}, ${match[2]}, ${match[3]})`;
        }
        if (color.startsWith("hsla")) {
          const match = color.match(/hsla?\(([\d.]+),\s*([\d.%]+),\s*([\d.%]+),\s*[\d.]+\)/);
          if (match) return `hsl(${match[1]}, ${match[2]}, ${match[3]})`;
        }
        if (color.length === 9 && color.startsWith("#")) {
          return color.slice(0, 7);
        }
        return color;
      }
      return layerSettings.color;
    }, [depthOfField?.enabled, layerSettings.color]);

    const zInitial = -index * layerSettings.spacing;
    const layerZ = useTransform(smoothScroll, (value) => {
      const totalDepth = totalLayers * layerSettings.spacing;
      let currentZ = zInitial + value;
      const cycle = totalDepth;
      const normalizedZ = ((currentZ % cycle) + cycle) % cycle;
      const wrappedZ = normalizedZ - cycle * 0.5;
      return wrappedZ;
    });

    const scale = useTransform(layerZ, [-totalLayers * layerSettings.spacing * 0.5, 0, totalLayers * layerSettings.spacing * 0.5], [0.6, 1, 1.4], { clamp: false });

    const opacity = useTransform(
      layerZ,
      depthOfField?.enabled
        ? [
            -totalLayers * layerSettings.spacing * 0.5,
            -totalLayers * layerSettings.spacing * (depthOfField.focusRange || 0.25),
            0,
            totalLayers * layerSettings.spacing * (depthOfField.focusRange || 0.25),
            totalLayers * layerSettings.spacing * 0.5,
          ]
        : [-totalLayers * layerSettings.spacing * 0.5, 0, totalLayers * layerSettings.spacing * 0.5],
      depthOfField?.enabled
        ? [0, layerSettings.opacity * (1 - (depthOfField.opacityFactor || 0.5)), layerSettings.opacity, layerSettings.opacity * (1 - (depthOfField.opacityFactor || 0.5)), 0]
        : [layerSettings.opacity, layerSettings.opacity, layerSettings.opacity],
      { clamp: true }
    );

    const blur = useTransform(
      layerZ,
      [
        -totalLayers * layerSettings.spacing * 0.5,
        -totalLayers * layerSettings.spacing * (depthOfField?.focusRange || 0.25),
        0,
        totalLayers * layerSettings.spacing * (depthOfField?.focusRange || 0.25),
        totalLayers * layerSettings.spacing * 0.5,
      ],
      depthOfField?.enabled && depthOfField.blurFactor > 0 ? [depthOfField.blurFactor * 10, depthOfField.blurFactor * 2, 0, depthOfField.blurFactor * 2, depthOfField.blurFactor * 10] : [0, 0, 0, 0, 0],
      { clamp: true }
    );

    const filterValue = useTransform(blur, (blurValue) => {
      if (!depthOfField?.enabled || depthOfField.blurFactor <= 0) return "none";
      if (hovered) return "none";
      return blurValue <= 0 ? "none" : `blur(${blurValue}px)`;
    });

    const zIndex = useTransform(layerZ, (zValue) => Math.round(5000 + zValue * 10));

    return (
      <motion.div
        className="motion-layer cursor-target"
        style={{
          position: "absolute",
          width: getSizeValue(layerSettings.width, layerSettings.widthType),
          height: getSizeValue(layerSettings.height, layerSettings.heightType),
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
          transformOrigin: "center center",
          translateZ: layerZ,
          scale,
          opacity,
          filter: filterValue,
          zIndex: hovered ? 999999 : zIndex,
          backgroundColor: layerBackgroundColor,
          boxShadow: getBoxShadow(layerSettings.shadow),
          borderRadius: `${layerSettings.borderRadius}px`,
          border: getBorder(layerSettings.border),
          pointerEvents: "auto",
          willChange: "transform, opacity",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: hoverSettings.enabled ? "pointer" : "default",
        }}
        whileHover={
          hoverSettings.enabled
            ? {
                translateY: -hoverSettings.elevation,
                boxShadow: `0 ${hoverSettings.elevation}px ${hoverSettings.elevation * 2}px rgba(0,0,0,0.25)`,
              }
            : undefined
        }
        transition={hoverSettings.transition || { duration: 0.2, ease: "easeOut" }}
        whileTap={hoverSettings.enabled ? { translateY: -5 } : undefined}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}>
        <div style={getContentStyles()}>{content}</div>
      </motion.div>
    );
  });

  Layer.displayName = "Layer";

  const renderLayers = () => {
    return Array.from({ length: totalLayers }).map((_, index) => {
      let content: React.ReactNode = null;

      if (children && children.length > 0) {
        const objectIndex = index % children.length;
        content = children[objectIndex];
      } else {
        content = (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "2px dashed rgba(255, 255, 255, 0.3)",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "48px",
              fontWeight: "bold",
              userSelect: "none",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}>
            {index + 1}
          </div>
        );
      }

      return <Layer key={`layer-${index}`} index={index} content={content} />;
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: backgroundColor,
        overflow: "hidden",
      }}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          perspective: `${perspective}px`,
          perspectiveOrigin: "center center",
          WebkitTransformStyle: "preserve-3d",
          transformStyle: "preserve-3d",
          pointerEvents: "auto",
        }}>
        <motion.div
          className="scene-container"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            rotateX: sceneRotateX,
            rotateY: cameraRotation,
            willChange: "transform",
            WebkitTransformStyle: "preserve-3d",
            pointerEvents: "none",
          }}>
          {renderLayers()}
        </motion.div>
      </div>
    </div>
  );
}
