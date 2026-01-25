"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { notebooksData } from "@/data/notebooks";
import { 
  Database, 
  Globe, 
  Braces, 
  Code, 
  ChevronRight,
  BookOpen,
  Menu,
  X,
  Cpu,
  Terminal,
  Server,
  Atom
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function NotebookSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 bg-primary text-primary-foreground rounded-full shadow-lg"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className={`
        fixed inset-0 z-50 transition-transform duration-300 md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        bg-background md:bg-transparent md:inset-auto p-6 md:p-4 h-full md:h-auto overflow-y-auto md:overflow-visible
      `}>
        <div className="flex items-center gap-3 mb-8 px-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold font-space">Study Guide</h2>
        </div>

        <nav className="space-y-8">
          {notebooksData.map((subject) => {
            const Icon = iconMap[subject.icon] || Code;
            const isActiveSubject = pathname.includes(`/notebooks/${subject.slug}`);

            return (
              <div key={subject.id} className="space-y-2">
                <Link 
                  href={`/notebooks/${subject.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300
                    ${isActiveSubject ? "bg-primary/10 text-primary font-bold" : "hover:bg-muted text-muted-foreground hover:text-foreground"}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-space">{subject.title}</span>
                </Link>

                <AnimatePresence>
                  {isActiveSubject && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-8 space-y-1 border-l-2 border-primary/20"
                    >
                      {subject.chapters.map((chapter) => {
                        const chapterUrl = `/notebooks/${subject.slug}/${chapter.slug}`;
                        const isChapterActive = pathname === chapterUrl;

                        return (
                          <Link
                            key={chapter.id}
                            href={chapterUrl}
                            onClick={() => setIsOpen(false)}
                            className={`
                              flex items-center gap-2 py-2 px-4 text-xs transition-colors
                              ${isChapterActive ? "text-primary font-bold border-l-2 border-primary -ml-[2px]" : "text-muted-foreground hover:text-foreground"}
                            `}
                          >
                            {chapter.title}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
