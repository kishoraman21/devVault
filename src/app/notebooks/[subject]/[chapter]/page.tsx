import React from "react";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { notebooksData } from "@/data/notebooks";
import ReactMarkdown from "react-markdown";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  BookOpen,
  ArrowLeft,
  Trophy,
  Target,
  CheckCircle2,
  Lightbulb,
  Flag,
  Bot,
  MessageSquare
} from "lucide-react";

async function getChapterContent(subjectSlug: string, chapterSlug: string) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "notebooks",
    subjectSlug,
    `${chapterSlug}.md`
  );

  try {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
  } catch (error) {
    console.error("Error reading markdown file:", error);
  }
  return null;
}

export default async function ChapterPage({ params }: { params: Promise<{ subject: string; chapter: string }> }) {
  const { subject: subjectSlug, chapter: chapterSlug } = await params;
  
  const subject = notebooksData.find((s) => s.slug === subjectSlug);
  const chapterIdx = subject?.chapters.findIndex((c) => c.slug === chapterSlug) ?? -1;
  const chapter = subject?.chapters[chapterIdx];
  const nextChapter = subject?.chapters[chapterIdx + 1];
  const prevChapter = subject?.chapters[chapterIdx - 1];

  const content = await getChapterContent(subjectSlug, chapterSlug);

  if (!subject || !chapter) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Content not found</h1>
        <Link href="/notebooks" className="text-primary hover:underline">Return to Library</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-20">
      {/* Scroll Progress Bar (Sticky) */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-muted">
        <div className="h-full bg-primary w-0 animate-[shimmer_2s_infinite]" id="scroll-progress"></div>
      </div>

      <Link 
        href={`/notebooks/${subject.slug}`} 
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-secondary/30 border border-border/50 text-[11px] font-black font-space uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group w-fit hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to {subject.title}
      </Link>

      {/* Header Section */}
      <div className="space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-border/30 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${
                chapter.level === 'Beginner' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                chapter.level === 'Intermediate' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                'bg-rose-500/10 text-rose-500 border-rose-500/20'
              }`}>
                {chapter.level}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-space">
                <Clock className="w-3.5 h-3.5" />
                <span>{chapter.duration} Read</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-space tracking-tight leading-[1.1]">
              {chapter.title}
            </h1>
            <div className="pt-2">
              <Link 
                href="/chatbot"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 text-violet-500 hover:bg-violet-500/20 border border-violet-500/20 transition-all font-bold text-xs group"
              >
                <Bot className="w-4 h-4 transition-transform group-hover:rotate-12" />
                DevVault AI Assistant
              </Link>
            </div>
          </div>
        </div>

        {/* Learning Objectives Box */}
        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5 border border-primary/10 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
             <Target className="w-24 h-24 text-primary" />
          </div>
          <h3 className="text-lg font-black font-space mb-6 flex items-center gap-2">
            <Flag className="w-5 h-5 text-primary" />
            Learning Objectives
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapter.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                {obj}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Article Content Area */}
      <div className="bg-card/20 backdrop-blur-sm rounded-[3rem] p-8 md:p-16 border border-border/40 shadow-sm min-h-[600px]">
        <article className="prose prose-invert max-w-none 
          /* Resetting default prose margins to give full control via components if needed, 
             but keeping prose for basic text colors and sizing */
          prose-headings:m-0 prose-p:m-0 prose-ul:m-0 prose-li:m-0 prose-pre:m-0
        ">
          {content ? (
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-4xl md:text-5xl font-black font-space mb-12 pb-6 border-b border-primary/20 text-foreground tracking-tight">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-black font-space mt-20 mb-10 text-foreground flex items-center gap-4 group">
                  <span className="w-2 h-10 bg-primary rounded-full transition-transform group-hover:scale-y-110"></span>
                  {children}
                </h2>,
                h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold font-space mt-12 mb-6 text-primary/90">{children}</h3>,
                p: ({ children }) => <p className="text-[17px] md:text-lg leading-[1.8] text-foreground/80 font-medium mb-10 tracking-wide">{children}</p>,
                ul: ({ children }) => <ul className="space-y-6 mb-12 ml-6 list-disc marker:text-primary marker:font-black">{children}</ul>,
                ol: ({ children }) => <ol className="space-y-6 mb-12 ml-6 list-decimal marker:text-primary marker:font-black">{children}</ol>,
                li: ({ children }) => <li className="text-[17px] md:text-lg text-foreground/80 leading-relaxed pl-2">{children}</li>,
                code: ({ node, className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !match ? (
                    <code className="bg-primary/10 text-primary px-2 py-0.5 rounded-md font-bold text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <div className="my-12 rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl bg-[#0d1117] dark:bg-slate-950">
                      <div className="bg-slate-900 border-b border-white/5 px-6 py-3 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{match[1]} code</span>
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                        </div>
                      </div>
                      <pre className="p-8 md:p-10 overflow-x-auto text-sm md:text-base leading-relaxed scrollbar-thin scrollbar-thumb-white/10 text-slate-100">
                        <code className={className} {...props}>{children}</code>
                      </pre>
                    </div>
                  );
                },
                strong: ({ children }) => <strong className="font-black text-foreground">{children}</strong>,
                hr: () => <hr className="my-20 border-border/50" />,
              }}
            >
              {content}
            </ReactMarkdown>
          ) : (
            <div className="p-16 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-black font-space mb-2">Deep Dive in Progress</h3>
              <p className="text-muted-foreground font-space text-lg">Our mentors are crafting detailed notes for this chapter. Stay tuned!</p>
            </div>
          )}
        </article>
      </div>

      {/* AI Help Section */}
      <div className="p-8 rounded-[2.5rem] bg-violet-500/5 border border-violet-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-violet-500/20 rounded-2xl">
            <Bot className="w-6 h-6 text-violet-500" />
          </div>
          <div>
            <h4 className="font-bold font-space text-lg">Confused about this chapter?</h4>
            <p className="text-sm text-muted-foreground font-space">Ask our DevVault AI Assistant for instant clarification!</p>
          </div>
        </div>
        <Link 
          href="/chatbot"
          className="px-6 py-3 rounded-xl bg-violet-500 text-white font-bold font-space text-sm hover:bg-violet-600 transition-all shadow-lg shadow-violet-500/25 whitespace-nowrap"
        >
          Ask DevVault AI
        </Link>
      </div>


      {/* Navigation Between Chapters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
        {prevChapter ? (
          <Link 
            href={`/notebooks/${subject.slug}/${prevChapter.slug}`}
            className="group flex flex-col p-8 rounded-[2.5rem] bg-card/40 border border-border/40 hover:border-primary/50 transition-all text-left shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-4 flex items-center gap-2">
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Previous Chapter
            </span>
            <span className="text-xl font-black font-space group-hover:text-primary transition-colors leading-tight">{prevChapter.title}</span>
          </Link>
        ) : <div />}

        {nextChapter ? (
          <Link 
            href={`/notebooks/${subject.slug}/${nextChapter.slug}`}
            className="group flex flex-col p-8 rounded-[2.5rem] bg-card/40 border border-border/40 hover:border-primary/50 transition-all text-right shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-4 flex items-center justify-end gap-2">
              Next Chapter
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-xl font-black font-space group-hover:text-primary transition-colors leading-tight">{nextChapter.title}</span>
          </Link>
        ) : (
          <Link 
            href="/notebooks"
            className="group flex flex-col p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 hover:border-primary/50 transition-all text-right shadow-lg"
          >
             <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-4 flex items-center justify-end gap-2">
              Course Complete
              <Trophy className="w-4 h-4" />
            </span>
            <span className="text-xl font-black font-space leading-tight">Return to Library</span>
          </Link>
        )}
      </div>
    </div>
  );
}
