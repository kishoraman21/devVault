"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, Minus } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Is DevVault really 100% free?",
    answer: "DevVault offers a balanced approach: we provide a wide range of high-quality free resources to support every student. However, our comprehensive, expertly-curated placement bundles and specialized masterclasses are premium. These paid resources are meticulously designed to give you a competitive edge, saving you hundreds of hours of research and practice.",
  },
  {
    id: 2,
    question: "What subjects are covered in the resources?",
    answer: "We cover a wide range of CSE subjects including Data Structures & Algorithms (Java/C++), SQL, MongoDB, Node.js, Express, React, and core concepts like OOPs and OS.",
  },
  {
    id: 3,
    question: "Are these resources enough for FAANG preparation?",
    answer: "Our resources are designed to build a strong foundation. While they cover most interview topics, we always recommend practicing live coding on platforms like LeetCode alongside our PDFs.",
  },
  {
    id: 4,
    question: "What is your refund policy?",
    answer: "Once a purchase is made, payments are non-refundable. You can head to our refund policy page to know more about the terms and conditions.",
  },
  {
    id: 5,
    question: "Can I contribute my own notes to DevVault?",
    answer: "We love contributions! You can reach out to us via the Contact section to share your notes. After a quick quality check, we'll feature them.",
  },
  {
    id: 6,
    question: "How do I download my PDFs?",
    answer: "The process is simple: browse our collection, select the PDF you need, provide your email address, and we'll immediately send the download links directly to your inbox.",
  },
];

export default function FAQSection() {
  const [activeId, setActiveId] = useState<number | null>(1);

  return (
    <section id="faqs" className="py-32 bg-background relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-violet-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-32 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-primary mb-6"
            >
              <div className="h-[1px] w-12 bg-primary/30" />
              <span className="text-sm font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                Ask Anything
              </span>
              <div className="h-[1px] w-12 bg-primary/30" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1] mb-8"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Master the platform with <span className="text-primary italic">clarity.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-md"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              Everything you need to know about DevVault resources, 
              community contributions, and placement support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-3xl bg-secondary/30 border border-border/50 inline-flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold text-sm tracking-tight text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Still stuck?
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Our support team is available 24/7 for you.</p>
              <Link 
                href="/contactus"
                className="text-sm font-bold text-primary flex items-center gap-2 hover:gap-3 transition-all w-fit"
              >
                Contact Support <span className="text-lg">→</span>
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                layout
              >
                <div 
                  onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                  className={`cursor-pointer rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                    activeId === faq.id 
                    ? "bg-card border-primary/50 shadow-2xl shadow-primary/5 p-8" 
                    : "bg-secondary/10 border-border/50 hover:border-primary/30 p-8"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                      activeId === faq.id ? "text-primary" : "text-foreground"
                    }`} style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                      activeId === faq.id ? "bg-primary text-white rotate-180" : "bg-secondary text-muted-foreground"
                    }`}>
                      {activeId === faq.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="text-muted-foreground leading-relaxed text-lg border-t border-border/50 pt-6">
                          {faq.id === 4 ? ( // Changed from faq.id === 5 to faq.id === 4 based on the instruction's context
                            <>
                              Once a purchase is made, payments are <span className="font-bold text-foreground">non-refundable</span>. 
                              You can head to our <Link href="/refund" className="text-primary hover:underline underline-offset-4 font-semibold">refund policy page</Link> to know more about the terms and conditions.
                            </>
                          ) : (
                            faq.answer
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
