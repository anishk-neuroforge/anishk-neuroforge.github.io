"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavItem { label: string; href: string }

interface Props {
  items: NavItem[];
  className?: string;
  defaultActiveIndex?: number;
}

export function SpotlightNavbar({ items, className, defaultActiveIndex = 0 }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const spotlightX = useRef(0);
  const ambienceX = useRef(0);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onMove = (e: MouseEvent) => {
      const r = nav.getBoundingClientRect();
      const x = e.clientX - r.left;
      spotlightX.current = x;
      nav.style.setProperty("--spotlight-x", `${x}px`);
      nav.style.setProperty("--spotlight-opacity", `1`);
    };
    const onLeave = () => {
      nav.style.setProperty("--spotlight-opacity", `0`);
    };
    nav.addEventListener("mousemove", onMove);
    nav.addEventListener("mouseleave", onLeave);
    return () => {
      nav.removeEventListener("mousemove", onMove);
      nav.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const item = nav.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    if (!item) return;
    const navRect = nav.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const targetX = itemRect.left - navRect.left + itemRect.width / 2;
    animate(ambienceX.current, targetX, {
      type: "spring", stiffness: 220, damping: 22,
      onUpdate: (v) => {
        ambienceX.current = v;
        nav.style.setProperty("--ambience-x", `${v}px`);
        nav.style.setProperty("--ambience-w", `${itemRect.width}px`);
      },
    });
  }, [activeIndex]);

  return (
    <div
      ref={navRef}
      className={cn(
        "relative isolate flex items-center gap-1 rounded-full",
        "border border-white/10 bg-ink/80 backdrop-blur-xl px-2 py-1.5",
        "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)]",
        className,
      )}
      style={{
        // @ts-expect-error css vars
        "--spotlight-x": "50%",
        "--ambience-x": "50%",
        "--ambience-w": "60px",
        "--spotlight-opacity": "0",
      }}
    >
      {/* ambience halo on active */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 rounded-full transition-[width] duration-300"
        style={{
          left: "var(--ambience-x)",
          width: "var(--ambience-w)",
          background: "linear-gradient(90deg, color-mix(in oklab, var(--cyan-glow) 18%, transparent), color-mix(in oklab, var(--electric) 22%, transparent))",
          filter: "blur(10px)",
        }}
      />
      {/* moving spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
        style={{
          opacity: "var(--spotlight-opacity)",
          background:
            "radial-gradient(120px circle at var(--spotlight-x) 50%, color-mix(in oklab, var(--cyan-glow) 22%, transparent), transparent 70%)",
        }}
      />
      {items.map((item, idx) => (
        <a
          key={item.href}
          data-index={idx}
          href={item.href}
          onClick={() => setActiveIndex(idx)}
          className={cn(
            "relative z-10 px-4 py-1.5 text-sm rounded-full transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow/40",
            activeIndex === idx ? "text-bone" : "text-bone/55 hover:text-bone",
          )}
        >
          {item.label}
        </a>
      ))}
      {/* track underline */}
      <div aria-hidden className="pointer-events-none absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}
