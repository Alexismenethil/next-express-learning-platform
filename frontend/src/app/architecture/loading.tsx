export default function LoadingArchitecture() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="space-y-6">
        <div className="h-10 w-64 animate-pulse rounded-full bg-white/80" />
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-56 animate-pulse rounded-[28px] bg-white/80" />
          ))}
        </div>
      </div>
    </div>
  );
}
