import { Award } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const CERTS = [
  { org: "DeepLearning.AI", name: "Deep Learning Specialization", status: "In progress", year: "2026" },
  { org: "Google Cloud", name: "MLOps Fundamentals", status: "In progress", year: "2026" },
  { org: "TensorFlow", name: "Developer Certificate", status: "In progress", year: "2026" },
  { org: "Coursera", name: "Machine Learning by Andrew Ng", status: "Completed", year: "2024" },
  { org: "HuggingFace", name: "NLP with Transformers", status: "Completed", year: "2025" },
  { org: "NVIDIA DLI", name: "Fundamentals of Deep Learning", status: "Completed", year: "2025" },
];

export function Certifications() {
  return (
    <section id="certifications" className="px-4 py-16">
      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Credentials</div>
          <h2 className="text-display mt-3 text-5xl md:text-7xl">Certifications.</h2>
        </ScrollReveal>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CERTS.map((c, i) => (
            <ScrollReveal key={c.name} delay={(i % 3) * 0.07}>
              <div className="rounded-2xl border border-border bg-card p-5 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <Award className="h-6 w-6 text-electric" strokeWidth={1.5} />
                  <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full ${c.status === "Completed" ? "bg-electric/10 text-electric-deep" : "bg-muted text-muted-foreground"}`}>
                    {c.status}
                  </span>
                </div>
                <div className="mt-4 font-display text-xl leading-tight">{c.name}</div>
                <div className="mt-auto pt-4 flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  <span>{c.org}</span><span>{c.year}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
