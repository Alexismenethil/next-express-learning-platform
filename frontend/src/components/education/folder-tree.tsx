import { Card } from '@/components/ui/card';

export function FolderTree({
  title,
  items,
}: {
  title: string;
  items: Array<{ path: string; purpose: string }>;
}) {
  return (
    <Card className="space-y-4">
      <h3 className="text-xl font-semibold text-ink-950">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.path} className="rounded-2xl border border-ink-900/10 bg-sand-50 p-4">
            <code className="text-sm font-semibold text-ink-950">{item.path}</code>
            <p className="mt-2 text-sm leading-6 text-ink-700">{item.purpose}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
