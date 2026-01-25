"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

const technologies: TechItem[] = [
  {
    name: "React.js",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
        <path fillRule="evenodd" d="M12 8.5c3.1 0 5.87.58 7.85 1.49.99.45 1.82 1 2.4 1.62.6.63 1 1.38 1 2.39s-.4 1.76-1 2.39c-.58.62-1.41 1.17-2.4 1.62-1.98.91-4.76 1.49-7.85 1.49s-5.87-.58-7.85-1.49c-.99-.45-1.82-1-2.4-1.62-.6-.63-1-1.38-1-2.39s.4-1.76 1-2.39c.58-.62 1.41-1.17 2.4-1.62C6.13 9.08 8.9 8.5 12 8.5Zm0 1.5c-2.91 0-5.41.54-7.12 1.33-.86.39-1.5.84-1.91 1.27-.4.42-.47.73-.47.9s.07.48.47.9c.41.43 1.05.88 1.91 1.27C6.59 16.46 9.09 17 12 17c2.91 0 5.41-.54 7.12-1.33.86-.39 1.5-.84 1.91-1.27.4-.42.47-.73.47-.9s-.07-.48-.47-.9c-.41-.43-1.05-.88-1.91-1.27C17.41 10.54 14.91 10 12 10Z" clipRule="evenodd"/>
        <path fillRule="evenodd" d="M8.25 12c1.55-2.69 3.64-4.94 5.73-6.31.99-.68 1.98-1.17 2.9-1.4.93-.24 1.87-.22 2.68.32.8.53 1.2 1.38 1.35 2.33.15.93.05 2.03-.25 3.2-.6 2.32-2.07 5.02-4.16 7.36-2.1 2.34-4.55 4.1-6.75 4.92-1.1.41-2.17.58-3.13.44-.97-.14-1.9-.59-2.45-1.46-.56-.87-.6-1.9-.38-2.9.21-.98.67-2 1.3-3.02a24.6 24.6 0 0 1 3.16-4.48Zm1.13.65a23.1 23.1 0 0 0-2.96 4.2c-.56.9-.9 1.7-1.04 2.35-.14.63-.07.99.1 1.24.16.26.48.47 1.08.56.6.09 1.35-.03 2.2-.35 1.72-.64 3.88-2.14 5.76-4.24 1.89-2.1 3.18-4.49 3.68-6.4.25-.96.3-1.77.2-2.38-.1-.6-.34-.9-.6-1.08-.26-.17-.63-.23-1.23-.07-.61.16-1.37.53-2.2 1.1-1.66 1.14-3.48 3.04-4.99 5.07Z" clipRule="evenodd"/>
        <path fillRule="evenodd" d="M15.75 12c-1.55-2.69-3.64-4.94-5.73-6.31-.99-.68-1.98-1.17-2.9-1.4-.93-.24-1.87-.22-2.68.32-.8.53-1.2 1.38-1.35 2.33-.15.93-.05 2.03.25 3.2.6 2.32 2.07 5.02 4.16 7.36 2.1 2.34 4.55 4.1 6.75 4.92 1.1.41 2.17.58 3.13.44.97-.14 1.9-.59 2.45-1.46.56-.87.6-1.9.38-2.9-.21-.98-.67-2-1.3-3.02a24.6 24.6 0 0 0-3.16-4.48Zm-1.13.65a23.1 23.1 0 0 1 2.96 4.2c.56.9.9 1.7 1.04 2.35.14.63.07.99-.1 1.24-.16.26-.48.47-1.08.56-.6.09-1.35-.03-2.2-.35-1.72-.64-3.88-2.14-5.76-4.24-1.89-2.1-3.18-4.49-3.68-6.4-.25-.96-.3-1.77-.2-2.38.1-.6.34-.9.6-1.08.26-.17.63-.23 1.23-.07.61.16 1.37.53 2.2 1.1 1.66 1.14 3.48 3.04 4.99 5.07Z" clipRule="evenodd"/>
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247L8.14 22.016c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.066-.037.152-.024.22.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.193-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.085.049-.139.143-.139.242v10.15c0 .097.054.189.137.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.328.924.944.924 1.603v10.15c0 .659-.354 1.273-.924 1.604l-8.794 5.078c-.28.163-.6.247-.925.247z"/>
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z"/>
      </svg>
    ),
  },
  {
    name: "SQL",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm6 12c0 .5-2.13 2-6 2s-6-1.5-6-2v-2.23c1.61.78 3.72 1.23 6 1.23s4.39-.45 6-1.23V17z"/>
      </svg>
    ),
  },
  {
    name: "Java",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573"/>
      </svg>
    ),
  },
  {
    name: "Express",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 0 1 0 11.577z"/>
      </svg>
    ),
  },
  {
    name: "OOPs",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
      </svg>
    ),
  },
];

// Duplicate for seamless scroll
const duplicatedTech = [...technologies, ...technologies];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-12 overflow-hidden bg-background border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-medium tracking-[0.25em] uppercase text-muted-foreground mb-8"
        >
          Technologies We Cover
        </motion.p>
      </div>

      <div className="relative mt-8">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />

        <div className="overflow-hidden">
          <motion.div 
            className="flex w-max py-4"
            animate={{
              x: ["0%", "-25%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...Array(4)].map((_, setIndex) => (
              <div key={`set-${setIndex}`} className="flex">
                {technologies.map((tech, index) => (
                  <div
                    key={`${setIndex}-${tech.name}-${index}`}
                    className="flex-shrink-0 px-10 flex flex-col items-center gap-3 group"
                  >
                    <div className="p-5 rounded-2xl bg-secondary/30 border border-border/50 text-muted-foreground group-hover:text-primary group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:shadow-lg group-hover:shadow-primary/5 transition-all duration-500">
                      {tech.icon}
                    </div>
                    <span className="text-xs font-bold tracking-tight text-muted-foreground group-hover:text-foreground transition-colors" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
