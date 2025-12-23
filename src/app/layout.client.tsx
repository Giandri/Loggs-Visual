"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import PageLoader with SSR disabled to avoid HTMLElement error
const PageLoader = dynamic(() => import("@/components/PageLoader"), {
  ssr: false,
  loading: () => null, // Don't show anything while loading
});

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for actual loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PageLoader isLoading={isLoading} />
      </Suspense>
      {children}
    </>
  );
}
