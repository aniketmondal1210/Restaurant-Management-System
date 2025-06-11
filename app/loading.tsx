import { ChefHat } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 hero-gradient rounded-2xl shadow-lg animate-pulse">
          <ChefHat className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-2">
          <div className="text-xl font-semibold text-gradient">QuickBites</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Loading...</div>
        </div>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
