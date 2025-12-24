"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const { scrollY } = useScroll();

  // Check screen size for mobile view
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Detect loading state and blinking animation
  useEffect(() => {
    // Start blinking during loading (first 2 seconds)
    setIsBlinking(true);

    const timer = setTimeout(() => {
      setIsBlinking(false);
    }, 2000); // Match loader duration

    return () => clearTimeout(timer);
  }, []);

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      if (isBlinking) {
        // During loading: HH:mm format only (no seconds)
        setCurrentTime(
          new Date().toLocaleTimeString("en-US", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } else if (isMobileView) {
        // Mobile: HH:mm AM/PM
        setCurrentTime(
          new Date().toLocaleTimeString("en-US", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } else {
        // Desktop: Always show full HH:mm:ss AM/PM format for consistent width
        setCurrentTime(
          new Date().toLocaleTimeString("en-US", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        );
      }
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [isMobileView, isBlinking]);

  // Detect scroll position and direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollThreshold = 100; // Increase threshold for better UX

    // Update scrolled state
    setIsScrolled(latest > 50);

    // Only hide navbar if scrolled past threshold and not at the very top
    if (latest > lastScrollY && latest > scrollThreshold && !isMenuOpen) {
      // Scrolling down - hide navbar
      setIsHidden(true);
    } else if (latest < lastScrollY || latest <= scrollThreshold) {
      // Scrolling up or near top - show navbar
      setIsHidden(false);
    }

    setLastScrollY(latest);
  });

  // Show navbar when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      setIsHidden(false);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isHidden ? -100 : 0,
        opacity: 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-2 sm:top-5 z-50"
      style={{
        left: "0.5rem",
        right: "0.5rem",
        cursor: "none",
      }}>
      <motion.div
        animate={{
          backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(12px)",
          marginLeft: isScrolled ? "15%" : "0.5rem",
          marginRight: isScrolled ? "15%" : "0.5rem",
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="px-3 sm:px-6 lg:px-8 rounded-2xl sm:rounded-4xl mx-auto"
        style={{
          marginLeft: isScrolled ? "30%" : "0.5rem",
          marginRight: isScrolled ? "30%" : "0.5rem",
        }}>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1 h-14 sm:h-16">
          {/* Logo */}
          <div className="">
            <Link href="/" className="flex items-center cursor-target">
              <img src="/logo.png" alt="Loggs Visual Logo" className="h-8 sm:h-10 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
            </Link>
          </div>

          {/* Center Clock */}
          <div className="flex justify-center">
            <motion.div
              animate={isBlinking ? { opacity: [1, 0, 1] } : { opacity: 1 }}
              transition={{
                duration: isBlinking ? 0.8 : 0.3,
                repeat: isBlinking ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="text-white font-mono text-xs md:text-sm font-medium tracking-wider text-center">
              {currentTime}
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-end">
            <motion.div
              animate={{
                gap: isScrolled ? "4px" : "16px",
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2 font-mono">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-target">
                  Home
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/about" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-target">
                  About Us
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/works" className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-target">
                  Works
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button whileTap={{ scale: 0.9 }} onClick={toggleMenu} className="text-white hover:text-gray-300 p-2">
              <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }} className="lg:hidden pb-4">
            <div className="px-4 pt-2 space-y-1 font-mono">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link href="/" className="text-white hover:text-gray-300 block py-1 text-base font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link href="/about" className="text-white hover:text-gray-300 block py-1 text-base font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                  About Us
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link href="/works" className="text-white hover:text-gray-300 block py-1 text-base font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                  Works
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
