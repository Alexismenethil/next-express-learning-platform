import { cn } from '@/lib/utils';

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,252,246,0.92)_100%)] p-6 shadow-[0_18px_50px_rgba(16,33,42,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
