"use client";

import { motion } from "framer-motion";
import { LightBoard } from "./ui/lightboard";

export function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0">
        <LightBoard updateInterval={100} gap={2} lightSize={6} text="LOGGS Visual" />
      </div>
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-8 py-16">
          {/* Bottom Section */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Loggs Visual. All rights reserved.</div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <motion.a whileHover={{ scale: 1.05 }} href="#" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} href="#" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
