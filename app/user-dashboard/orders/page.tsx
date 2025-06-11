import { OrderManagementSystem } from "@/components/orders/order-management-system"
import { PageHeader } from "@/components/ui/page-header"

export default function UserOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader heading="Order Management" subheading="Process and manage customer orders" />
      <OrderManagementSystem />
    </div>
  )
}
