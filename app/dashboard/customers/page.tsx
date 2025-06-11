import { CustomerManagement } from "@/components/customers/customer-management"
import { PageHeader } from "@/components/ui/page-header"

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader heading="Customer Management" subheading="Manage customer information and order history" />
      <CustomerManagement />
    </div>
  )
}
