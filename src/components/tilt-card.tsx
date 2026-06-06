"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Tilt + spotlight wrapper. Pass-through onClick / href via children link.
 */
export function TiltCard({
  children,
  className,
  spotlightColor = "rgba(180, 220, 255, 0.18)",
}: { children: ReactNode; className?: string; spotlightColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -6;
    const ry = ((x / r.width) - 0.5) * 6;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--so", `1`);
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--so", `0`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("group relative [perspective:1000px]", className)}
      style={{
        // @ts-expect-error css vars
        "--so": 0,
      }}
    >
      <div
        className="relative h-full w-full transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: "rotateX(var(--rx,0)) rotateY(var(--ry,0))", transformStyle: "preserve-3d" }}
      >
        {children}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: "var(--so, 0)",
            background: `radial-gradient(260px circle at var(--mx) var(--my), ${spotlightColor}, transparent 60%)`,
            mixBlendMode: "plus-lighter",
          }}
        />
      </div>
    </div>
  );
}
