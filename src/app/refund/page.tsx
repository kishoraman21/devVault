"use client";

import React, { useState, JSX } from "react";

interface PolicySection {
  id: string;
  label: string;
}

export default function RefundPolicy(): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const sections: PolicySection[] = [
    { id: "overview", label: "Overview" },
    { id: "cancellation", label: "Cancellation Policy" },
    { id: "refund", label: "Refund Policy" },
    { id: "exceptions", label: "Refund Exceptions" },
    { id: "process", label: "Refund Process" },
    { id: "contact", label: "Contact Us" },
  ];

  const scrollToSection = (id: string): void => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // The offset is now handled by the 'scroll-mt-24' class on the sections below
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-muted/30">
      {/* Hero Section */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Understanding our policies for digital products
          </p>
          <p className="text-sm text-muted-foreground">
            Last Updated: January 11, 2025
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            {/* Added lg:top-24 to match the content scroll margin */}
            <div className="lg:sticky lg:top-24 bg-card rounded-lg border border-border p-4">
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

          {/* Content */}
          <main className="flex-1 bg-card rounded-lg border border-border p-8 lg:p-12">
            <article className="prose prose-gray max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground">
              
              {/* Introduction - Added scroll-mt-24 */}
              <section id="overview" className="mb-16 scroll-mt-24">
                <div className="mb-8 p-6 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                  <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
                    Important Notice
                  </h3>
                  <p className="text-red-800 dark:text-red-300 leading-relaxed">
                    At <strong>CSELibrary</strong>, we provide digital
                    educational materials in PDF format. Because our products
                    are digital goods delivered via instant download, we
                    generally operate a <strong>no-refund policy</strong>.
                  </p>
                </div>
                <p className="leading-relaxed">
                  This policy is designed to protect the integrity of our
                  digital content while ensuring fair treatment of all
                  customers.
                </p>
              </section>

              {/* Cancellation Policy - Added scroll-mt-24 */}
              <section id="cancellation" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Cancellation Policy</h2>
                <p className="leading-relaxed mb-4">
                  Orders once placed{" "}
                  <strong className="text-foreground">
                    cannot be cancelled
                  </strong>{" "}
                  as the delivery of digital products is initiated immediately.
                </p>
              </section>

              {/* Refund Policy - Added scroll-mt-24 */}
              <section id="refund" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">
                  Refund Policy for Digital Products
                </h2>
                <p className="leading-relaxed mb-6">
                  Since your purchase is a digital product, it is deemed
                  &quot;used&quot; after download or opening.
                </p>
              </section>

              {/* Exceptions - Added scroll-mt-24 */}
              <section id="exceptions" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">
                  Exceptions (Where Refund is Possible)
                </h2>
                <div className="space-y-6">
                  <div className="p-5 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
                      Duplicate Payment
                    </h3>
                    <p className="text-green-800 dark:text-green-200 m-0">
                      Refunds are processed if technical glitches cause double charges.
                    </p>
                  </div>
                </div>
              </section>

              {/* Refund Process - Added scroll-mt-24 */}
              <section id="process" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Refund Process</h2>
                <div className="p-4 bg-muted/50 border-l-4 border-foreground">
                  <h3 className="font-semibold mb-2">Processing Time</h3>
                  <p className="m-0">
                    It may take <strong>5-7 business days</strong> to reflect in your account.
                  </p>
                </div>
              </section>

              {/* Contact - Added scroll-mt-24 */}
              <section id="contact" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <div className="bg-muted/50 border border-border rounded-lg p-6">
                  <span className="text-muted-foreground font-medium">Email: </span>
                  <a href="mailto:kishoraman.works@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    kishoraman.works@gmail.com
                  </a>
                </div>
              </section>

              <div className="mt-12 p-6 bg-muted border border-border rounded-lg">
                <p className="text-sm m-0">
                  <strong className="text-foreground">Disclaimer:</strong> We reserve the right to investigate all refund requests.
                </p>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}