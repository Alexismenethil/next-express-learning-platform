import { FakeLoginPanel } from '@/components/admin/fake-login-panel';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function AdminEntryPage() {
  const language = await getCurrentLanguage();
  return <FakeLoginPanel language={language} />;
}
