import { Quote } from "lucide-react";

export function PullQuote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <figure className="relative my-10 rounded-3xl bg-card-dark text-bone p-8 md:p-12 border-l-4 border-lemon overflow-hidden">
      <Quote className="absolute -top-2 -left-2 h-32 w-32 text-white/5" strokeWidth={1} />
      <blockquote className="relative font-display text-3xl md:text-5xl leading-[1.05] tracking-tight">
        “{text}”
      </blockquote>
      {attribution && (
        <figcaption className="relative mt-6 text-xs font-mono uppercase tracking-[0.3em] text-cyan-glow">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}
