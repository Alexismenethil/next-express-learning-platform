import { FakeLoginPanel } from '@/components/admin/fake-login-panel';
import { getCurrentLanguage } from '@/lib/i18n-server';

export default async function DemoAccessPage() {
  const language = await getCurrentLanguage();

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
      <FakeLoginPanel language={language} />
    </div>
  );
}
