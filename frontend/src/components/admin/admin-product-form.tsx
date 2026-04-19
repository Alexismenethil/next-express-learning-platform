'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { appConfig } from '@/lib/env';
import { t } from '@/lib/i18n';
import type { Category, Product, ProductFormValues } from '@/types/catalog';
import type { Language } from '@/lib/i18n';

function toInitialValues(product?: Product): ProductFormValues {
  return {
    name: product?.name ?? '',
    shortDescription: product?.shortDescription ?? '',
    description: product?.description ?? '',
    price: product?.price ?? 0,
    inventory: product?.inventory ?? 0,
    status: product?.status ?? 'draft',
    featured: product?.featured ?? false,
    categorySlug: product?.categorySlug ?? '',
    learningNotes: product?.learningNotes ?? [''],
  };
}

export function AdminProductForm({
  mode,
  categories,
  product,
  language,
}: {
  mode: 'api' | 'db';
  categories: Category[];
  product?: Product;
  language: Language;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>(toInitialValues(product));
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const learningNotesText = values.learningNotes.join('\n');

  return (
    <Card className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="coral">
          {mode.toUpperCase()} · {t(language, 'Ruta de escritura', 'Write path')}
        </Badge>
        <Badge variant="muted">
          {product ? t(language, 'Flujo de edicion', 'Edit flow') : t(language, 'Flujo de creacion', 'Create flow')}
        </Badge>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-ink-950">
          {product ? t(language, 'Editar producto', 'Edit product') : t(language, 'Crear producto', 'Create product')}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-ink-700">
          {t(
            language,
            'Este form vive en',
            'This form lives in',
          )}{' '}
          <code>src/components/admin/admin-product-form.tsx</code>{' '}
          {t(
            language,
            'y llama al API de Express de forma directa. El repository del backend cambia segun el modo seleccionado.',
            'and calls the Express API directly. The backend repository changes based on the selected mode.',
          )}
        </p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-coral-500/20 bg-coral-500/10 px-4 py-3 text-sm text-coral-500">
          {error}
        </div>
      ) : null}

      <form
        className="grid gap-5 md:grid-cols-2"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSubmitting(true);
          setError(null);

          const payload: ProductFormValues = {
            ...values,
            learningNotes: learningNotesText
              .split('\n')
              .map((item) => item.trim())
              .filter(Boolean),
          };

          if (!payload.categorySlug) {
            setError(t(language, 'Selecciona una categoria antes de guardar.', 'Select a category before saving.'));
            setIsSubmitting(false);
            return;
          }

          try {
            const response = await fetch(
              `${appConfig.browserApiUrl}/products${product ? `/${product.id}` : ''}?mode=${mode}`,
              {
                method: product ? 'PUT' : 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              },
            );

            if (!response.ok) {
              const result = (await response.json()) as { message?: string };
              throw new Error(result.message ?? t(language, 'No se pudo guardar el producto.', 'Unable to save product.'));
            }

            startTransition(() => {
              router.push(`/admin/products?mode=${mode}`);
              router.refresh();
            });
          } catch (submitError) {
            setError(
              submitError instanceof Error
                ? submitError.message
                : t(language, 'Error desconocido al enviar.', 'Unknown submit error.'),
            );
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink-950">{t(language, 'Nombre', 'Name')}</span>
          <input
            value={values.name}
            onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
            className="w-full rounded-2xl border border-ink-900/10 bg-sand-50 px-4 py-3 text-sm outline-none ring-0"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink-950">{t(language, 'Categoria', 'Category')}</span>
          <select
            value={values.categorySlug}
            onChange={(event) =>
              setValues((current) => ({ ...current, categorySlug: event.target.value }))
            }
            className="w-full rounded-2xl border border-ink-900/10 bg-sand-50 px-4 py-3 text-sm outline-none"
            required
          >
            <option value="">{t(language, 'Selecciona categoria', 'Select category')}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-ink-950">
            {t(language, 'Descripcion corta', 'Short description')}
          </span>
          <input
            value={values.shortDescription}
            onChange={(event) =>
              setValues((current) => ({ ...current, shortDescription: event.target.value }))
            }
            className="w-full rounded-2xl border border-ink-900/10 bg-sand-50 px-4 py-3 text-sm outline-none"
            required
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-ink-950">
            {t(language, 'Descripcion completa', 'Full description')}
          </span>
          <textarea
            value={values.description}
            onChange={(event) =>
              setValues((current) => ({ ...current, description: event.target.value }))
            }
            rows={5}
            className="w-full rounded-2xl border border-ink-900/10 bg-sand-50 px-4 py-3 text-sm outline-none"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink-950">{t(language, 'Precio', 'Price')}</span>
          <input
            type="number"
            min="0"
            step="1"
            value={values.price}
            onChange={(event) =>
              setValues((current) => ({ ...current, price: Number(event.target.value) }))
            }
            className="w-full rounded-2xl border border-ink-900/10 bg-sand-50 px-4 py-3 text-sm outline-none"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink-950">{t(language, 'Inventario', 'Inventory')}</span>
          <input
            type="number"
            min="0"
            step="1"
            value={values.inventory}
            onChange={(event) =>
              setValues((current) => ({ ...current, inventory: Number(event.target.value) }))
            }
            className="w-full rounded-2xl border border-ink-900/10 bg-sand-50 px-4 py-3 text-sm outline-none"
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-ink-950">{t(language, 'Estado', 'Status')}</span>
          <select
            value={values.status}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                status: event.target.value as ProductFormValues['status'],
              }))
            }
            className="w-full rounded-2xl border border-ink-900/10 bg-sand-50 px-4 py-3 text-sm outline-none"
          >
            <option value="draft">{t(language, 'Borrador', 'Draft')}</option>
            <option value="published">{t(language, 'Publicado', 'Published')}</option>
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-ink-900/10 bg-sand-50 px-4 py-3 text-sm font-semibold text-ink-950">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(event) =>
              setValues((current) => ({ ...current, featured: event.target.checked }))
            }
          />
          {t(language, 'Destacado en home', 'Featured on the home page')}
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-ink-950">
            {t(language, 'Notas de aprendizaje', 'Learning notes')}
          </span>
          <textarea
            value={learningNotesText}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                learningNotes: event.target.value.split('\n'),
              }))
            }
            rows={4}
            className="w-full rounded-2xl border border-ink-900/10 bg-sand-50 px-4 py-3 text-sm outline-none"
          />
          <p className="text-xs text-ink-700">
            {t(language, 'Usa una nota educativa por linea.', 'Use one educational note per line.')}
          </p>
        </label>

        <div className="flex flex-wrap gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonClassName('primary')}
          >
            {isSubmitting
              ? t(language, 'Guardando...', 'Saving...')
              : product
                ? t(language, 'Guardar cambios', 'Save changes')
                : t(language, 'Crear producto', 'Create product')}
          </button>
          <Link
            href={`/admin/products?mode=${mode}`}
            className={buttonClassName('secondary')}
          >
            {t(language, 'Cancelar', 'Cancel')}
          </Link>
        </div>
      </form>
    </Card>
  );
}
