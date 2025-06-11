import { UserManagement } from "@/components/dashboard/user-management"
import { PageHeader } from "@/components/ui/page-header"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader heading="User Management" subheading="Manage user accounts, roles, and permissions" />
      <UserManagement />
    </div>
  )
}
