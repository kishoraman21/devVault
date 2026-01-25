"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Mail, MapPin, ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/ui/button";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSectionGroup {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSectionGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/aboutus" },
      { label: "Contact", href: "/contactus" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Refund Policy", href: "/refund" },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="relative bg-gradient-to-b from-background to-secondary/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
            <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-8 group">
              <Image
                src="/logo_final.svg"
                alt="DevVault Logo"
                width={40}
                height={40}
                className="rounded-xl object-cover shadow-lg transition-all duration-500 group-hover:scale-110"
              />
              <span className="font-bold text-foreground text-2xl tracking-tighter" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                DevVault
              </span>
            </Link>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed italic" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              "Empowering the next generation of engineers with curated resources to bridge the gap between academics and industry."
            </p>
            
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-sm text-muted-foreground group">
                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center  duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:kishoraman.works@gmail.com" className="font-medium">
                  kishoraman.works@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground group">
                <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center  duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="font-medium">India </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {footerSections.map((section: FooterSectionGroup) => (
                <div key={section.title} className="flex flex-col gap-6">
                  <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/50" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {section.title}
                  </h4>
                  <ul className="space-y-4">
                    {section.links.map((link: FooterLink) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-primary transition-all duration-300 text-base flex items-center gap-1 group/link"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/30 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-[2.5rem] bg-secondary/30 border border-border/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    Ready to start your journey?
                  </h3>
                  <p className="text-muted-foreground text-sm">Join 100+ students already learning with DevVault.</p>
                </div>
                <Link href="/browsepdfs">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-8 rounded-2xl h-12 shadow-lg shadow-primary/20 transition-all active:scale-95">
                    Browse Resources <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2026 DevVault Inc. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://x.com/kishoraman21" 
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-blue-500 text-muted-foreground hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com/kishoraman21"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-slate-800 dark:hover:bg-slate-600 text-muted-foreground hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/aman-kishor-profile/"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-blue-600 text-muted-foreground hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}