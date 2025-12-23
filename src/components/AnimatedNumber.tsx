'use client';

import {
    motion,
    useSpring,
    useTransform,
    useMotionValue,
    useInView,
} from 'motion/react';
import { useEffect, useRef, useMemo } from 'react';

interface AnimatedNumberProps {
    start?: number;
    end?: number;
    decimals?: number;
    className?: string;
    showPlus?: boolean;
}

export default function AnimatedNumber({
    start = 0,
    end = 100,
    decimals = 0,
    className,
    showPlus = false,
}: AnimatedNumberProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    // Detect mobile device for optimization
    const isMobile = useMemo(() => {
        if (typeof window === 'undefined') return false;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth < 768;
    }, []);

    // Optimize spring animation for mobile
    const springConfig = useMemo(() => {
        return isMobile
            ? { damping: 25, stiffness: 120 } // Faster animation for mobile
            : { damping: 30, stiffness: 100 }; // Default for desktop
    }, [isMobile]);

    const value = useMotionValue(start);
    const spring = useSpring(value, springConfig);

    // Optimize decimals for mobile (reduce precision for better performance)
    const optimizedDecimals = useMemo(() => {
        return isMobile && decimals > 0 ? Math.max(0, decimals - 1) : decimals;
    }, [isMobile, decimals]);

    const display = useTransform(spring, (num) => {
        const n = Number(num);
        const fixed = n.toFixed(optimizedDecimals);
        const formatted = n >= 1000 ? Number(fixed).toLocaleString() : fixed;
        return showPlus ? `${formatted}+` : formatted;
    });

    useEffect(() => {
        if (isInView) {
            value.set(end);
        }
    }, [isInView, end, value]);

    return (
        <motion.span ref={ref} className={className}>
            {display}
        </motion.span>
    );
}
