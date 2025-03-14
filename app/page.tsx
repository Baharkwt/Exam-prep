"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { Moon, Sun, BookOpen, Trophy, Target, BarChart, Search } from 'lucide-react';

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [stats] = useState({
    users: 12000,
    testsToday: 500,
    liveQuizzes: 150,
    successRate: 85
  });

  const [currentAffairs] = useState([
    'RBI announces new monetary policy updates for 2025',
    'SSC releases comprehensive exam schedule for upcoming year',
    'UPSC introduces new changes in prelims pattern',
    'Banking sector recruitment drive announced'
  ]);

  const features = [
    {
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      title: "Comprehensive Study Material",
      description: "Access a vast library of mock tests and study resources"
    },
    {
      icon: <Trophy className="w-12 h-12 text-primary" />,
      title: "Performance Tracking",
      description: "Monitor your progress with detailed analytics"
    },
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: "Personalized Learning",
      description: "AI-powered recommendations for your study plan"
    },
    {
      icon: <BarChart className="w-12 h-12 text-primary" />,
      title: "Real-time Analytics",
      description: "Track your performance with detailed insights"
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">Moct Platform</h1>
            </div>
            <div className="flex items-center gap-8">
              <nav className="hidden md:flex items-center space-x-8">
                {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-[14px] font-medium hover:text-primary transition-colors px-2 py-1"
                  >
                    {item}
                  </a>
                ))}
              </nav>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  className="h-10 pl-9 rounded-3xl bg-accent/50" 
                  placeholder="Search..." 
                />
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <Button className="h-10 px-6 font-semibold bg-[#4C51BF] hover:bg-[#434190]">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" className="h-10 px-6 font-semibold">
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D3748] to-[#1A202C] opacity-70" />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold mb-6 text-white">Prepare Smarter, Score Better</h2>
          <p className="text-xl text-gray-200 mb-8">
            Join {stats.users.toLocaleString()}+ aspirants preparing for their dream careers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-white/10 backdrop-blur-lg text-white">
              <h3 className="text-2xl font-bold">{stats.testsToday}</h3>
              <p className="text-gray-200">Tests Today</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-lg text-white">
              <h3 className="text-2xl font-bold">{stats.liveQuizzes}</h3>
              <p className="text-gray-200">Live Quizzes</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-lg text-white">
              <h3 className="text-2xl font-bold">{stats.successRate}%</h3>
              <p className="text-gray-200">Success Rate</p>
            </Card>
          </div>
          <div className="flex justify-center gap-4">
            <Button 
              className="h-14 px-8 text-lg font-semibold bg-[#4C51BF] hover:bg-[#434190]"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              className="h-14 px-8 text-lg font-semibold text-white border-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Moct Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Affairs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Current Affairs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentAffairs.map((news, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg">{news}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 Moct Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}