"use client";

import React from "react";
import NotebookSidebar from "@/components/NotebookSidebar";
import { motion } from "framer-motion";

export default function NotebooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row pt-20">
      {/* Sidebar for Desktop / Bottom Bar for Mobile */}
      <div className="md:w-64 lg:w-72 shrink-0 border-r border-border/50 bg-card/30 backdrop-blur-sm md:sticky md:top-20 md:h-[calc(100vh-5rem)] overflow-y-auto">
        <NotebookSidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full" />
        </div>
        
        <div className="relative z-10 p-6 md:p-12 lg:p-16 max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
