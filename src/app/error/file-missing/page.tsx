"use client"
import { FileX, Mail, Home, RefreshCw } from 'lucide-react'

export default function FileMissingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Error Card */}
        <div className="bg-card rounded-lg border border-border shadow-lg overflow-hidden">
          {/* Header with Icon */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border-b border-amber-200 dark:border-amber-800 p-6 flex items-center justify-center">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
              <FileX className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              File Not Found
            </h1>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              The file you're trying to access could not be located. It may have been removed, the link has expired, or the file is temporarily unavailable.
            </p>

            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">What you can do:</h3>
              <ul className="text-sm text-muted-foreground text-left space-y-1">
                <li>• Check if the download link is correct</li>
                <li>• Verify the link hasn't expired</li>
                <li>• Contact support with your order details</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-card text-foreground border border-border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
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

        {/* Help Section */}
        <div className="mt-6 bg-card rounded-lg border border-border p-4">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Need Help?
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                If you recently purchased this product, contact our support team and we'll resend your download link.
              </p>
              <a
                href="mailto:kishoraman.works@gmail.com"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                kishoraman2121@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Visit our{" "}
            <a href="/contactus" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              Help Center
            </a>
            {" "}or browse{" "}
            <a href="/browsepdfs" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              Available Resources
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}