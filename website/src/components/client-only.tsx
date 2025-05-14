"use client";

import { useEffect, useState, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ClientOnly component that only renders its children on the client side
 * after hydration is complete to prevent hydration mismatches.
 * 
 * @param children The content to render on the client
 * @param fallback Optional fallback content to show during server rendering
 */
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return fallback on server, children on client
  return isClient ? <>{children}</> : <>{fallback}</>;
}
