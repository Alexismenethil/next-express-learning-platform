export default function LoadingProducts() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-[28px] border border-ink-900/10 bg-white/80"
          />
        ))}
      </div>
    </div>
  );
}
