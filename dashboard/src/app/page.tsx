"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page
    router.push('/login');
  }, [router]);

  // Return empty div while redirecting
  return <div className="min-h-screen w-full flex items-center justify-center bg-[#00031b]">
    <div className="animate-pulse text-white text-lg">Redirecting to login...</div>
  </div>;
}
