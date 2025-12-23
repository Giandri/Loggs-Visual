"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { WorkItem } from "@/config/works";

interface WorkModalProps {
  work: WorkItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkModal({ work, isOpen, onClose }: WorkModalProps) {
  if (!work) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-black/30 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh]">
            <div className="relative h-full flex flex-col md:flex-row overflow-y-auto scroll-smooth">
              {/* Close Button */}
              <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="shrink-0 md:flex-1 relative h-64 md:h-full">
                <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent md:bg-linear-to-r" />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 md:p-8 lg:p-12 flex flex-col justify-center md:justify-center text-white min-h-0">
                {/* Category & Year */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">{work.category}</span>
                  <span className="text-white/60 text-sm">{work.year}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">{work.title}</h2>

                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed mb-6 md:mb-8">{work.description}</p>

                {/* Additional Info */}
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full shrink-0" />
                    <span className="text-white/70 text-sm md:text-base">Project ID: #{work.id.toString().padStart(3, "0")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full shrink-0" />
                    <span className="text-white/70 text-sm md:text-base">Category: {work.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full shrink-0" />
                    <span className="text-white/70 text-sm md:text-base">Year: {work.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
