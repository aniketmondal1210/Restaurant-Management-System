import { MenuManagement } from "@/components/menu/menu-management"
import { PageHeader } from "@/components/ui/page-header"

export default function MenuPage() {
  return (
    <div className="space-y-6">
      <PageHeader heading="Menu Management" subheading="Manage your restaurant's menu items and categories" />
      <MenuManagement />
    </div>
  )
}
