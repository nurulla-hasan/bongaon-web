export const CONTAINER_MAX_WIDTH = "max-w-7xl";
export const CONTAINER_GUTTER = "px-4 md:px-6";

// Navbar = announcement strip + 4rem header. On small screens the
// announcement wraps to a second line, so subtract the taller value there.
export const HERO_HEIGHT =
  "min-h-[calc(100svh-6.75rem)] sm:min-h-[calc(100svh-5.75rem)]";

// Short pages still fill the area below the sticky navbar.
export const PAGE_MIN_HEIGHT =
  "min-h-[calc(100dvh-6.75rem)] sm:min-h-[calc(100dvh-5.75rem)]";

// Pages with internally-scrolling panes (messages) need a fixed height rather
// than a minimum, so the panes — and not the document — are the scrollers.
export const STICKY_HEIGHT =
  "h-[calc(100dvh-6.75rem)] sm:h-[calc(100dvh-5.75rem)]";
