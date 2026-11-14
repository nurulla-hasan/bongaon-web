export function LeafSprig({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 160 240"
      className={className}
      fill="currentColor"
    >
      <path
        d="M20 228C52 176 76 128 112 84"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path d="M44 196c-22-2-32-16-32-34 20 2 32 14 32 34Z" />
      <path d="M62 168c18-10 22-26 14-42-16 8-22 24-14 42Z" />
      <path d="M80 138c-20-4-28-18-26-36 18 4 28 18 26 36Z" />
      <path d="M100 108c16-10 20-26 12-42-16 8-20 24-12 42Z" />
    </svg>
  );
}

export function GrassTuft({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 140 100"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M8 98C24 68 28 38 22 4"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M32 98C48 70 60 42 64 10"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M56 98C70 72 86 52 106 40"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M78 98C88 78 104 66 126 60"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M98 98C106 86 118 80 134 78"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
