"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/auth/login-form"
import { SignUpForm } from "@/components/auth/signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, LogIn, UserPlus } from "lucide-react"

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <Card className="restaurant-card border-0 shadow-2xl w-full max-w-lg">
      <CardHeader className="text-center pb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 hero-gradient rounded-2xl mb-4 shadow-lg mx-auto">
          <ChefHat className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to QuickBites</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">
          {activeTab === "login" ? "Sign in to access your account" : "Create your account to get started"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="signup">
            <SignUpForm onSuccess={() => setActiveTab("login")} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
