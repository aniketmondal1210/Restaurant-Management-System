import { EnhancedOrderManagement } from "@/components/orders/enhanced-order-management"
import { PageHeader } from "@/components/ui/page-header"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader heading="Order Management" subheading="Process and manage customer orders" />
      <EnhancedOrderManagement />
    </div>
  )
}
