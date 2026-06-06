import { Mail, Github, Linkedin, FileDown, MapPin, GraduationCap, CheckCircle2 } from "lucide-react";

export function RecruiterSummary() {
  return (
    <main className="min-h-screen bg-bone text-ink py-10 px-4 print:py-0">
      <article className="mx-auto max-w-[860px] bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.2)] rounded-3xl p-8 md:p-12 print:shadow-none print:rounded-none">
        {/* Header */}
        <header className="flex items-start justify-between gap-6 flex-wrap border-b border-border pb-6">
          <div>
            <h1 className="font-display text-5xl md:text-6xl">ANISH KUMAR</h1>
            <p className="mt-2 text-sm text-muted-foreground font-mono uppercase tracking-widest">ML Engineer · Production AI Systems</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-mono text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Punjab, India · Remote</span>
              <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" /> BTech AI/ML · LPU · 2027</span>
              <a href="mailto:anish00kumar11@gmail.com" className="inline-flex items-center gap-1.5 hover:text-ink"><Mail className="h-3.5 w-3.5" /> anish00kumar11@gmail.com</a>
              <a href="https://github.com/anishk-neuroforge" className="inline-flex items-center gap-1.5 hover:text-ink"><Github className="h-3.5 w-3.5" /> anishk-neuroforge</a>
              <a href="https://www.linkedin.com/in/anishkumar25/" className="inline-flex items-center gap-1.5 hover:text-ink"><Linkedin className="h-3.5 w-3.5" /> anishkumar25</a>
            </div>
          </div>
          <a href="https://chief-anishkumar-ai.me/Anish_Kumar_Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink text-bone px-4 py-2 text-xs font-semibold print:hidden">
            <FileDown className="h-4 w-4" /> Download PDF resume
          </a>
        </header>

        {/* Summary */}
        <Section title="Summary">
          <p className="text-sm leading-relaxed text-foreground/85">
            Final-year BTech AI/ML student building production-ready ML systems end-to-end — data pipelines, training,
            inference optimisation, API serving and monitoring. Shipped 6+ Dockerised systems across computer vision,
            NLP and predictive modelling. Open to ML / AI Engineer roles and internships for 2026.
          </p>
        </Section>

        {/* KPIs */}
        <Section title="Highlights">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ["15+", "Projects shipped"],
              ["<80ms", "Inference latency"],
              ["500+", "RPS served"],
              ["18%", "Eval acceptance lift"],
            ].map(([k, v]) => (
              <div key={v} className="rounded-xl border border-border p-3">
                <div className="font-display text-2xl">{k}</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-1">{v}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <Item period="2024 — 2025" role="AI Training & Evaluation Specialist" org="Outlier AI">
            RLHF-style evaluation of 500+ LLM responses for safety, reasoning and code quality.
            Structured feedback improved prompt acceptance rate by 18%.
          </Item>
          <Item period="2023 — Present" role="Independent ML Engineer" org="Self-directed / Open source">
            Shipped 6+ end-to-end ML systems across CV, NLP and predictive modelling — Dockerised, API-served, benchmarked.
          </Item>
        </Section>

        {/* Projects */}
        <Section title="Selected Projects">
          <Item period="CV" role="Real-Time Object Detection" org="YOLOv8 · TensorRT · FastAPI">
            Custom 12K-image dataset, served via FastAPI with TensorRT acceleration. Targeting 45 FPS live inference.
          </Item>
          <Item period="NLP" role="Document Q&A — RAG" org="LangChain · FAISS · HuggingFace">
            Multi-document RAG with semantic chunking. BLEU 0.81 vs 0.41 keyword baseline on a 1K+ PDF corpus.
          </Item>
          <Item period="ML" role="Fraud Detection — XGBoost" org="SMOTE · MLflow">
            2M credit-card records, cost-sensitive XGBoost with SMOTE; recall 99.2%, F1 0.94, MLflow-tracked.
          </Item>
        </Section>

        {/* Stack */}
        <Section title="Stack">
          <div className="flex flex-wrap gap-1.5">
            {["PyTorch","TensorFlow","YOLO","FaceNet","OpenCV","BERT","LangChain","RAG","FastAPI","ONNX","TensorRT","Docker","MLflow","FAISS","XGBoost","SQL","Pandas"].map(s => (
              <span key={s} className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-muted text-foreground/80">{s}</span>
            ))}
          </div>
        </Section>

        {/* Education + Certs */}
        <div className="grid md:grid-cols-2 gap-6">
          <Section title="Education">
            <Item period="2023 — 2027" role="BTech — AI & Machine Learning" org="Lovely Professional University">
              Deep Learning, CV, NLP, Statistics, MLOps.
            </Item>
          </Section>
          <Section title="Certifications">
            <ul className="text-sm space-y-1.5">
              {[
                "Deep Learning Specialization — DeepLearning.AI (in progress)",
                "MLOps Fundamentals — Google Cloud (in progress)",
                "ML by Andrew Ng — Coursera (completed)",
                "NLP with Transformers — HuggingFace (completed)",
                "Fundamentals of Deep Learning — NVIDIA DLI (completed)",
              ].map(c => (
                <li key={c} className="flex items-start gap-2 text-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-electric mt-0.5 shrink-0" /> {c}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <footer className="mt-8 pt-6 border-t border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex justify-between flex-wrap gap-2">
          <span>Recruiter view · one-page summary</span>
          <span>anishkumar.me</span>
        </footer>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Item({ period, role, org, children }: { period: string; role: string; org: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-3 py-2.5 border-b border-border/60 last:border-0">
      <div className="col-span-3 text-[11px] font-mono uppercase tracking-widest text-muted-foreground pt-0.5">{period}</div>
      <div className="col-span-9">
        <div className="font-display text-lg leading-tight">{role}</div>
        <div className="text-[11px] font-mono text-muted-foreground">[ {org} ]</div>
        <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
