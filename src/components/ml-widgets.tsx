"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ---------- Training Terminal ---------- */
const LOGS_SEED = [
  "$ python train.py --model yolov8x --epochs 50",
  "[init] cuda:0 · RTX 4090 · 24GB",
  "[data] loaded 12,480 imgs / 1,392 val",
];
function gen(epoch: number) {
  const loss = (0.92 - epoch * 0.011 + Math.random() * 0.02).toFixed(4);
  const acc = (0.61 + epoch * 0.006 + Math.random() * 0.01).toFixed(4);
  const lr = (3e-4 * Math.pow(0.97, epoch)).toExponential(2);
  return `epoch ${String(epoch).padStart(2, "0")}/50  loss=${loss}  val_acc=${acc}  lr=${lr}`;
}
export function TrainingTerminal({ className }: { className?: string }) {
  const [lines, setLines] = useState<string[]>(LOGS_SEED);
  const [epoch, setEpoch] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setLines((l) => {
        const next = [...l, gen(epoch)];
        return next.slice(-12);
      });
      setEpoch((e) => (e >= 50 ? 1 : e + 1));
    }, 900);
    return () => clearInterval(t);
  }, [epoch]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  return (
    <div className={cn("rounded-2xl border border-white/10 bg-ink text-bone overflow-hidden", className)}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-[11px] uppercase tracking-widest text-bone/60">~/anish/training.log</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-cyan-glow">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow pulse-dot" /> LIVE
        </span>
      </div>
      <div ref={scrollRef} className="font-mono text-[11px] leading-relaxed p-4 h-[220px] overflow-hidden">
        {lines.map((l, i) => (
          <div key={i} className={cn(
            "whitespace-pre",
            l.startsWith("$") && "text-cyan-glow",
            l.startsWith("[") && "text-lemon",
            !l.startsWith("$") && !l.startsWith("[") && "text-bone/85",
          )}>{l}</div>
        ))}
        <span className="inline-block h-3 w-1.5 bg-cyan-glow animate-pulse align-middle" />
      </div>
    </div>
  );
}

/* ---------- Loss Curve Sparkline ---------- */
export function LossCurve({ className }: { className?: string }) {
  const points = Array.from({ length: 40 }, (_, i) => {
    const x = i / 39;
    const y = 0.92 * Math.exp(-3.2 * x) + 0.06 + (Math.sin(i * 0.9) * 0.01);
    return [x * 320, 80 - y * 70] as const;
  });
  const path = points.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${path} L320,80 L0,80 Z`;
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">train_loss.svg</div>
        <div className="font-mono text-[10px] text-electric-deep">↓ 0.073</div>
      </div>
      <svg viewBox="0 0 320 90" className="mt-2 w-full h-20">
        <defs>
          <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--electric)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--electric)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="0" x2="320" y1={i * 25 + 5} y2={i * 25 + 5} stroke="var(--border)" strokeDasharray="2 4" />
        ))}
        <path d={area} fill="url(#lg)" />
        <path d={path} stroke="var(--electric)" strokeWidth="1.6" fill="none" />
      </svg>
    </div>
  );
}

/* ---------- Confusion Matrix ---------- */
export function ConfusionMatrix({ className }: { className?: string }) {
  const m = [
    [0.94, 0.02, 0.02, 0.02],
    [0.03, 0.91, 0.04, 0.02],
    [0.02, 0.05, 0.89, 0.04],
    [0.01, 0.02, 0.05, 0.92],
  ];
  const labels = ["cat", "dog", "bird", "car"];
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4", className)}>
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">confusion_matrix</div>
        <div className="font-mono text-[10px] text-electric-deep">acc 91.5%</div>
      </div>
      <div className="mt-3 grid grid-cols-[auto_repeat(4,1fr)] gap-1 text-[10px] font-mono">
        <div />
        {labels.map((l) => <div key={l} className="text-center text-muted-foreground">{l}</div>)}
        {m.map((row, ri) => (
          <div key={`row-${ri}`} className="contents">
            <div className="text-muted-foreground self-center pr-1 text-right">{labels[ri]}</div>
            {row.map((v, ci) => (
              <div
                key={`${ri}-${ci}`}
                className="aspect-square rounded-md grid place-items-center text-[9px]"
                style={{
                  background: `color-mix(in oklab, var(--electric) ${Math.round(v * 90)}%, transparent)`,
                  color: v > 0.5 ? "var(--bone)" : "var(--ink)",
                }}
              >
                {(v * 100).toFixed(0)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- GPU HUD Chip ---------- */
export function GpuHud({ className }: { className?: string }) {
  const [temp, setTemp] = useState(62);
  const [vram, setVram] = useState(18.4);
  useEffect(() => {
    const t = setInterval(() => {
      setTemp((v) => Math.max(55, Math.min(78, v + (Math.random() - 0.5) * 4)));
      setVram((v) => Math.max(14, Math.min(23.8, v + (Math.random() - 0.5) * 0.6)));
    }, 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={cn(
      "hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink/70 backdrop-blur px-3 py-1.5 text-bone",
      className,
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow pulse-dot" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-bone/60">GPU</span>
      <span className="font-mono text-[10px] text-cyan-glow">{temp.toFixed(0)}°C</span>
      <span className="text-bone/30">·</span>
      <span className="font-mono text-[10px] text-lemon">{vram.toFixed(1)}/24GB</span>
    </div>
  );
}
