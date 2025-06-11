"use client"

import { useAuth } from "@/context/auth-context"
import { CustomerDashboardHeader } from "@/components/customer-dashboard/customer-dashboard-header"
import { CustomerStatsCards } from "@/components/customer-dashboard/customer-stats-cards"
import { QuickOrder } from "@/components/customer-dashboard/quick-order"
import { FavoriteItems } from "@/components/customer-dashboard/favorite-items"
import { RecentOrders } from "@/components/customer-dashboard/recent-orders"

export default function CustomerDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <CustomerDashboardHeader />
      <CustomerStatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickOrder />
        <FavoriteItems />
      </div>

      <RecentOrders />
    </div>
  )
}
