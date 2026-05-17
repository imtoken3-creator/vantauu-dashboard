import { Inbox } from "lucide-react";

export function EmptyState({
  title = "No signals available",
  description = "This mock view has no data for the selected context.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/15 px-4 py-8 text-center shadow-inner shadow-white/[0.03]">
      <div className="mx-auto flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] text-primary">
        <Inbox className="size-5" />
      </div>
      <p className="mt-4 text-sm font-medium text-white">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
