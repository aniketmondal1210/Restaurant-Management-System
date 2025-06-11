import { UserDashboardHeader } from "@/components/user-dashboard/user-dashboard-header"
import { UserStatsCards } from "@/components/user-dashboard/user-stats-cards"
import { TodaysOrders } from "@/components/user-dashboard/todays-orders"
import { QuickActions } from "@/components/user-dashboard/quick-actions"

export default function UserDashboardPage() {
  return (
    <div className="space-y-6">
      <UserDashboardHeader />
      <UserStatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaysOrders />
        <QuickActions />
      </div>
    </div>
  )
}
