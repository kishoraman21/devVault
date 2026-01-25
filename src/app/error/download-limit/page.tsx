"use client"

import { AlertCircle, Mail, Home } from 'lucide-react'

export default function DownloadLimitPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Error Card */}
        <div className="bg-card rounded-lg border border-border shadow-lg overflow-hidden">
          {/* Header with Icon */}
          <div className="bg-red-50 dark:bg-red-950/20 border-b border-red-200 dark:border-red-800 p-6 flex items-center justify-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Download Limit Reached
            </h1>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              You have reached the maximum number of downloads allowed for this link. Each purchase link has a limited number of download attempts for security purposes.
            </p>

            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground">
                If you believe this is a mistake or need access to your files, please contact our support team with your order details.
              </p>
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

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Visit our{" "}
            <a href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              Help Center
            </a>
            {" "}or check our{" "}
            <a href="/refund" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              Refund Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}