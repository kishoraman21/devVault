"use client";

import { Clock, Mail, Home, ShoppingBag } from "lucide-react";

export default function LinkExpiredPage() {
  return (
    <div className="min-h-screen mt-10 flex flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Error Card */}
        <div className="bg-card rounded-lg border border-border shadow-lg overflow-hidden">

          {/* Content */}
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Link Expired
            </h1>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              This download link has expired. For security reasons, download
              links are only valid for a limited time after purchase.
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                How to get a new link:
              </h3>
              <ul className="text-sm text-muted-foreground text-left space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">
                    1.
                  </span>
                  <span>Contact our support team with your order details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">
                    2.
                  </span>
                  <span>
                    We'll verify your purchase and send a fresh download link
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">
                    3.
                  </span>
                  <span>
                    Download your files within the new validity period
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:kishoraman.works@gmail.com"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-card text-foreground border border-border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact Support
              </a>
              <a
                href="/"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <Home className="w-4 h-4" />
                Go Home
              </a>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-card rounded-lg border border-border p-4">
          <div className="flex items-start gap-3">
            <ShoppingBag className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Valid Purchases Get New Links
              </h3>
              <p className="text-sm text-muted-foreground">
                If you've purchased this product, you're entitled to receive a
                fresh download link. Simply contact us with your transaction
                details and we'll help you immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-4 bg-muted/50 border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Email us at:</p>
            <a
              href="mailto:kishoraman2121@gmail.com"
              className="text-base font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              kishoraman.works@gmail.com
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              Include your order ID and email address for faster processing
            </p>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Check our{" "}
            <a
              href="/refund"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Refund Policy
            </a>{" "}
            or browse{" "}
            <a
              href="/browsepdfs"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Other Resources
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
