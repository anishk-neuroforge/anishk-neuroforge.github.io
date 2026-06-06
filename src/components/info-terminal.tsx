"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Seg = { t: string; c?: string };
type Line = { prompt?: "comment" | "in" | "out"; segs: Seg[]; pause?: number };

const SCRIPT: Line[] = [
  { prompt: "comment", segs: [{ t: "# Initializing ML Engineer v3.0..." }], pause: 300 },
  { prompt: "in", segs: [{ t: "from ml_engineer import " }, { t: "MLEngineer", c: "text-cyan-glow" }] },
  { prompt: "in", segs: [{ t: "model = " }, { t: "MLEngineer", c: "text-cyan-glow" }, { t: "(" }] },
  { segs: [{ t: "    name=" }, { t: "\"Anish Kumar\"", c: "text-lemon" }, { t: "," }] },
  { segs: [{ t: "    role=" }, { t: "\"ML Engineer (Final Year)\"", c: "text-orange-400" }, { t: "," }] },
  { segs: [{ t: "    stack=" }, { t: "[", c: "text-bone" }, { t: "\"PyTorch\"", c: "text-lemon" }, { t: "," }, { t: "\"TensorFlow\"", c: "text-lemon" }, { t: "," }, { t: "\"FastAPI\"", c: "text-lemon" }, { t: "," }, { t: "\"Docker\"", c: "text-lemon" }, { t: "]," }] },
  { segs: [{ t: "    focus=" }, { t: "\"deployment + production ML\"", c: "text-lemon" }] },
  { segs: [{ t: ")" }] },
  { prompt: "in", segs: [{ t: "model." }, { t: "deploy", c: "text-cyan-glow" }, { t: "(production=" }, { t: "True", c: "text-orange-400" }, { t: ")" }] },
  { prompt: "out", segs: [{ t: "Status: " }, { t: "PRODUCTION_READY ✓", c: "text-emerald-400" }], pause: 600 },
];

const CHAR_MS = 14;
const LINE_MS = 180;

function Prompt({ kind }: { kind?: Line["prompt"] }) {
  if (kind === "in") return <span className="text-cyan-glow select-none mr-2">&gt;&gt;&gt;</span>;
  if (kind === "out") return <span className="text-emerald-400 select-none mr-2">→</span>;
  return null;
}

export function InfoTerminal({ className }: { className?: string }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [segIdx, setSegIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineIdx >= SCRIPT.length) { setDone(true); return; }
    const line = SCRIPT[lineIdx];
    const seg = line.segs[segIdx];
    if (!seg) {
      const t = setTimeout(() => {
        setLineIdx((i) => i + 1);
        setSegIdx(0);
        setCharIdx(0);
      }, line.pause ?? LINE_MS);
      return () => clearTimeout(t);
    }
    if (charIdx < seg.t.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), CHAR_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setSegIdx((s) => s + 1); setCharIdx(0); }, 10);
    return () => clearTimeout(t);
  }, [lineIdx, segIdx, charIdx]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lineIdx, segIdx, charIdx]);

  // restart loop
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      setLineIdx(0); setSegIdx(0); setCharIdx(0); setDone(false);
    }, 4200);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <div className={cn("rounded-2xl border border-white/10 bg-[#0b0f17] text-bone overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]", className)}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="mx-auto font-mono text-[12px] text-bone/55">python3 — ml_engineer.py</span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-glow">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow pulse-dot" /> LIVE
        </span>
      </div>
      <div ref={scrollRef} className="font-mono text-[13px] leading-7 p-6 min-h-[360px] max-h-[420px] overflow-hidden">
        {SCRIPT.slice(0, lineIdx + 1).map((line, li) => {
          const isCurrent = li === lineIdx;
          return (
            <div key={li} className={cn("whitespace-pre", line.prompt === "comment" && "text-bone/40 italic")}>
              <Prompt kind={line.prompt} />
              {line.segs.map((seg, si) => {
                if (!isCurrent || si < segIdx) return <span key={si} className={seg.c}>{seg.t}</span>;
                if (si === segIdx) return <span key={si} className={seg.c}>{seg.t.slice(0, charIdx)}</span>;
                return null;
              })}
              {isCurrent && <span className="inline-block h-4 w-2 bg-cyan-glow ml-0.5 align-middle animate-pulse" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
