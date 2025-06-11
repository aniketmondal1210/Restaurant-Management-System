"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Loader2,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Shield,
  Users,
  Building,
  ShoppingCart,
  Phone,
  UserPlus,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManager } from "@/lib/user-management"

interface SignUpFormProps {
  onSuccess: () => void
}

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  role: "customer" | "staff" | "admin" | ""
  restaurantName: string
  fullName: string
  phone: string
  agreeToTerms: boolean
}

interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  role?: string
  restaurantName?: string
  fullName?: string
  phone?: string
  agreeToTerms?: string
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    restaurantName: "",
    fullName: "",
    phone: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("customer")
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores"
    } else if (UserManager.userExists(formData.username)) {
      newErrors.username = "Username already exists"
    }

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    } else if (UserManager.emailExists(formData.email)) {
      newErrors.email = "Email already registered"
    }

    // Phone validation (for customers)
    if (activeTab === "customer") {
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number"
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Restaurant name validation (for admin role)
    if (activeTab === "admin" && !formData.restaurantName.trim()) {
      newErrors.restaurantName = "Restaurant name is required for admin accounts"
    }

    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setFormData((prev) => ({ ...prev, role: tab as "customer" | "staff" | "admin" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Set role based on active tab
    const currentFormData = { ...formData, role: activeTab as "customer" | "staff" | "admin" }
    setFormData(currentFormData)

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create new user
      const newUser = {
        username: currentFormData.username,
        email: currentFormData.email,
        password: currentFormData.password,
        role: currentFormData.role as "customer" | "staff" | "admin",
        fullName: currentFormData.fullName,
        phone: currentFormData.phone || undefined,
        restaurantName: currentFormData.restaurantName || undefined,
        createdAt: new Date().toISOString(),
        isActive: true,
      }

      UserManager.createUser(newUser)

      toast({
        title: "Account created successfully!",
        description: `Welcome to QuickBites! You can now sign in with your ${currentFormData.role} credentials.`,
        variant: "success",
      })

      // Reset form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        restaurantName: "",
        fullName: "",
        phone: "",
        agreeToTerms: false,
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred while creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleInfo = (role: string) => {
    switch (role) {
      case "customer":
        return {
          title: "Customer Account",
          description: "Order food, track deliveries, and manage your preferences",
          icon: <ShoppingCart className="h-4 w-4" />,
          gradient: "from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20",
          border: "border-green-200/50 dark:border-green-700/50",
          textColor: "text-green-700 dark:text-green-300",
          buttonGradient: "from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700",
        }
      case "staff":
        return {
          title: "Staff Account",
          description: "Manage orders, serve customers, and handle daily operations",
          icon: <Users className="h-4 w-4" />,
          gradient: "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
          border: "border-blue-200/50 dark:border-blue-700/50",
          textColor: "text-blue-700 dark:text-blue-300",
          buttonGradient: "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
        }
      case "admin":
        return {
          title: "Administrator Account",
          description: "Full system access with management and analytics capabilities",
          icon: <Shield className="h-4 w-4" />,
          gradient: "from-purple-50 to-red-50 dark:from-purple-900/20 dark:to-red-900/20",
          border: "border-purple-200/50 dark:border-purple-700/50",
          textColor: "text-purple-700 dark:text-purple-300",
          buttonGradient: "from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700",
        }
      default:
        return {
          title: "Account",
          description: "Create your account",
          icon: <User className="h-4 w-4" />,
          gradient: "from-gray-50 to-gray-50",
          border: "border-gray-200/50",
          textColor: "text-gray-700",
          buttonGradient: "from-gray-600 to-gray-600",
        }
    }
  }

  const roleInfo = getRoleInfo(activeTab)

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
                  <p className={`text-xs ${getRoleInfo(role).textColor.replace("700", "600").replace("300", "400")}`}>
                    {getRoleInfo(role).description}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={`pl-10 h-12 ${errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    required
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className={`pl-10 h-12 ${errors.username ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
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

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 h-12 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone (for customers) */}
              {role === "customer" && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`pl-10 h-12 ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                      required
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              )}

              {/* Restaurant Name (for admin only) */}
              {role === "admin" && (
                <div className="space-y-2">
                  <Label htmlFor="restaurantName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Restaurant Name *
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="restaurantName"
                      type="text"
                      placeholder="Enter your restaurant name"
                      value={formData.restaurantName}
                      onChange={(e) => handleInputChange("restaurantName", e.target.value)}
                      className={`pl-10 h-12 ${errors.restaurantName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                      required
                    />
                  </div>
                  {errors.restaurantName && (
                    <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.restaurantName}
                    </p>
                  )}
                </div>
              )}

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 h-12 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
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
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Password must be at least 8 characters with uppercase, lowercase, and number
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pl-10 pr-10 h-12 ${errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked === true)}
                    className={errors.agreeToTerms ? "border-red-500" : ""}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    I agree to the{" "}
                    <button type="button" className="text-blue-600 hover:text-blue-700 underline">
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button type="button" className="text-blue-600 hover:text-blue-700 underline">
                      Privacy Policy
                    </button>
                  </Label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.agreeToTerms}
                  </p>
                )}
              </div>

              {/* Security Notice */}
              <Alert className={`bg-gradient-to-r ${getRoleInfo(role).gradient} border ${getRoleInfo(role).border}`}>
                <Shield
                  className={`h-4 w-4 ${getRoleInfo(role).textColor.replace("700", "600").replace("300", "400")}`}
                />
                <AlertDescription className={`${getRoleInfo(role).textColor} text-xs`}>
                  Your account will be created securely.{" "}
                  {role === "admin" && "Admin accounts require approval before activation."}
                </AlertDescription>
              </Alert>

              {/* Submit Button */}
              <Button
                type="submit"
                className={`w-full h-12 bg-gradient-to-r ${getRoleInfo(role).buttonGradient} text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create {role.charAt(0).toUpperCase() + role.slice(1)} Account
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
