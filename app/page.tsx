"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { AuthTabs } from "@/components/auth/auth-tabs"
import { UserManager } from "@/lib/user-management"
import { ChefHat, Clock, Users, Star, Shield, ShoppingCart } from "lucide-react"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Initialize demo users if none exist (for development purposes only)
    UserManager.initializeDemoUsers()

    // Redirect authenticated users to their dashboard
    if (user) {
      if (user.role === "customer") {
        router.push("/customer-dashboard")
      } else if (user.role === "staff") {
        router.push("/user-dashboard")
      } else {
        router.push("/dashboard")
      }
    }
  }, [user, router])

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-2xl mb-6 shadow-lg">
            <ChefHat className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to <span className="text-green-600">QuickBites</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Streamline your restaurant operations with our intelligent queue management system. Reduce wait times,
            improve customer satisfaction, and boost efficiency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Queue Management</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Intelligent priority queuing with real-time wait time estimates
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer Experience</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enhanced customer journey with order tracking and notifications
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <Star className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive analytics to optimize your restaurant operations
            </p>
          </div>
        </div>

        {/* Role Information */}
        <div className="mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Choose Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <ShoppingCart className="h-8 w-8 text-green-600" />
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Customer</h3>
              </div>
              <ul className="text-sm text-green-600 dark:text-green-400 space-y-2">
                <li>• Browse restaurant menu</li>
                <li>• Place and track orders</li>
                <li>• Manage favorites</li>
                <li>• View order history</li>
                <li>• Rate and review orders</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-8 w-8 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Staff</h3>
              </div>
              <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-2">
                <li>• Process customer orders</li>
                <li>• Manage order queue</li>
                <li>• Update order status</li>
                <li>• Handle customer service</li>
                <li>• View daily operations</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-red-50 dark:from-purple-900/20 dark:to-red-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">Administrator</h3>
              </div>
              <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-2">
                <li>• Full system management</li>
                <li>• Analytics and reporting</li>
                <li>• Menu and user management</li>
                <li>• Restaurant settings</li>
                <li>• Financial oversight</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Auth Section */}
        <div className="max-w-md mx-auto">
          <AuthTabs />
        </div>

        {/* Getting Started */}
        <div className="mt-12 max-w-2xl mx-auto text-center">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">🚀 Getting Started</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Create your account above to access the QuickBites platform. Your role determines your permissions and
              available features.
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              New to QuickBites? Sign up to create your account and start managing your restaurant operations
              efficiently.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
