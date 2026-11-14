import { Truck } from "lucide-react";
import { CONTAINER_GUTTER, CONTAINER_MAX_WIDTH } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function AnnouncementBar({ message }: { message: string }) {
  return (
    <div className="relative hidden overflow-hidden bg-primary text-primary-foreground sm:block">
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
