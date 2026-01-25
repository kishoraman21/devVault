"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  TrendingUp,
  BookOpen,
  RefreshCw,
  CheckCircle2,
  Code2,
  Users,
  LucideIcon,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";

interface Feature {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  iconBg: string;
  badge?: string;
  stats?: string[];
  className: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: BookOpen,
    badge: "Interactive",
    title: "Mastery Guides & Notebooks",
    description:
      "Dive into our comprehensive Mastery Guides and Interactive Notebooks. Beyond static PDFs, experience code-driven learning designed for deep understanding.",
    gradient: "from-blue-600 to-cyan-500",
    iconBg: "bg-blue-500/10",
    stats: ["100+ Notebooks", "50+ Guides", "Real-world Labs"],
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    id: 2,
    icon: Terminal,
    title: "Project-Based Learning",
    description:
      "Apply your knowledge with integrated projects within our notebooks. Build as you learn.",
    gradient: "from-amber-600 to-orange-500",
    iconBg: "bg-amber-500/10",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 3,
    icon: Code2,
    title: "Interactive DSA Labs",
    description:
      "Master data structures and algorithms with interactive visualization and playground environments.",
    gradient: "from-rose-600 to-pink-500",
    iconBg: "bg-rose-500/10",
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 4,
    icon: TrendingUp,
    badge: "Placement",
    title: "Interview-Ready Content",
    description:
      "Get career-focused material including frequency-asked questions, system design walkthroughs, and optimized solutions in PDF and Notebook formats.",
    gradient: "from-violet-600 to-purple-500",
    iconBg: "bg-violet-500/10",
    stats: ["95% Success", "1000+ Qs"],
    className: "lg:col-span-2 lg:row-span-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative py-24 bg-background">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-primary mb-4"
          >
            <div className="h-[1px] w-12 bg-primary/30" />
            <span className="text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Core Advantages
            </span>
            <div className="h-[1px] w-12 bg-primary/30" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1]"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Fueling your <span className="text-primary italic">career transition.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-md"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              We provide the tools and insights needed to navigate the competitive 
              landscape of modern software engineering placements.
            </motion.p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className={`${feature.className} group`}
            >
              <Card className="h-full relative overflow-hidden bg-card border-border/50 hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5">
                <div className="p-8 flex flex-col h-full">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-[0.03] group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-xl ${feature.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-6 h-6 text-foreground" />
                      </div>
                      {feature.badge && (
                        <Badge variant="secondary" className="bg-secondary/50 text-[10px] uppercase tracking-tighter font-semibold">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    <div className="mt-auto flex items-end justify-between">
                      {feature.stats ? (
                        <div className="flex gap-2">
                          {feature.stats.map((stat, i) => (
                            <span key={i} className="text-[10px] font-bold text-muted-foreground bg-secondary/30 px-2 py-1 rounded">
                              {stat}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}