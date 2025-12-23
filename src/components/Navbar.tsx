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
  const { scrollY } = useScroll();

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
          marginLeft: isScrolled ? "30%" : "0.5rem",
          marginRight: isScrolled ? "30%" : "0.5rem",
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
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <motion.div
            animate={{
              scale: isScrolled ? 0.9 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="shrink-0">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Loggs Visual Logo" className="h-8 sm:h-10 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <motion.div
              animate={{
                gap: isScrolled ? "4px" : "16px",
              }}
              transition={{ duration: 0.3 }}
              className="ml-10 flex items-center space-x-4">
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
            <div className="px-4 pt-4 space-y-3">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link href="/" className="text-white hover:text-gray-300 block py-2 text-base font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link href="/about" className="text-white hover:text-gray-300 block py-2 text-base font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
                  About Us
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link href="/works" className="text-white hover:text-gray-300 block py-2 text-base font-medium transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
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
