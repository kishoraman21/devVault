"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, ChevronDown, ArrowRight, Home, HelpCircle, Info, Mail, X, Bot, BookOpen } from "lucide-react";
import Image from "next/image";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { ModeToggle } from "@/components/ModeToggle";


interface SubLink {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  subLinks?: SubLink[];
}

const navLinks: (NavLink & { icon: any })[] = [
  { label: " Notebooks", href: "/notebooks", icon: BookOpen },
  { label: "FAQs", href: "/#faqs", icon: HelpCircle },
  { label: "About", href: "/aboutus", icon: Info },
  { label: "Contact", href: "/contactus", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBrowse = (): void => {
    router.push("/browsepdfs");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/0 dark:bg-slate-950/0"
      }`}
      style={{ fontFamily: 'var(--font-space-grotesk)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo_final.svg"
              alt="DevVault Logo"
              width={38}
              height={38}
              className="rounded-xl object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">
                DevVault
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, idx) =>
              link.subLinks ? (
                <DropdownMenu key={`${link.label}-${idx}`}>
                  <DropdownMenuTrigger asChild>
                    <motion.button 
                      whileHover="hover"
                      className="relative flex items-center gap-1 px-4 py-2 text-muted-foreground hover:text-foreground rounded-md font-medium transition-colors group outline-none"
                    >
                      <span className="relative z-10 flex items-center gap-1">
                        {link.label}
                        <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                      </span>
                      <motion.span 
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary origin-left"
                        variants={{
                          initial: { scaleX: 0 },
                          hover: { scaleX: 1 }
                        }}
                        initial="initial"
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                      <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/50 rounded-md transition-colors -z-10" />
                    </motion.button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {link.subLinks.map((subLink, subIdx) => (
                      <DropdownMenuItem key={`${subLink.label}-${subIdx}`} asChild>
                        <Link href={subLink.href} className="cursor-pointer w-full">
                          {subLink.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <motion.div key={`${link.label}-${idx}`} whileHover="hover" className="relative">
                  <Link
                    href={link.href}
                    className="relative px-4 py-2 text-muted-foreground hover:text-foreground font-medium transition-colors rounded-md group flex items-center"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <motion.span 
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary origin-left"
                      variants={{
                        initial: { scaleX: 0 },
                        hover: { scaleX: 1 }
                      }}
                      initial="initial"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                    <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/50 rounded-md transition-colors -z-10" />
                  </Link>
                </motion.div>
              )
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleBrowse}
                className="relative bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold overflow-hidden group shadow-lg shadow-blue-500/20"
              >
                <motion.div 
                  className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"
                />
                <span className="relative flex items-center">
                  PDF Vault
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 overflow-hidden">
                  <div className="flex flex-col items-center justify-center gap-1.5 transition-all">
                    <motion.span
                      animate={mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                      className="w-6 h-0.5 bg-foreground rounded-full block origin-center"
                    />
                    <motion.span
                      animate={mobileOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                      className="w-6 h-0.5 bg-foreground rounded-full block"
                    />
                    <motion.span
                      animate={mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                      className="w-6 h-0.5 bg-foreground rounded-full block origin-center"
                    />
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] sm:max-w-sm p-0 bg-background/95 backdrop-blur-2xl border-l border-border/50 flex flex-col overflow-hidden" style={{ fontFamily: 'var(--font-space-grotesk)' }} showClose={false}>
                {/* Decorative Background Element */}
                <div className="absolute -top-[10%] -right-[10%] w-[70%] h-[30%] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-[5%] -left-[10%] w-[50%] h-[20%] bg-violet-500/10 blur-[60px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header Section */}
                  <div className="p-8 pb-10 relative">
                    <SheetHeader className="text-left">
                      <div className="flex items-center justify-between w-full">
                        <SheetTitle asChild>
                          <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                            <div className="p-2.5 bg-secondary/50 backdrop-blur-md rounded-2xl border border-border/50 shadow-sm">
                              <Image
                                src="/logo_final.svg"
                                alt="DevVault Logo"
                                width={36}
                                height={36}
                                className="rounded-2xl object-contain"
                                />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-foreground font-space">
                              DevVault
                            </span>
                          </Link>
                        </SheetTitle>
                        
                        <SheetClose asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-6 right-6 rounded-2xl bg-secondary/50 border border-border/50 hover:bg-secondary transition-all"
                            onClick={() => setMobileOpen(false)}
                          >
                            <X className="w-5 h-5 text-muted-foreground" />
                          </Button>
                        </SheetClose>
                      </div>
                    </SheetHeader>
                  </div>

                  {/* Feature Card Section (Now at the top) */}
                  <div className="p-6 pt-0">
                    <div className="relative p-8 rounded-[2.5rem] bg-secondary border border-border group overflow-hidden shadow-sm">
                      <div className="relative z-10">
                        <h4 className="text-xl font-black tracking-tight text-foreground mb-2">Knowledge Library</h4>
                        <p className="text-[13px] text-muted-foreground mb-8 leading-relaxed font-medium">
                          Master development with our expertly curated study materials.
                        </p>
                        <Button
                          onClick={() => {
                            handleBrowse();
                            setMobileOpen(false);
                          }}
                          className="w-full h-14 bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 text-white hover:opacity-90 rounded-[1.25rem] text-sm font-black transition-all shadow-xl shadow-blue-500/25 border-t border-white/20 active:scale-[0.98]"
                        >
                          Access Vault
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Grid Section (Now at the bottom) */}
                  <div className="flex-1 px-6 overflow-y-auto">
                    <div className="grid grid-cols-1 gap-3 pb-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 ml-2 mb-1">Navigation</p>
                      {navLinks.map((link, idx) => (
                        <motion.div
                          key={`${link.label}-${idx}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between p-6 rounded-3xl bg-secondary/50 border border-border/50 hover:bg-secondary hover:border-primary/30 transition-all group active:scale-[0.97]"
                          >
                            <span className="text-base font-bold text-foreground group-hover:translate-x-1 transition-transform">
                              {link.label}
                            </span>
                            <div className="text-muted-foreground group-hover:text-primary transition-all">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}