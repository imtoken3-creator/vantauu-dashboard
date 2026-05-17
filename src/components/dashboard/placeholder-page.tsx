import type { LucideIcon } from "lucide-react";

export function PlaceholderPage({
  title,
  eyebrow,
  description,
  icon: Icon,
}: {
  title: string;
  eyebrow: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <section className="section-surface min-h-[520px]">
      <div className="flex max-w-3xl items-start gap-4">
        <div className="icon-tile p-3">
          <Icon className="size-6" />
        </div>
        <div>
          <p className="section-eyebrow">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
