"use client";

import React from "react";
import Link from "next/link";
import { notebooksData } from "@/data/notebooks";
import { motion } from "framer-motion";
import { 
  Database, 
  Globe, 
  Braces, 
  Code, 
  ArrowRight,
  Sparkles,
  ArrowLeft,
  Cpu,
  Terminal,
  Server,
  Atom
} from "lucide-react";

const iconMap: Record<string, any> = {
  Database,
  Globe,
  Braces,
  Code,
  Cpu,
  Terminal,
  Server,
  Atom
};

export default function NotebooksLandingPage() {
  return (
    <div className="space-y-12">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border/50 text-xs font-bold font-space text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Link>

      <div className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest"
        >
          <Sparkles className="w-3 h-3" />
          Master the Core
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black font-space tracking-tight"
        >
          Learning <span className="text-primary italic">Notebooks.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl font-space"
        >
          Structured guides designed to help you master technical subjects chapter by chapter.
          Explore the topics below to start your journey.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notebooksData.map((subject, idx) => {
          const Icon = iconMap[subject.icon] || Code;
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <Link 
                href={`/notebooks/${subject.slug}`}
                className="group block h-full p-8 rounded-[32px] bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="p-2 bg-muted rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 font-space group-hover:text-primary transition-colors">
                  {subject.title}
                </h3>
                <p className="text-muted-foreground text-sm font-space leading-relaxed mb-6">
                  {subject.description}
                </p>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {subject.chapters.length} Chapters
                  </span>
                  <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary/30 w-[40%] group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
