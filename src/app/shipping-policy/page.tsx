"use client";

import React, { useState, JSX } from "react";


interface PolicySection {
  id: string;
  label: string;
}

export default function ShippingPolicy(): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const sections: PolicySection[] = [
    { id: "overview", label: "Overview" },
    { id: "delivery-method", label: "Delivery Method" },
    { id: "timeline", label: "Delivery Timeline" },
    { id: "charges", label: "Shipping Charges" },
    { id: "restrictions", label: "Shipping Restrictions" },
    { id: "failed-delivery", label: "Failed Deliveries" },
  ];

  const scrollToSection = (id: string): void => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // Offset is handled by the 'scroll-mt' class in the JSX below
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-muted/30">
      {/* Hero Section */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">Shipping & Delivery Policy</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Digital delivery for instant access to your materials
          </p>
          <p className="text-sm text-muted-foreground">Last Updated: January 11, 2025</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24 bg-card rounded-lg border border-border p-4 shadow-sm">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-foreground text-background font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Body */}
          <main className="flex-1 bg-card rounded-lg border border-border p-8 lg:p-12">
            <article className="prose prose-gray max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground">
              
              {/* KEY FIX: Added 'scroll-mt-24' to all sections. 
                  This ensures the heading stops 96px (24 * 4px) below the top, 
                  leaving room for your fixed Navbar.
              */}

              <section id="overview" className="mb-16 scroll-mt-24">
                <div className="mb-8 p-6 bg-muted/50 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold mb-2">Digital Delivery</h3>
                  <p className="leading-relaxed">
                    At <strong className="text-foreground">CSELibrary</strong>, our products are delivered digitally...
                  </p>
                </div>
              </section>

              <section id="delivery-method" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Delivery Method</h2>
                <p className="leading-relaxed mb-6">
                  Since our products consist of educational PDFs, <strong className="text-foreground">no physical shipping is required</strong>.
                </p>
              </section>

              <section id="timeline" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Delivery Timeline</h2>
                <div className="space-y-6">
                  <div className="p-5 bg-muted/50 border-l-4 border-green-500">
                    <h3 className="text-xl font-semibold mb-2">Standard Delivery</h3>
                    <p className="m-0">Delivery is <strong className="text-foreground">near-instant</strong>.</p>
                  </div>
                </div>
              </section>

              <section id="charges" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Shipping Charges</h2>
                <p className="m-0">There are <strong>no shipping or handling charges</strong>.</p>
              </section>

              <section id="restrictions" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Shipping Restrictions</h2>
                <p>We provide access to our resources <strong className="text-foreground">globally</strong>.</p>
              </section>

              <section id="failed-delivery" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Handling of Failed Deliveries</h2>
                <p>If a payment is successful but the download fails, contact support immediately.</p>
              </section>

            </article>
          </main>
        </div>
      </div>
    </div>
  );
}