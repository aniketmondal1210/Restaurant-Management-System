"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CustomerInsights() {
  // Mock data - in a real app, this would come from an API
  const customerStats = {
    totalCustomers: 248,
    newCustomers: 32,
    returningRate: 68,
    avgVisitsPerMonth: 2.4,
  }

  const topCustomers = [
    { name: "John Smith", orders: 24, spent: 742.5 },
    { name: "Sarah Johnson", orders: 18, spent: 523.75 },
    { name: "Michael Brown", orders: 15, spent: 489.25 },
    { name: "Emily Davis", orders: 12, spent: 356.8 },
    { name: "David Wilson", orders: 10, spent: 312.45 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Overview</CardTitle>
          <CardDescription>Key customer metrics and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
              <p className="text-2xl font-bold">{customerStats.totalCustomers}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">New This Month</p>
              <p className="text-2xl font-bold">{customerStats.newCustomers}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Return Rate</p>
              <p className="text-2xl font-bold">{customerStats.returningRate}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Avg. Visits/Month</p>
              <p className="text-2xl font-bold">{customerStats.avgVisitsPerMonth}</p>
            </div>
          </div>

          <div className="h-[200px] flex items-center justify-center mt-6">
            <div className="text-center text-muted-foreground">
              <p>Customer growth chart would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Customers</CardTitle>
          <CardDescription>Your most valuable customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={customer.name} className="flex items-center justify-between border-b pb-2 last:border-0">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${customer.spent.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">total spent</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
