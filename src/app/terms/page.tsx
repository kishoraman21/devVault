"use client";

import React, { useState, JSX } from "react";

interface PolicySection {
  id: string;
  label: string;
}

export default function TermsAndConditions(): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const sections: PolicySection[] = [
    { id: "overview", label: "General Overview" },
    { id: "digital-products", label: "Digital Products & License" },
    { id: "accuracy", label: "Accuracy of Information" },
    { id: "payments", label: "Payments and Pricing" },
    { id: "refund", label: "No Refund Policy" },
    { id: "liability", label: "Limitation of Liability" },
    { id: "governing-law", label: "Governing Law" },
    { id: "contact", label: "Contact Information" },
  ];

  const scrollToSection = (id: string): void => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // Offset is handled by the 'scroll-mt-24' utility in the JSX
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="bg-background mt-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Please read these terms carefully before using our services
          </p>
          <p className="text-sm text-muted-foreground">
            Effective Date: January 11, 2025
          </p>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            {/* Added lg:top-24 to align sidebar sticky position with navbar offset */}
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

          {/* Content */}
          <main className="flex-1 bg-card rounded-lg border border-border p-8 lg:p-12 shadow-sm">
            <article className="prose prose-gray max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground">
              {/* Introduction */}
              <div className="mb-12 p-6 bg-muted/50 rounded-lg border border-border">
                <p className="leading-relaxed m-0">
                  Welcome to{" "}
                  <strong className="text-foreground">CSELibrary</strong>. By
                  accessing our website and purchasing our digital products, you
                  agree to comply with and be bound by the following terms and
                  conditions.
                </p>
              </div>

              {/* General Overview - Added scroll-mt-24 */}
              <section id="overview" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">General Overview</h2>
                <p className="leading-relaxed mb-4">
                  The terms &quot;we,&quot; &quot;us,&quot; and &quot;our&quot;
                  refer to CSELibrary. By using this website, you engage in our
                  &quot;Service&quot; and agree to be bound by the terms stated
                  herein.
                </p>
                <p className="leading-relaxed">
                  These terms apply to all users of the site, including
                  browsers, customers, and contributors of content.
                </p>
              </section>

              {/* Digital Products & License - Added scroll-mt-24 */}
              <section id="digital-products" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">
                  Digital Products & License
                </h2>
                <p className="leading-relaxed mb-6">
                  All PDFs and study materials purchased from this website are
                  the intellectual property of CSELibrary.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Personal Use Only
                    </h3>
                    <p className="leading-relaxed">
                      You are granted a non-exclusive, non-transferable license
                      for personal, educational use only.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Restrictions</h3>
                    <p className="leading-relaxed">
                      You may not copy, redistribute, resell, or share these
                      files on public forums, social media, or WhatsApp groups
                      without explicit permission.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-sm text-amber-900 dark:text-amber-200 m-0">
                    <strong>Warning:</strong> Violation of these license terms
                    may result in legal action and a permanent ban.
                  </p>
                </div>
              </section>

              {/* Accuracy of Information - Added scroll-mt-24 */}
              <section id="accuracy" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">
                  Accuracy of Information
                </h2>
                <p className="leading-relaxed mb-4">
                  While we strive to provide accurate information, the content
                  is provided for general educational purposes. We do not
                  warrant that information is error-free.
                </p>
              </section>

              {/* Payments and Pricing - Added scroll-mt-24 */}
              <section id="payments" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">
                  Payments and Pricing
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Pricing Updates
                    </h3>
                    <p className="leading-relaxed">
                      We reserve the right to change prices at any time without
                      prior notice.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">
                      Payment Processing
                    </h3>
                    <p className="leading-relaxed">
                      All payments are processed securely through{" "}
                      <strong>Razorpay</strong>. You are responsible for
                      providing accurate billing information.
                    </p>
                  </div>
                </div>
              </section>

              {/* No Refund Policy - Added scroll-mt-24 */}
              <section id="refund" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">No Refund Policy</h2>
                <p className="leading-relaxed">
                  As stated in our Refund Policy, all sales of digital products
                  are final once the download link is provided.
                </p>
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-900 dark:text-red-200 m-0">
                    <strong>Important:</strong> Please review product
                    descriptions and previews carefully before purchase.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability - Added scroll-mt-24 */}
              <section id="liability" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">
                  Limitation of Liability
                </h2>
                <p className="leading-relaxed">
                  In no event shall CSELibrary or its owner be liable for any
                  direct, indirect, or incidental damages arising out of your
                  use of our services.
                </p>
                <ul className="mt-4 space-y-2 list-disc pl-5">
                  <li>Loss of profits or data.</li>
                  <li>Unauthorized access to servers.</li>
                  <li>Service interruptions or errors in content.</li>
                </ul>
              </section>

              {/* Governing Law - Added scroll-mt-24 */}
              <section id="governing-law" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Governing Law</h2>
                <p className="leading-relaxed">
                  These terms shall be governed by and construed in accordance
                  with the laws of India. Any disputes shall be subject to the
                  exclusive jurisdiction of the courts in India.
                </p>
              </section>

              {/* Contact Information - Added scroll-mt-24 */}
              <section id="contact" className="scroll-mt-24">
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <div className="bg-muted/50 border border-border rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground font-medium">
                        Email:
                      </span>
                      <a
                        href="mailto:kishoraman.works@gmail.com"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        kishoraman.works@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground font-medium">
                        Location:
                      </span>
                      <span className="text-foreground">India</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Changes Notice */}
              <div className="mt-12 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <p className="text-sm text-blue-900 dark:text-blue-200 m-0">
                  <strong>Changes to Terms:</strong> We reserve the right to
                  modify these terms. Continued use of the service constitutes
                  acceptance of such changes.
                </p>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
