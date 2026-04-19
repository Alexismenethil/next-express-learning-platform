import { cn } from '@/lib/utils';

export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'teal' | 'coral' | 'muted';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]',
        variant === 'default' && 'border-ink-900/8 bg-white/90 text-ink-900',
        variant === 'teal' && 'border-teal-600/14 bg-[rgba(30,139,131,0.08)] text-teal-600',
        variant === 'coral' && 'border-coral-500/14 bg-[rgba(222,98,57,0.08)] text-coral-500',
        variant === 'muted' && 'border-ink-900/8 bg-sand-50/95 text-ink-700',
        className,
      )}
    >
      {children}
    </span>
  );
}
