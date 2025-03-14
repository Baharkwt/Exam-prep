"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Add any logout logic here (e.g., clearing tokens, state, etc.)
    const timeout = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-[400px] p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Logging Out</h1>
        <p className="text-muted-foreground">Please wait while we sign you out...</p>
      </Card>
    </div>
  );
}