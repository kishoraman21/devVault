"use client";

import React, { JSX } from "react";

export default function AboutPage(): JSX.Element {
  return (
    <div className="min-h-screen mt-10 bg-muted/30">
      {/* Hero Section */}
      <div className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">About Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Empowering the next generation of computer science professionals with quality educational resources
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Introduction */}
        <div className="bg-card rounded-lg border border-border p-8 md:p-12 mb-12 shadow-sm">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Welcome to <span className="font-semibold text-foreground">DevVault</span>, your dedicated platform for high-quality Computer Science Engineering (CSE) resources.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DevVault is founded and operated by <span className="font-semibold text-foreground">Aman Kishor</span>, an independent developer based in <span className="font-semibold text-foreground">Patna, Bihar, India</span>.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
          
          <div className="bg-card rounded-lg border border-border p-8 md:p-10 shadow-sm">
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              Our mission is to empower students and working professionals by providing concise, well-researched, and easy-to-understand PDF guides on core CSE topics such as Database Management Systems (DBMS), Operating Systems (OS), Data Structures & Algorithms (DSA), and Object-Oriented Programming (Java).
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Whether you are preparing for university exams or technical interviews, our resources are designed to help you master the fundamentals and advance your career in technology.
            </p>
          </div>
        </div>

        {/* What We Offer Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">What We Offer</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Comprehensive Study Materials",
                desc: "Carefully curated PDF guides covering fundamental and advanced topics in computer science."
              },
              {
                title: "Interview Preparation",
                desc: "Focused content to help you prepare for technical interviews at top companies with practical examples."
              },
              {
                title: "Exam-Ready Resources",
                desc: "Structured materials perfect for university exam preparation, covering syllabus requirements."
              },
              {
                title: "Continuous Updates",
                desc: "Our content is regularly reviewed and updated to reflect latest industry standards."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-card rounded-lg border border-border p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Commitment</h2>
          
          <div className="bg-card rounded-lg border border-border p-8 md:p-10 shadow-sm">
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              We believe in making quality education accessible and affordable. Our digital resources are priced fairly to ensure students from all backgrounds can benefit from them.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              All transactions are processed securely via <span className="font-semibold text-foreground">Razorpay</span>, ensuring a safe and seamless experience for every student.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Why Choose DevVault?</h2>
          
          <div className="bg-card rounded-lg border border-border p-8 md:p-10 shadow-sm">
            <ul className="space-y-4">
              {[
                "Created by an experienced developer with real-world industry knowledge",
                "Focused on practical understanding, not just theory",
                "Instant digital delivery with no waiting time",
                "Affordable pricing for students and professionals",
                "Responsive customer support for any questions or issues"
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-muted-foreground text-lg">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg border border-indigo-200 dark:border-indigo-800 p-8 md:p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
            Have questions about our resources or need assistance? We&apos;re here to help you on your learning journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:kishoraman2121@gmail.com"
              className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </a>
            <a 
              href="/browsepdfs"
              className="inline-flex items-center gap-2 bg-card text-foreground px-6 py-3 rounded-lg font-medium border border-border hover:bg-muted transition-colors"
            >
              Browse Resources
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}