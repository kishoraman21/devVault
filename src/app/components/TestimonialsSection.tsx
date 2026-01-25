"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  college: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The OOPS PDFs were a lifesaver for my TCS NQT interview. I used to get confused between abstraction and encapsulation, but the examples here made it stick.",
    author: "Ananya S.",
    role: "3rd Year CSE",
    college: "SRM University",
    rating: 5,
    avatar: "AS",
  },
  {
    id: 2,
    quote: "I was struggling with SQL joins and normalization for months. The cheatsheets on DevVault are so much better than my college textbooks.",
    author: "Kartik M.",
    role: "Final Year",
    college: "VIT Vellore",
    rating: 5,
    avatar: "KM",
  },
  {
    id: 3,
    quote: "Node.js and Express felt overwhelming until I found the backend path here. Built my first project and finally got a decent internship.",
    author: "Rohan K.",
    role: "CS Student",
    college: "IIT Bombay",
    rating: 5,
    avatar: "RK",
  },
  {
    id: 4,
    quote: "The interview questions for Java are exactly what they ask in technical rounds. The tricky bits I learned here helped me land a 12 LPA offer.",
    author: "Sanya P.",
    role: "Recent Graduate",
    college: "BITS Pilani",
    rating: 5,
    avatar: "SP",
  },
  {
    id: 5,
    quote: "The DSA patterns helped me solve 3 questions in 45 minutes during my last mock test. Practical examples over theoretical definitions—that's the key.",
    author: "Ishaan B.",
    role: "3rd Year",
    college: "DTU Delhi",
    rating: 5,
    avatar: "IB",
  },
  {
    id: 6,
    quote: "The placement guides are very practical. They don't just give answers; they explain the 'why' behind the solutions. Highly recommended for juniors.",
    author: "Deepika G.",
    role: "Placed Student",
    college: "NIT Trichy",
    rating: 5,
    avatar: "DG",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll logic for mobile to avoid UI glitches
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;

    let intervalId: NodeJS.Timeout;
    const scroll = () => {
      if (!isInteracting && scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    };

    intervalId = setInterval(scroll, 30);
    return () => clearInterval(intervalId);
  }, [isMobile, isInteracting]);
  
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Student Stories
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Trusted by{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 dark:from-blue-400 dark:via-cyan-400 dark:to-violet-400 bg-clip-text text-transparent">
              100+ students
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Practical feedback from students who cleared their dream interviews with DevVault.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div 
          ref={scrollRef}
          className={`flex overflow-x-auto scrollbar-hide ${isMobile ? "px-4 pb-8" : "overflow-hidden"}`}
          style={{
            scrollSnapType: isMobile && isInteracting ? 'x mandatory' : 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
        >
          <div 
            className={`flex ${isMobile ? "" : "animate-scroll-left"}`}
            style={{
              animationPlayState: isInteracting ? 'paused' : 'running',
              width: 'max-content'
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className={`flex-shrink-0 ${isMobile ? "w-[85vw] snap-center px-2" : "w-[400px] px-3"}`}
              >
                <Card className="h-full p-8 bg-card/50 dark:bg-card/30 backdrop-blur-sm border-border/50 hover:border-blue-500/30 hover:shadow-xl transition-all duration-300 group">
                  <Quote className="w-10 h-10 text-blue-500/20 mb-4" />
                  
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>
                  <blockquote className="text-foreground text-base leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    
                    <div>
                      <p className="font-bold text-sm tracking-tight text-foreground" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} · <span className="text-blue-600 dark:text-blue-400">{testimonial.college}</span>
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}