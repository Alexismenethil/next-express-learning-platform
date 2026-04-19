import Link from 'next/link';

import { MediaImage } from '@/components/ui/media-image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { t } from '@/lib/i18n';
import { formatCurrency } from '@/lib/utils';
import type { DataMode, Product } from '@/types/catalog';
import type { Language } from '@/lib/i18n';

export function ProductCard({
  product,
  mode,
  language,
}: {
  product: Product;
  mode: DataMode;
  language: Language;
}) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border-ink-900/10 bg-white/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-ink-900/20 hover:shadow-[0_32px_64px_rgba(16,33,42,0.08)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-50">
        {product.imageUrl ? (
          <MediaImage
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink-100 text-sm font-medium text-ink-400">
            {t(language, 'Sin imagen', 'No image')}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge variant="default" className="bg-white/90 text-ink-950 shadow-sm backdrop-blur-md hover:bg-white">{product.categoryName}</Badge>
          <Badge variant={mode === 'db' ? 'coral' : mode === 'api' ? 'teal' : 'muted'} className="shadow-sm backdrop-blur-md">
            {mode.toUpperCase()}
          </Badge>
          {product.featured ? <Badge variant="coral" className="shadow-sm backdrop-blur-md">{t(language, 'Destacado', 'Featured')}</Badge> : null}
        </div>
      </div>
      
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="space-y-2.5">
          <h3 className="line-clamp-1 text-xl font-bold tracking-tight text-ink-950 transition-colors group-hover:text-teal-700">{product.name}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-ink-600">{product.shortDescription}</p>
        </div>
        
        <div className="mt-6 flex flex-col gap-5 pt-5 border-t border-ink-900/5">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-ink-500">{t(language, 'Precio', 'Price')}</span>
              <span className="text-2xl font-bold tracking-tight text-ink-950">{formatCurrency(product.price)}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-ink-500">{t(language, 'Stock', 'Stock')}</span>
              <span className="text-sm font-medium text-ink-700">
                {product.inventory} {t(language, 'uds', 'u.')}
              </span>
            </div>
          </div>
          
          <Link
            href={`/products/${product.slug}?mode=${mode}`}
            className="relative flex w-full items-center justify-center overflow-hidden rounded-full border border-ink-900/10 bg-white px-6 py-3.5 text-sm font-semibold text-ink-950 shadow-sm transition-all duration-300 hover:border-teal-600 hover:bg-teal-50 hover:text-teal-700 hover:shadow-md hover:shadow-teal-500/10 active:scale-[0.98]"
          >
            {t(language, 'Ver detalle', 'View detail')}
          </Link>
        </div>
      </div>
    </Card>
  );
}
