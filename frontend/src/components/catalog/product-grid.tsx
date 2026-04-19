import { ProductCard } from './product-card';

import type { DataMode, Product } from '@/types/catalog';
import type { Language } from '@/lib/i18n';

export function ProductGrid({
  products,
  mode,
  language,
}: {
  products: Product[];
  mode: DataMode;
  language: Language;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} mode={mode} language={language} />
      ))}
    </div>
  );
}
