"use client";

import React, { useState, JSX } from "react";

interface PolicySection {
  id: string;
  label: string;
}

export default function PrivacyPolicy(): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  const sections: PolicySection[] = [
    { id: "introduction", label: "Introduction" },
    { id: "information-collect", label: "Information We Collect" },
    { id: "how-use", label: "How We Use Your Information" },
    { id: "payment-processing", label: "Payment Processing" },
    { id: "data-retention", label: "Data Retention" },
    { id: "third-party", label: "Third-Party Sharing" },
    { id: "cookies", label: "Cookies & Tracking" },
    { id: "your-rights", label: "Your Rights" },
    { id: "contact", label: "Contact Us" },
  ];

  const scrollToSection = (id: string): void => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // Offset is now handled by the 'scroll-mt-24' class in the JSX
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="bg-background border-b border-border mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            How CSELibrary handles your data
          </p>
          <p className="text-sm text-muted-foreground">
            Updated January 11, 2025
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            {/* lg:top-24 ensures the sidebar starts below the fixed navbar */}
            <div className="lg:sticky lg:top-24 bg-card rounded-lg border border-border p-4 shadow-sm">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-md text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 bg-card rounded-lg border border-border p-8 lg:p-12">
            <article className="prose max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-ul:marker:text-muted-foreground prose-strong:text-foreground">
              
              {/* Added scroll-mt-24 to every section to account for fixed header */}

              <section id="introduction" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground">Introduction</h2>
                <p>
                  Welcome to <strong className="text-foreground">CSELibrary</strong>.
                  We respect your privacy and are committed to protecting the
                  personal data we collect from you.
                </p>
              </section>

              <section id="information-collect" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground">Information We Collect</h2>
                <p>We only collect what is necessary:</p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
                    <p>Name and email address for delivering purchased files.</p>
                  </div>
                </div>
              </section>

              <section id="how-use" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground">How We Use Your Information</h2>
                <ul>
                  <li>Process and deliver digital orders</li>
                  <li>Send receipts</li>
                </ul>
              </section>

              <section id="payment-processing" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground">Payment Processing (Razorpay)</h2>
                <p>We do not store your payment credentials on our servers.</p>
              </section>

              <section id="data-retention" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground">Data Retention</h2>
                <p>We store data as long as needed to provide file access.</p>
              </section>

              <section id="third-party" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground">Third-Party Sharing</h2>
                <p>We do not sell or rent your data.</p>
              </section>

              <section id="cookies" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground">Cookies & Tracking</h2>
                <p>Basic cookies are used for session management.</p>
              </section>

              <section id="your-rights" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground">Your Rights</h2>
                <ul>
                  <li>Request access</li>
                  <li>Request deletion</li>
                </ul>
              </section>

              <section id="contact" className="scroll-mt-24">
                <h2 className="text-3xl font-bold text-foreground">Contact Us</h2>
                <div className="bg-muted rounded-lg border border-border p-6">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:kishoraman.works@gmail.com" className="text-primary underline">
                      kishoraman.works@gmail.com
                    </a>
                  </p>
                </div>
              </section>

              <div className="mt-12 bg-muted border border-border rounded-lg p-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Policy updated periodically.
                </p>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}