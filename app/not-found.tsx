import Link from "next/link"
import { ChefHat, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 hero-gradient rounded-2xl mb-6 shadow-lg">
          <ChefHat className="w-10 h-10 text-white" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gradient">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Page Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="hero-gradient hover:opacity-90 text-white">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
