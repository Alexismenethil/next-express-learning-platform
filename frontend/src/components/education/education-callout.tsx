import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function EducationCallout({
  title,
  description,
  label,
}: {
  title: string;
  description: string;
  label: string;
}) {
  return (
    <Card className="border-teal-600/10 bg-[linear-gradient(180deg,rgba(191,228,239,0.14)_0%,rgba(255,255,255,0.96)_55%)]">
      <div className="space-y-3">
        <Badge variant="teal">{label}</Badge>
        <h3 className="text-xl font-semibold leading-8 text-ink-950">{title}</h3>
        <p className="text-sm leading-6 text-ink-700">{description}</p>
      </div>
    </Card>
  );
}
