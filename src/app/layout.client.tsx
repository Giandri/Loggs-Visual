"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import PageLoader with SSR disabled
const PageLoader = dynamic(() => import("@/components/PageLoader"), {
  ssr: false,
  loading: () => null,
});

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or wait for actual data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Page Loader */}
      <Suspense fallback={null}>
        <PageLoader isLoading={isLoading} />
      </Suspense>

      {/* Main Content with Fade In Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoading ? 0 : 1,
          transition: {
            duration: 0.8,
            delay: 0.3, // Delay after loader starts exiting
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        }}
        className="min-h-screen">
        {children}
      </motion.div>
    </>
  );
}
