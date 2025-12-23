'use client';

import {
    motion,
    useSpring,
    useTransform,
    useMotionValue,
    useInView,
} from 'motion/react';
import { useEffect, useRef } from 'react';

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
    const value = useMotionValue(start);
    const spring = useSpring(value, { damping: 30, stiffness: 100 });
    const display = useTransform(spring, (num) => {
        const n = Number(num);
        const fixed = n.toFixed(decimals);
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
