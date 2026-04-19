import { AdminProductForm } from '@/components/admin/admin-product-form';
import { getCurrentLanguage } from '@/lib/i18n-server';
import { getCategories } from '@/services/catalog-service';

type PageProps = {
  searchParams: Promise<{ mode?: 'api' | 'db' }>;
};

export default async function NewProductPage({ searchParams }: PageProps) {
  const language = await getCurrentLanguage();
  const { mode = 'api' } = await searchParams;
  const categories = await getCategories(mode);

  return <AdminProductForm mode={mode} categories={categories} language={language} />;
}
