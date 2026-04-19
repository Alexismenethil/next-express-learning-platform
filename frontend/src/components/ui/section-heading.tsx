import { Badge } from './badge';

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-5">
      <Badge variant="teal">{eyebrow}</Badge>
      <div className="space-y-3.5">
        <h2 className="max-w-4xl text-balance text-3xl font-semibold tracking-tight text-ink-950 md:text-4xl">
          {title}
        </h2>
        <p className="max-w-3xl text-base leading-7 text-ink-700 md:text-lg">{description}</p>
      </div>
    </div>
  );
}
