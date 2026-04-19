'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { appConfig } from '@/lib/env';
import { t } from '@/lib/i18n';
import type { DataMode, Product } from '@/types/catalog';
import type { Language } from '@/lib/i18n';

export function AdminProductsTable({
  products,
  mode,
  language,
}: {
  products: Product[];
  mode: Extract<DataMode, 'api' | 'db'>;
  language: Language;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  return (
    <Card className="space-y-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-ink-950">
            {t(language, 'Tabla CRUD de admin', 'Admin CRUD table')}
          </h3>
          <p className="text-sm text-ink-700">
            {t(
              language,
              'Esta tabla siempre escribe a traves de Express. Cambia entre API y DB para comparar persistencia en memoria frente a PostgreSQL.',
              'This table always writes through Express. Switch between API and DB mode to compare in-memory versus PostgreSQL persistence.',
            )}
          </p>
        </div>
        <Link
          href={`/admin/products/new?mode=${mode}`}
          className={buttonClassName('primary', 'px-4')}
        >
          {t(language, 'Crear producto', 'Create product')}
        </Link>
      </div>
      {error ? (
        <div className="rounded-2xl border border-coral-500/20 bg-coral-500/10 px-4 py-3 text-sm text-coral-500">
          {error}
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-ink-900/10 text-xs uppercase tracking-[0.2em] text-ink-700">
              <th className="px-4 py-3">{t(language, 'Producto', 'Product')}</th>
              <th className="px-4 py-3">{t(language, 'Categoria', 'Category')}</th>
              <th className="px-4 py-3">{t(language, 'Precio', 'Price')}</th>
              <th className="px-4 py-3">{t(language, 'Estado', 'Status')}</th>
              <th className="px-4 py-3">{t(language, 'Acciones', 'Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-ink-900/5">
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-ink-950">{product.name}</p>
                    <p className="text-sm text-ink-700">{product.shortDescription}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-ink-700">{product.categoryName}</td>
                <td className="px-4 py-4 text-sm text-ink-700">{formatCurrency(product.price)}</td>
                <td className="px-4 py-4">
                  <Badge variant={product.status === 'published' ? 'teal' : 'muted'}>
                    {product.status === 'published'
                      ? t(language, 'Publicado', 'Published')
                      : t(language, 'Borrador', 'Draft')}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit?mode=${mode}`}
                      className="text-sm font-semibold text-teal-600"
                    >
                      {t(language, 'Editar', 'Edit')}
                    </Link>
                    <button
                      type="button"
                      disabled={pendingId === product.id}
                      onClick={async () => {
                        setPendingId(product.id);
                        setError(null);

                        try {
                          const response = await fetch(
                            `${appConfig.browserApiUrl}/products/${product.id}?mode=${mode}`,
                            {
                              method: 'DELETE',
                            },
                          );

                          if (!response.ok) {
                            const payload = (await response.json()) as { message?: string };
                            throw new Error(payload.message ?? t(language, 'La eliminacion fallo.', 'Delete failed.'));
                          }

                          startTransition(() => {
                            router.refresh();
                          });
                        } catch (deleteError) {
                          setError(
                            deleteError instanceof Error
                              ? deleteError.message
                              : t(language, 'No se pudo eliminar el producto.', 'Unable to delete product.'),
                          );
                        } finally {
                          setPendingId(null);
                        }
                      }}
                      className="text-sm font-semibold text-coral-500 disabled:opacity-50"
                    >
                      {pendingId === product.id
                        ? t(language, 'Eliminando...', 'Deleting...')
                        : t(language, 'Eliminar', 'Delete')}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
