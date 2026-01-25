"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, Bot, User, Loader2, Sparkles, Trash2, Boxes, MessageSquare, Terminal, AlertTriangle, Keyboard, Cpu, Zap } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  { label: "OOPs Concepts", icon: <Boxes className="w-4 h-4" /> },
  { label: "DSA Roadmap", icon: <Terminal className="w-4 h-4" /> },
  { label: "Explain Recursion", icon: <MessageSquare className="w-4 h-4" /> },
];

const PLACEHOLDER_TEXTS = [
  "Ask about Data Structures...",
  "Explain a programming concept...",
  "Debug my code logic...",
  "Help with algorithms...",
  "Teach me about databases...",
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dynamic placeholder rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent | string) => {
    const messageContent = typeof e === "string" ? e : input;
    if (e && typeof e !== "string") e.preventDefault();
    if (!messageContent.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: messageContent,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const botMessage: Message = {
        role: "bot",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let streamedContent = "";

      if (reader) {
        setIsLoading(false); // Move to false as we start receiving content
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          streamedContent += chunk;

          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMsg = newMessages[newMessages.length - 1];
            if (lastMsg && lastMsg.role === "bot") {
              lastMsg.content = streamedContent;
            }
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I'm having trouble connecting to the brain right now. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmClearChat = () => {
    setMessages([]);
    setIsClearModalOpen(false);
  };

  // Modal animation variants
  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } },
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      
      {/* Background Polish */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.08),transparent_80%)]" />
      <div className="fixed inset-0 -z-10 bg-[grid-slate-200/[0.04]] bg-[length:32px_32px] dark:bg-[grid-slate-800/[0.05]]" />

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-2 md:px-4 py-16 md:py-20 pb-10">
        
        {/* Page Title */}
        <div className="mb-6 text-center space-y-1">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            DevVault <span className="gradient-text">AI Mentor</span>
          </h1>
        </div>

        <Card className="flex flex-col h-[calc(100vh-140px)] md:h-[700px] border-border/40 shadow-2xl shadow-primary/5 bg-card/40 backdrop-blur-xl overflow-hidden relative rounded-[1.5rem] md:rounded-[2rem]">
          
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-border/40 bg-background/60 backdrop-blur-xl z-20">
            <div className="flex items-center gap-4">
             
              <div className="flex flex-col">
                <h3 className="text-base font-bold tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  DevVault <span className="text-primary italic">Assistant</span>
                </h3>
                <p className="text-[10px] text-muted-foreground/70 font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  Ready to Help
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsClearModalOpen(true)}
              className="rounded-xl border-destructive/20 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/40 transition-all text-xs font-bold hover:scale-105 active:scale-95"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Chat
            </Button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-hidden px-3 md:px-6 py-6 md:py-8 space-y-6 md:space-y-8 scroll-smooth scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 md:gap-4 max-w-[88%] md:max-w-[90%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 border shadow-sm transition-transform hover:scale-110 ${
                      msg.role === "user" ? "bg-primary border-primary/20 text-white" : "bg-muted border-border/50 text-primary"
                    }`}>
                      {msg.role === "user" ? <User className="w-4 h-4 md:w-5 md:h-5" /> : <Bot className="w-4 h-4 md:w-5 md:h-5" />}
                    </div>
                    
                    <div className={`flex flex-col min-w-0 flex-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                      <div className={`px-4 py-3 md:px-6 md:py-4 rounded-[1.25rem] md:rounded-[1.5rem] text-[14px] md:text-[15px] leading-relaxed shadow-sm transition-shadow hover:shadow-md w-full overflow-hidden break-words ${
                        msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-background/80 dark:bg-slate-900/50 border border-border/50 rounded-tl-none font-medium text-foreground/90"
                      }`}>
                        <div className="prose dark:prose-invert max-w-none prose-sm prose-p:my-0 prose-pre:bg-slate-950 prose-pre:border prose-pre:border-white/5 font-medium break-words overflow-x-hidden">
                          <ReactMarkdown
                            components={{
                              pre: ({ children }) => (
                                <pre className="whitespace-pre-wrap break-all md:break-words bg-slate-950 text-slate-100 p-4 rounded-xl border border-white/5 my-4 overflow-x-hidden">
                                  {children}
                                </pre>
                              ),
                              code: ({ node, ...props }) => (
                                <code className="break-all md:break-words font-black" {...props} />
                              ),
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                      <span className="text-[9px] text-muted-foreground mt-2 font-black uppercase tracking-widest opacity-60">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {messages.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <h2 className="text-2xl font-black mb-6" style={{ fontFamily: 'var(--font-space-grotesk)' }}>What are we learning today?</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {QUICK_PROMPTS.map((p, idx) => (
                    <Button 
                      key={idx} 
                      variant="secondary" 
                      size="sm" 
                      className="rounded-2xl hover:bg-primary hover:text-white transition-all text-xs font-bold py-5 px-6 shadow-sm bg-background/50 border border-border/20 hover:scale-105 active:scale-95"
                      onClick={() => handleSendMessage(p.label)}
                    >
                      {p.icon}
                      <span className="ml-2">{p.label}</span>
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-start pl-14"
              >
                <div className="w-4 h-4 rounded-full bg-primary/40 animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-4 md:p-6 bg-background/60 border-t border-border/30 backdrop-blur-md">
            <form 
              onSubmit={handleSendMessage} 
              className="relative flex flex-col gap-2 max-w-4xl mx-auto"
            >
              <div className="relative group">
                {!input && (
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={placeholderIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="text-muted-foreground/50 text-base"
                      >
                        {PLACEHOLDER_TEXTS[placeholderIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="h-14 md:h-16 pl-4 md:pl-6 pr-14 md:pr-16 rounded-[1rem] md:rounded-[1.25rem] bg-background border-2 border-border/40 focus-visible:border-primary/50 focus-visible:ring-0 transition-all text-sm md:text-base shadow-xl group-hover:shadow-primary/5"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2.5 top-2.5 h-11 w-11 rounded-[1.25rem] p-0 shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-transform"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/50 font-bold uppercase tracking-[0.2em] mt-1">
                <span>• DevVault Advanced Learning Engine •</span>
              </div>
            </form>
          </div>
        </Card>
      </div>

      <AnimatePresence>
        {isClearModalOpen && (
          <Dialog open={isClearModalOpen} onOpenChange={setIsClearModalOpen}>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsClearModalOpen(false)}
            />
            <motion.div
              className="fixed left-[50%] top-[50%] z-50 w-full max-w-[340px] translate-x-[-50%] translate-y-[-50%] px-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="rounded-[2rem] border border-border/30 bg-gradient-to-b from-background to-muted/30 backdrop-blur-2xl p-8 shadow-2xl shadow-primary/10">
                <div className="text-center">
                  <motion.div 
                    className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center mx-auto mb-5 border border-primary/20"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  >
                    <Trash2 className="w-9 h-9 text-primary" />
                  </motion.div>
                  <h2 className="text-2xl font-black mb-3 tracking-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>Start Fresh?</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px] mx-auto" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    Your current conversation will be cleared. You can always start a new chat anytime.
                  </p>
                </div>
                <div className="flex gap-3 mt-8 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsClearModalOpen(false)}
                    className="rounded-2xl font-bold flex-1 h-12 border-border/50 hover:bg-muted/50 hover:scale-[1.02] active:scale-[0.98] transition-all "style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    Keep Chatting
                  </Button>
                  <Button 
                    onClick={confirmClearChat}
                    className="rounded-2xl font-bold flex-1 h-12 bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all" style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    Clear & Restart
                  </Button>
                </div>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
