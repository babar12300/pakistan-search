import { cn } from "@/lib/utils";

export function CrescentMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={cn("text-primary", className)}>
      <defs>
        <mask id="pk-crescent">
          <rect width="48" height="48" fill="white" />
          <circle cx="29" cy="20" r="15" fill="black" />
        </mask>
      </defs>
      <circle cx="22" cy="26" r="18" fill="currentColor" mask="url(#pk-crescent)" />
      <polygon
        fill="currentColor"
        transform="translate(34 15) rotate(-20) scale(0.55)"
        points="0,-10 2.35,-3.24 9.51,-3.09 3.8,1.24 5.88,8.09 0,4 -5.88,8.09 -3.8,1.24 -9.51,-3.09 -2.35,-3.24"
      />
    </svg>
  );
}

export function Logo({ size = "lg" }: { size?: "lg" | "sm" }) {
  const big = size === "lg";
  return (
    <span dir="ltr" className="inline-flex items-center gap-2 font-display">
      <CrescentMark className={big ? "h-12 w-12 sm:h-16 sm:w-16" : "h-8 w-8"} />
      <span
        className={cn(
          "font-bold tracking-tight text-foreground",
          big ? "text-4xl sm:text-6xl" : "text-2xl",
        )}
      >
        Pakistan<span className="text-accent-strong">.com</span>
      </span>
    </span>
  );
}
