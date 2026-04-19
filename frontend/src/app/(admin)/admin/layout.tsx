import { AdminAreaShell } from '@/components/admin/admin-area-shell';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const language = await getCurrentLanguage();

  return <AdminAreaShell language={language}>{children}</AdminAreaShell>;
}
