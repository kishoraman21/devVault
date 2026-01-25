"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, Compass, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-4">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
          className="relative"
        >
          <span className="text-[12rem] md:text-[18rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/80 to-transparent opacity-20 select-none">
            404
          </span>
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center pt-8"
          >
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6 -mt-8 md:-mt-12"
        >
          <h1 className="text-3xl md:text-5xl font-black font-space tracking-tight text-foreground">
            Lost in the <span className="text-primary italic">Vault?</span>
          </h1>
          <p className="text-lg text-muted-foreground font-space max-w-md mx-auto leading-relaxed">
            The resource you're looking for has either been moved or disappeared into another dimension. 
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              asChild
              className="h-14 px-8 bg-gradient-to-r from-primary to-violet-600 hover:opacity-90 rounded-2xl text-sm font-black transition-all shadow-xl shadow-primary/20 active:scale-95 group"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Safety
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="h-14 px-8 rounded-2xl border-border/50 bg-secondary/30 backdrop-blur-md hover:bg-secondary/50 text-sm font-black transition-all active:scale-95 group font-space"
            >
              <Link href="/browsepdfs">
                <BookOpen className="w-4 h-4 mr-2" />
                Explore Library
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Footer info/links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 font-space"
        >
          <Search className="w-3 h-3" />
          <span>Need help? Try our AI Assistant in the Navbar</span>
        </motion.div>
      </div>

      {/* Grid Pattern Foreground Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }} 
      />
    </div>
  );
}
