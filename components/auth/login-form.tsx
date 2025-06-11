"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Lock, User, Eye, EyeOff, AlertCircle, Users, Shield, ShoppingCart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManager } from "@/lib/user-management"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("customer")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {}

    if (!username.trim()) {
      newErrors.username = "Username is required"
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Validate credentials using UserManager
      const user = UserManager.validateCredentials(username, password)

      if (user) {
        // Check if user role matches selected tab
        const expectedRole = activeTab === "admin" ? "admin" : activeTab === "staff" ? "staff" : "customer"

        if (user.role !== expectedRole) {
          throw new Error(`This account is not authorized for ${expectedRole} access`)
        }

        login({ username: user.username, role: user.role })

        toast({
          title: "Login successful",
          description: `Welcome back, ${user.username}!`,
        })

        // Redirect based on role
        if (user.role === "admin") {
          router.push("/dashboard")
        } else if (user.role === "staff") {
          router.push("/user-dashboard")
        } else {
          router.push("/customer-dashboard")
        }
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid username or password. Please try again."

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      })
      setErrors({ username: "Invalid credentials", password: "Invalid credentials" })
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "customer":
        return {
          title: "Customer Login",
          description: "Access your orders, favorites, and account settings",
          icon: <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />,
          gradient: "from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20",
          border: "border-green-200/50 dark:border-green-700/50",
          textColor: "text-green-700 dark:text-green-300",
          subTextColor: "text-green-600 dark:text-green-400",
          buttonGradient: "from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700",
          focusColor: "focus:border-green-500 focus:ring-green-500",
        }
      case "staff":
        return {
          title: "Staff Login",
          description: "Access order management, customer service, and basic operations",
          icon: <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />,
          gradient: "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
          border: "border-blue-200/50 dark:border-blue-700/50",
          textColor: "text-blue-700 dark:text-blue-300",
          subTextColor: "text-blue-600 dark:text-blue-400",
          buttonGradient: "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
          focusColor: "focus:border-blue-500 focus:ring-blue-500",
        }
      case "admin":
        return {
          title: "Administrator Login",
          description: "Full system access including analytics, settings, and management features",
          icon: <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />,
          gradient: "from-purple-50 to-red-50 dark:from-purple-900/20 dark:to-red-900/20",
          border: "border-purple-200/50 dark:border-purple-700/50",
          textColor: "text-purple-700 dark:text-purple-300",
          subTextColor: "text-purple-600 dark:text-purple-400",
          buttonGradient: "from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700",
          focusColor: "focus:border-purple-500 focus:ring-purple-500",
        }
      default:
        return {
          title: "Login",
          description: "Access your account",
          icon: <User className="h-5 w-5" />,
          gradient: "from-gray-50 to-gray-50",
          border: "border-gray-200/50",
          textColor: "text-gray-700",
          subTextColor: "text-gray-600",
          buttonGradient: "from-gray-600 to-gray-600",
          focusColor: "focus:border-gray-500 focus:ring-gray-500",
        }
    }
  }

  const roleInfo = getRoleInfo(activeTab)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="customer" className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Customer
        </TabsTrigger>
        <TabsTrigger value="staff" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Staff
        </TabsTrigger>
        <TabsTrigger value="admin" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Admin
        </TabsTrigger>
      </TabsList>

      {["customer", "staff", "admin"].map((role) => (
        <TabsContent key={role} value={role}>
          <div className="space-y-4">
            <div
              className={`bg-gradient-to-r ${getRoleInfo(role).gradient} p-4 rounded-lg border ${getRoleInfo(role).border}`}
            >
              <div className="flex items-start space-x-2">
                {getRoleInfo(role).icon}
                <div>
                  <p className={`text-sm ${getRoleInfo(role).textColor} font-medium mb-1`}>{getRoleInfo(role).title}</p>
                  <p className={`text-xs ${getRoleInfo(role).subTextColor}`}>{getRoleInfo(role).description}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${role}-username`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {role === "customer" ? "Username" : `${role.charAt(0).toUpperCase() + role.slice(1)} Username`}
                </Label>
                <div className="relative">
                  {role === "admin" ? (
                    <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  ) : role === "staff" ? (
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  ) : (
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  )}
                  <Input
                    id={`${role}-username`}
                    type="text"
                    placeholder={`Enter ${role} username`}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                      if (errors.username) setErrors({ ...errors, username: undefined })
                    }}
                    className={`pl-10 h-12 border-gray-300 dark:border-gray-600 ${getRoleInfo(role).focusColor} transition-colors ${
                      errors.username ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    required
                  />
                </div>
                {errors.username && (
                  <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.username}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${role}-password`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id={`${role}-password`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors({ ...errors, password: undefined })
                    }}
                    className={`pl-10 pr-10 h-12 border-gray-300 dark:border-gray-600 ${getRoleInfo(role).focusColor} transition-colors ${
                      errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className={`w-full h-12 bg-gradient-to-r ${getRoleInfo(role).buttonGradient} text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    {role === "admin" ? (
                      <Shield className="mr-2 h-4 w-4" />
                    ) : role === "staff" ? (
                      <Users className="mr-2 h-4 w-4" />
                    ) : (
                      <ShoppingCart className="mr-2 h-4 w-4" />
                    )}
                    Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
                  </>
                )}
              </Button>
            </form>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
