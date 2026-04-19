'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { startTransition, useEffect, useRef, useState } from 'react';
import { ImagePlus, LoaderCircle, UploadCloud, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { buttonClassName } from '@/components/ui/button-link';
import { Card } from '@/components/ui/card';
import { MediaImage } from '@/components/ui/media-image';
import { appConfig } from '@/lib/env';
import { t } from '@/lib/i18n';
import { resolveMediaUrl } from '@/lib/media';
import type { Category, Product, ProductFormValues } from '@/types/catalog';
import type { Language } from '@/lib/i18n';

type ValidationDetails = {
  fieldErrors?: Record<string, string[] | undefined>;
};

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
    imageUrl: product?.imageUrl ?? '',
  };
}

function getFriendlyValidationMessages(language: Language, details?: ValidationDetails) {
  const fieldErrors = details?.fieldErrors;

  if (!fieldErrors) {
    return [];
  }

  const messages: string[] = [];

  if (fieldErrors.name?.length) {
    messages.push(
      t(
        language,
        'Nombre: usa al menos 2 caracteres.',
        'Name: use at least 2 characters.',
      ),
    );
  }

  if (fieldErrors.shortDescription?.length) {
    messages.push(
      t(
        language,
        'Descripcion corta: usa al menos 4 caracteres.',
        'Short description: use at least 4 characters.',
      ),
    );
  }

  if (fieldErrors.description?.length) {
    messages.push(
      t(
        language,
        'Descripcion completa: usa al menos 8 caracteres.',
        'Full description: use at least 8 characters.',
      ),
    );
  }

  if (fieldErrors.categorySlug?.length) {
    messages.push(
      t(
        language,
        'Categoria: selecciona una categoria valida.',
        'Category: select a valid category.',
      ),
    );
  }

  if (fieldErrors.learningNotes?.length) {
    messages.push(
      t(
        language,
        'Notas de aprendizaje: agrega al menos 1 nota con 2 o mas caracteres.',
        'Learning notes: add at least 1 note with 2 or more characters.',
      ),
    );
  }

  if (fieldErrors.price?.length) {
    messages.push(
      t(
        language,
        'Precio: debe ser mayor que 0.',
        'Price: it must be greater than 0.',
      ),
    );
  }

  if (fieldErrors.inventory?.length) {
    messages.push(
      t(
        language,
        'Inventario: debe ser 0 o mayor.',
        'Inventory: it must be 0 or greater.',
      ),
    );
  }

  if (fieldErrors.imageUrl?.length) {
    messages.push(
      t(
        language,
        'Ruta de imagen: si la usas, no puede ir vacia.',
        'Image path: if you use it, it cannot be empty.',
      ),
    );
  }

  return messages;
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
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const learningNotesText = values.learningNotes.join('\n');
  const previewImageUrl = localPreviewUrl ?? resolveMediaUrl(values.imageUrl);

  useEffect(() => {
    return () => {
      if (localPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(localPreviewUrl);
      }
    };
  }, [localPreviewUrl]);

  async function uploadImage(file: File) {
    if (!file.type.startsWith('image/')) {
      setUploadError(
        t(language, 'Selecciona un archivo de imagen valido.', 'Select a valid image file.'),
      );
      return;
    }

    if (localPreviewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(localPreviewUrl);
    }

    setLocalPreviewUrl(URL.createObjectURL(file));
    setUploadError(null);
    setIsUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${appConfig.browserApiUrl}/uploads/product-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json()) as { message?: string };
        throw new Error(
          payload.message ??
            t(language, 'No se pudo subir la imagen.', 'Unable to upload the image.'),
        );
      }

      const payload = (await response.json()) as { data?: { url?: string } };
      const uploadedUrl = payload.data?.url;

      if (!uploadedUrl) {
        throw new Error(
          t(
            language,
            'El backend no devolvio una URL de imagen.',
            'The backend did not return an image URL.',
          ),
        );
      }

      setValues((current) => ({ ...current, imageUrl: uploadedUrl }));
    } catch (uploadIssue) {
      setUploadError(
        uploadIssue instanceof Error
          ? uploadIssue.message
          : t(language, 'Fallo la carga de imagen.', 'Image upload failed.'),
      );
    } finally {
      setIsUploadingImage(false);
    }
  }

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

      {fieldErrors.length ? (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-700">
          <p className="font-semibold text-amber-800">
            {t(
              language,
              'Antes de guardar, corrige estos puntos:',
              'Before saving, fix these points:',
            )}
          </p>
          <ul className="mt-2 space-y-1">
            {fieldErrors.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <form
        className="grid gap-5 md:grid-cols-2"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSubmitting(true);
          setError(null);
          setFieldErrors([]);

          const payload: ProductFormValues = {
            ...values,
            learningNotes: learningNotesText
              .split('\n')
              .map((item) => item.trim())
              .filter(Boolean),
            imageUrl: values.imageUrl?.trim() || undefined,
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
              const result = (await response.json()) as {
                message?: string;
                details?: ValidationDetails;
              };
              const friendlyMessages = getFriendlyValidationMessages(language, result.details);

              if (friendlyMessages.length) {
                setFieldErrors(friendlyMessages);
              }

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
          <p className="text-xs text-ink-700">
            {t(
              language,
              'Minimo 4 caracteres.',
              'Minimum 4 characters.',
            )}
          </p>
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
          <p className="text-xs text-ink-700">
            {t(
              language,
              'Minimo 8 caracteres.',
              'Minimum 8 characters.',
            )}
          </p>
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

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-semibold text-ink-950">
            {t(language, 'Ruta de imagen', 'Image path')}
          </span>
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              setDragActive(false);
            }}
            onDrop={async (event) => {
              event.preventDefault();
              setDragActive(false);
              const file = event.dataTransfer.files?.[0];

              if (file) {
                await uploadImage(file);
              }
            }}
            className={`rounded-[24px] border border-dashed px-5 py-6 transition ${
              dragActive
                ? 'border-teal-600 bg-teal-50'
                : 'border-ink-900/12 bg-sand-50/80 hover:border-teal-600/40 hover:bg-white'
            }`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-ink-950 shadow-sm">
                  {isUploadingImage ? (
                    <LoaderCircle className="size-5 animate-spin" />
                  ) : (
                    <UploadCloud className="size-5" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-ink-950">
                    {t(
                      language,
                      'Arrastra una imagen aqui o haz clic para seleccionarla',
                      'Drop an image here or click to choose one',
                    )}
                  </p>
                  <p className="text-xs leading-5 text-ink-700">
                    {t(
                      language,
                      'JPG, PNG, WEBP o GIF. Se sube al backend y luego se guarda su ruta en el producto.',
                      'JPG, PNG, WEBP, or GIF. It uploads to the backend and then stores the path in the product.',
                    )}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className={buttonClassName('secondary', 'px-4')}
                onClick={(event) => {
                  event.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <ImagePlus className="mr-2 size-4" />
                {t(language, 'Seleccionar archivo', 'Choose file')}
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];

                if (file) {
                  await uploadImage(file);
                }

                event.target.value = '';
              }}
            />
          </div>

          <input
            value={values.imageUrl ?? ''}
            onChange={(event) =>
              setValues((current) => ({ ...current, imageUrl: event.target.value }))
            }
            placeholder="/images/products/example.png"
            className="w-full rounded-2xl border border-ink-900/10 bg-sand-50 px-4 py-3 text-sm outline-none"
          />
          <p className="text-xs text-ink-700">
            {t(
              language,
              'Puedes usar una ruta publica del frontend o una ruta subida al backend como `/uploads/products/...`.',
              'You can use a frontend public path or a backend-uploaded path such as `/uploads/products/...`.',
            )}
          </p>
          <p className="text-xs text-ink-500">
            {t(
              language,
              'Nota: esta subida guarda el archivo en disco del backend. En Railway sirve para demo, pero en produccion lo ideal seria S3, Cloudinary o similar.',
              'Note: this upload stores the file on the backend disk. It works for demos on Railway, but production should use S3, Cloudinary, or similar.',
            )}
          </p>
          {uploadError ? <p className="text-xs text-coral-500">{uploadError}</p> : null}
        </label>

        {previewImageUrl ? (
          <div className="md:col-span-2">
            <div className="rounded-[24px] border border-ink-900/8 bg-sand-50/80 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
                  {t(language, 'Preview de imagen', 'Image preview')}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (localPreviewUrl?.startsWith('blob:')) {
                      URL.revokeObjectURL(localPreviewUrl);
                    }

                    setLocalPreviewUrl(null);
                    setValues((current) => ({ ...current, imageUrl: '' }));
                  }}
                  className="inline-flex items-center text-xs font-semibold text-coral-500"
                >
                  <X className="mr-1 size-3.5" />
                  {t(language, 'Quitar imagen', 'Remove image')}
                </button>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <div className="h-28 w-40 overflow-hidden rounded-2xl border border-ink-900/8 bg-white">
                  <MediaImage
                    src={previewImageUrl}
                    alt={values.name || 'Product preview'}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="max-w-xl text-sm leading-6 text-ink-700">
                  {t(
                    language,
                    'Asi se vera la imagen en las cards y pantallas del catalogo.',
                    'This is how the image will appear in catalog cards and screens.',
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : null}

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
            {t(
              language,
              'Usa una nota educativa por linea. Minimo 1 nota con 2 o mas caracteres.',
              'Use one educational note per line. Minimum 1 note with 2 or more characters.',
            )}
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
