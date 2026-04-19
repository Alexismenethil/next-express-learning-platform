/* eslint-disable @next/next/no-img-element */

import { resolveMediaUrl } from '@/lib/media';
import { cn } from '@/lib/utils';

export function MediaImage({
  src,
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string | null;
  alt: string;
}) {
  const resolvedSrc = resolveMediaUrl(src);

  if (!resolvedSrc) {
    return null;
  }

  return <img src={resolvedSrc} alt={alt} className={cn(className)} {...props} />;
}
