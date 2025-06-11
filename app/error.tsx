"use client"

import { useEffect } from "react"
import { ChefHat, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-2xl mb-6 shadow-lg">
          <ChefHat className="w-10 h-10 text-white" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Something went wrong!</h1>
          <p className="text-gray-600 dark:text-gray-300">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
          {error.message && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
              {error.message}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="hero-gradient hover:opacity-90 text-white">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}
