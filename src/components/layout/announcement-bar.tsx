"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Truck } from "lucide-react";
import { GrassTuft, LeafSprig } from "@/components/common/leaf-decor";
import { CONTAINER_GUTTER, CONTAINER_MAX_WIDTH } from "@/lib/layout";
import { cn } from "@/lib/utils";

const barVariants = {
  visible: { height: "auto", opacity: 1 },
  hidden: { height: 0, opacity: 0 },
};

const surfaceVariants = {
  visible: { y: 0 },
  hidden: { y: "-100%" },
};

export function AnnouncementBar({ message }: { message: string }) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const anchorY = useRef(0);
  const lockedUntil = useRef(0);
  const isHidden = useRef(false);
  const reduceMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => {
    const now = Date.now();
    if (now < lockedUntil.current) return;

    if (!isHidden.current) {
      if (y < anchorY.current) anchorY.current = y;

      if (y > 96 && y - anchorY.current > 48) {
        isHidden.current = true;
        setHidden(true);
        anchorY.current = y;
        lockedUntil.current = now + 400;
      }
    } else {
      if (y > anchorY.current) anchorY.current = y;

      if (anchorY.current - y > 48) {
        isHidden.current = false;
        setHidden(false);
        anchorY.current = y;
        lockedUntil.current = now + 400;
      }
    }
  });

  return (
    <motion.div
      initial={false}
      animate={hidden ? "hidden" : "visible"}
      variants={barVariants}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="hidden overflow-hidden sm:block"
    >
      <motion.div
        variants={surfaceVariants}
        className="relative overflow-hidden bg-primary text-primary-foreground"
      >
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
      </motion.div>
    </motion.div>
  );
}
