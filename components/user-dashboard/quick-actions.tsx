"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Users, Clock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      title: "Take New Order",
      description: "Start processing a new customer order",
      icon: Plus,
      action: () => router.push("/user-dashboard/orders"),
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "View Customers",
      description: "Look up customer information",
      icon: Users,
      action: () => router.push("/user-dashboard/customers"),
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Check Queue",
      description: "View current order queue status",
      icon: Clock,
      action: () => router.push("/user-dashboard/orders"),
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Complete Order",
      description: "Mark orders as ready for pickup",
      icon: CheckCircle,
      action: () => router.push("/user-dashboard/orders"),
      gradient: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-all duration-200"
              onClick={action.action}
            >
              <div
                className={`w-8 h-8 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center`}
              >
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
