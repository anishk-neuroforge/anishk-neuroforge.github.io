import { ArrowUpRight, Lightbulb, FileText } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const POSTS = [
  {
    tag: "Idea in progress",
    title: "What if a camera could watch the drip so nurses don't have to?",
    blurb: "Exploring how computer vision + low-cost edge devices could automate IV bottle monitoring, estimate fluid levels and alert nurses before they run empty.",
    href: "https://github.com/anishk-neuroforge",
    icon: Lightbulb,
    accent: "bg-hero-gradient text-bone",
  },
  {
    tag: "Case study",
    title: "Document Q&A — building a grounded RAG pipeline",
    blurb: "Chunking strategy, embedding choice and FAISS index tuning that pushed BLEU from 0.41 (keyword search) to 0.81 on a 1K+ PDF corpus.",
    href: "https://anishk-neuroforge.github.io/Document_Q_and_A/index.html",
    icon: FileText,
    accent: "bg-card text-ink border border-border",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="px-4 py-16">
      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Writing</div>
          <h2 className="text-display mt-3 text-5xl md:text-7xl">blog/</h2>
        </ScrollReveal>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {POSTS.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.08}>
              <a href={p.href} target="_blank" rel="noreferrer" className={`group block rounded-3xl p-7 min-h-[280px] flex flex-col ${p.accent} transition`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">{p.tag}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p.icon className="mt-6 h-8 w-8" strokeWidth={1.5} />
                <h3 className="text-display mt-4 text-2xl md:text-3xl">{p.title}</h3>
                <p className="mt-3 text-sm opacity-80 leading-relaxed">{p.blurb}</p>
                <div className="mt-auto pt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-80">
                  Read article →
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
