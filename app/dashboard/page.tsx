import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { RealSalesChart } from "@/components/analytics/real-sales-chart"
import { EnhancedStatsCards } from "@/components/dashboard/enhanced-stats-cards"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <EnhancedStatsCards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RealSalesChart />
        <RecentOrders />
      </div>
    </div>
  )
}
