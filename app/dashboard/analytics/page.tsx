import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { PageHeader } from "@/components/ui/page-header"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader heading="Analytics" subheading="View detailed statistics and reports about your restaurant" />
      <AnalyticsDashboard />
    </div>
  )
}
