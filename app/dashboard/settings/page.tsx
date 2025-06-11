import { SettingsForm } from "@/components/settings/settings-form"
import { PageHeader } from "@/components/ui/page-header"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader heading="Settings" subheading="Manage your restaurant settings and preferences" />
      <SettingsForm />
    </div>
  )
}
