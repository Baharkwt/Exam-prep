"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegister = () => {
    router.push('/dashboard/student');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-[400px] p-6">
        <div className="text-center mb-6">
          <Link href="/" className="text-2xl font-bold text-primary">
            Moct Platform
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">Create Account</h1>
          <p className="text-muted-foreground">Start your learning journey today</p>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full h-14 font-semibold">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
            Sign up with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Input 
            placeholder="Full Name" 
            className="h-14 px-4 rounded-lg border-[#E2E8F0]"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
          />
          <Input 
            type="email" 
            placeholder="Email" 
            className="h-14 px-4 rounded-lg border-[#E2E8F0]"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
          <Input 
            type="password" 
            placeholder="Password" 
            className="h-14 px-4 rounded-lg border-[#E2E8F0]"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          />
          <Input 
            type="password" 
            placeholder="Confirm Password" 
            className="h-14 px-4 rounded-lg border-[#E2E8F0]"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          />

          <Button 
            className="w-full h-14 text-lg font-bold tracking-wide bg-[#4C51BF] hover:bg-[#434190]"
            onClick={handleRegister}
          >
            Register as Student
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}