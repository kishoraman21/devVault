"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notebooksData } from "@/data/notebooks";
import { motion } from "framer-motion";
import { 
  Database, 
  Globe, 
  Braces, 
  Code, 
  ChevronRight,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Clock,
  BarChart,
  Target,
  Trophy
} from "lucide-react";

const iconMap: Record<string, any> = {
  Database,
  Globe,
  Braces,
  Code,
};

export default function SubjectPage() {
  const { subject: subjectSlug } = useParams();
  const subject = notebooksData.find(s => s.slug === subjectSlug);

  if (!subject) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold h-10">Subject not found</h1>
        <Link href="/notebooks" className="text-primary hover:underline">Return to Library</Link>
      </div>
    );
  }

  const Icon = iconMap[subject.icon] || Code;
  const totalDuration = subject.chapters.reduce((acc, c) => acc + parseInt(c.duration), 0);

  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-20">
      <Link 
        href="/notebooks" 
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-secondary/30 border border-border/50 text-[11px] font-black font-space uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group w-fit hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Library
      </Link>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="p-8 bg-primary/10 rounded-[2.5rem] border border-primary/20 shadow-xl shadow-primary/5">
          <Icon className="w-16 h-16 text-primary" />
        </div>
        <div className="space-y-6 flex-1">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
              Course Notebook
            </div>
            <h1 className="text-5xl md:text-6xl font-black font-space tracking-tight leading-none">
              {subject.title}
            </h1>
            <p className="text-xl text-muted-foreground font-space max-w-2xl leading-relaxed">
              {subject.description}
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex flex-wrap gap-8 py-6 border-y border-border/40">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                Chapters
              </p>
              <p className="text-xl font-black font-space">{subject.chapters.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Estimated Time
              </p>
              <p className="text-xl font-black font-space">{totalDuration} Minutes</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <BarChart className="w-3.5 h-3.5" />
                Complexity
              </p>
              <p className="text-xl font-black font-space">Comprehensive</p>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Roadmap */}
      <div className="space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/30 pb-6">
          <h2 className="text-3xl font-black flex items-center gap-3 font-space">
            <Target className="w-8 h-8 text-primary" />
            Curriculum Roadmap
          </h2>
          <span className="text-xs font-bold text-muted-foreground font-space bg-muted px-4 py-2 rounded-xl border border-border/50">
            Self-paced Learning
          </span>
        </div>

        <div className="grid gap-6 relative">
          {/* Vertical Path Line (on desktop) */}
          <div className="absolute left-10 top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary via-primary/20 to-transparent hidden md:block" />

          {subject.chapters.map((chapter, idx) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <Link
                href={`/notebooks/${subject.slug}/${chapter.slug}`}
                className="group flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-[2.5rem] bg-card/40 border border-border/40 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Number Badge */}
                <div className="z-10 w-16 h-16 shrink-0 flex items-center justify-center rounded-[1.25rem] bg-background border border-border/50 group-hover:bg-primary group-hover:text-primary-foreground text-xl font-black transition-all duration-500 font-space shadow-sm">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      chapter.level === 'Beginner' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      chapter.level === 'Intermediate' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-rose-500/10 text-rose-500 border-rose-500/20'
                    }`}>
                      {chapter.level}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5" />
                      {chapter.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black font-space group-hover:text-primary transition-colors tracking-tight">
                    {chapter.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {chapter.learningObjectives.slice(0, 2).map((obj, i) => (
                      <span key={i} className="text-[10px] font-medium text-muted-foreground/70 bg-muted/30 px-3 py-1 rounded-lg border border-border/30">
                        {obj}
                      </span>
                    ))}
                    {chapter.learningObjectives.length > 2 && (
                      <span className="text-[10px] font-medium text-muted-foreground/70 bg-muted/30 px-3 py-1 rounded-lg border border-border/30">
                        + {chapter.learningObjectives.length - 2} more goals
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-muted/50 group-hover:bg-primary/10 transition-colors">
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Completion Card */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: subject.chapters.length * 0.1 }}
             className="p-10 rounded-[3rem] bg-gradient-to-r from-primary to-violet-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/20"
          >
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em]">
                Final Goal
              </div>
              <h3 className="text-3xl font-black font-space tracking-tight">Become a {subject.title} Expert</h3>
              <p className="text-white/80 font-space font-medium max-w-sm">Complete all chapters to unlock your completion certificate and master this subject.</p>
            </div>
            <Trophy className="w-24 h-24 text-white/20 absolute right-10 hidden md:block" />
            <Link 
              href={`/notebooks/${subject.slug}/${subject.chapters[0]?.slug}`}
              className="px-8 py-4 bg-white text-primary font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl font-space text-sm"
            >
              Start Learning Now
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
