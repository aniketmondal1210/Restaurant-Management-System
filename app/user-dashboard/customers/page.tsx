import { CustomerManagement } from "@/components/customers/customer-management"
import { PageHeader } from "@/components/ui/page-header"

export default function UserCustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader heading="Customer Service" subheading="View and assist customers" />
      <CustomerManagement />
    </div>
  )
}
