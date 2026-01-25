"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';


interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle both input and textarea changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    const mailtoLink = `mailto:kishoraman.works@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen mt-10 bg-muted/30">
      {/* Hero Section */}
      <div className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions or need assistance? We're here to help you on your learning journey.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Send us a message</h2>
            <div className="bg-card rounded-lg border border-border p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground text-foreground"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground text-foreground"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground text-foreground"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground text-foreground resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-foreground text-background py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information Column */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Other ways to reach us</h2>
            
            {/* Email Box */}
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Email</h3>
              <p className="text-muted-foreground mb-4">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <a 
                href="mailto:kishoraman.works@gmail.com"
                className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                kishoraman.works@gmail.com
              </a>
            </div>

            {/* Social Links Box */}
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Direct Message</h3>
              <p className="text-muted-foreground mb-4">
                Connect with us on social media for quick responses and updates.
              </p>
              <div className="space-y-3">
                <a 
                  href="https://www.linkedin.com/in/aman-kishor-profile/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg hover:bg-muted transition-colors group"
                >
                  <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Professional network</p>
                  </div>
                </a>

                <a 
                  href="https://x.com/kishoraman21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg hover:bg-muted transition-colors group"
                >
                  <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">X (Twitter)</p>
                    <p className="text-sm text-muted-foreground">Quick updates</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="bg-muted/50 rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Response Time</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We typically respond within 24 hours. For urgent purchase issues, please include your payment ID.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FAQCard 
              question="How do I access my purchased materials?" 
              answer="After successful payment, you'll receive an instant download link and an email with access."
            />
            <FAQCard 
              question="What if I don't receive my link?" 
              answer="Check your spam folder. If not received within 24 hours, contact us with your payment ID."
            />
            <FAQCard 
              question="Can I get a refund?" 
              answer="Digital products are generally non-refundable except for duplicate payments or failed deliveries."
            />
            <FAQCard 
              question="How can I request new topics?" 
              answer="We love hearing from you! Send us your topic requests via email or social media."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for clean FAQ items
function FAQCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-2">{question}</h3>
      <p className="text-muted-foreground text-sm">{answer}</p>
    </div>
  );
}