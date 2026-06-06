import { Cpu, FlaskConical, Server, Database, Package } from "lucide-react";

const ITEMS = [
  { icon: Cpu, k: "CUDA", v: "kernel tuning · GPU optimisation" },
  { icon: FlaskConical, k: "RAGAS", v: "RAG evaluation metrics" },
  { icon: Server, k: "vLLM", v: "high-throughput LLM serving" },
  { icon: Database, k: "Chroma", v: "vector DB · semantic search" },
  { icon: Package, k: "GGUF", v: "quantised model deployment" },
];

export function LearningSection() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Now</div>
        <h2 className="text-display mt-3 text-4xl md:text-6xl">
          <span className="text-muted-foreground">$ ls</span> currently_learning/
        </h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {ITEMS.map(i => (
            <div key={i.k} className="group rounded-2xl border border-border bg-card p-5 hover:border-electric/40 hover:-translate-y-0.5 transition">
              <i.icon className="h-6 w-6 text-electric" strokeWidth={1.5} />
              <div className="mt-4 font-display text-2xl">{i.k}</div>
              <div className="mt-1 text-xs font-mono text-muted-foreground">{i.v}</div>
              <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-electric/70 group-hover:w-full transition-all duration-700" style={{ width: `${40 + Math.random() * 40}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
