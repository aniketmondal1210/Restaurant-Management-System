"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesOverview } from "@/components/analytics/sales-overview"
import { TopItems } from "@/components/analytics/top-items"
import { OrderTrends } from "@/components/analytics/order-trends"
import { CustomerInsights } from "@/components/analytics/customer-insights"

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="items">Menu Items</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SalesOverview />
            <TopItems />
          </div>
          <OrderTrends />
        </TabsContent>

        <TabsContent value="sales" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Detailed breakdown of your restaurant's sales</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Sales analytics visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Menu Item Performance</CardTitle>
              <CardDescription>Analyze which menu items are performing best</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Menu item performance visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="pt-4">
          <CustomerInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}
