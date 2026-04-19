import { notFound } from 'next/navigation';

import { AdminProductForm } from '@/components/admin/admin-product-form';
import { getCurrentLanguage } from '@/lib/i18n-server';
import { getCategories, getProductById } from '@/services/catalog-service';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mode?: 'api' | 'db' }>;
};

export default async function EditProductPage({ params, searchParams }: PageProps) {
  const language = await getCurrentLanguage();
  const { id } = await params;
  const { mode = 'api' } = await searchParams;
  const [categories, product] = await Promise.all([getCategories(mode), getProductById(mode, id)]);

  if (!product) {
    notFound();
  }

  return <AdminProductForm mode={mode} categories={categories} product={product} language={language} />;
}
