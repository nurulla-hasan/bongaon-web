import { Truck } from "lucide-react";
import { GrassTuft, LeafSprig } from "@/components/common/leaf-decor";
import { CONTAINER_GUTTER, CONTAINER_MAX_WIDTH } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function AnnouncementBar({ message }: { message: string }) {
  return (
    <div className="relative hidden overflow-hidden bg-primary text-primary-foreground sm:block">
      <LeafSprig className="pointer-events-none absolute -bottom-8 left-3 hidden h-16 w-12 text-primary-foreground/20 sm:block" />
      <GrassTuft className="pointer-events-none absolute -right-2 -bottom-1 hidden h-10 w-14 -scale-x-100 text-primary-foreground/25 sm:block" />
      <div
        className={cn(
          "mx-auto flex items-center justify-center gap-2 py-1.5 text-center text-xs font-medium",
          CONTAINER_MAX_WIDTH,
          CONTAINER_GUTTER
        )}
      >
        <Truck className="size-3.5 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
}
