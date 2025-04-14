"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Globe } from "@/components/magicui/globe";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  return (
    <div ref={containerRef} className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b backdrop-blur-sm bg-white/50 dark:bg-gray-950/50 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">TAVIO</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            href="#about"
          >
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div ref={fromRef} className="absolute top-0 left-0 w-1 h-1 opacity-0"></div>
          <div ref={toRef} className="absolute bottom-0 right-0 w-1 h-1 opacity-0"></div>
          <AnimatedBeam 
            containerRef={containerRef} 
            fromRef={fromRef} 
            toRef={toRef}
            pathWidth={4}
            curvature={150}
            gradientStartColor="#3b82f6"
            gradientStopColor="#8b5cf6" 
          />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <SparklesText>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                    Transform Your Data into Insights
                  </h1>
                </SparklesText>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Upload your data and let AI create comprehensive dashboards and insights. No technical expertise required.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signin">
                  <Button size="lg" className="rounded-full font-medium">
                    Get Started
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="rounded-full font-medium">
                    Create Account
                  </Button>
                </Link>
              </div>
              <div className="mt-12 relative w-full max-w-3xl mx-auto">
                <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-40 h-40">
                      <Globe />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Everything you need to understand your data at a glance
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "AI-Powered Analysis", description: "Leverage machine learning to uncover hidden patterns and insights in your data." },
                { title: "Instant Dashboards", description: "Auto-generate beautiful visualizations with a single click." },
                { title: "No-Code Experience", description: "Designed for everyone, regardless of technical background." },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 px-4 md:px-6 border-t bg-white dark:bg-gray-950">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2025 Tavio. All rights reserved.
              </p>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" href="#">
                Terms
              </Link>
              <Link className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" href="#">
                Privacy
              </Link>
              <Link className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" href="#">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}