import Link from 'next/link';

import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export function buttonClassName(variant: ButtonVariant = 'primary', className?: string) {
  return cn(
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 disabled:pointer-events-none disabled:opacity-70',
    variant === 'primary' &&
      'border border-teal-600/12 bg-[linear-gradient(135deg,rgba(24,48,61,0.96)_0%,rgba(23,109,103,0.96)_100%)] text-sand-50 shadow-[0_16px_36px_rgba(23,109,103,0.18)] hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(23,109,103,0.22)]',
    variant === 'secondary' &&
      'border border-ink-900/8 bg-white/96 text-ink-900 shadow-[0_10px_28px_rgba(16,33,42,0.06)] hover:border-teal-600/20 hover:text-teal-600',
    variant === 'ghost' && 'bg-sand-50 text-ink-900 hover:bg-sand-100 hover:text-ink-950',
    className,
  );
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={buttonClassName(variant, className)}
    >
      {children}
    </Link>
  );
}
