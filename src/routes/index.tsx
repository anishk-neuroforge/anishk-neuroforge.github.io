import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, FileDown, Sparkles, Cpu, Box, Database, Zap, Eye, MessageSquare, BarChart3 } from "lucide-react";
import { SplashScreen } from "@/components/splash-screen";
import { SpotlightNavbar } from "@/components/spotlight-navbar";
import { GpuHud } from "@/components/ml-widgets";
import { InfoTerminal } from "@/components/info-terminal";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TiltCard } from "@/components/tilt-card";
import { ScrambleText } from "@/components/scramble-text";
import { RecruiterProvider, RecruiterToggle, useRecruiter } from "@/components/recruiter-mode";
import { RecruiterSummary } from "@/components/recruiter-summary";
import { ProfileCard } from "@/components/profile-card";
import { GitHubStats } from "@/components/github-stats";
import { LearningSection } from "@/components/learning-section";
import { BlogSection } from "@/components/blog-section";
import { Certifications } from "@/components/certifications";
import { ContactForm } from "@/components/contact-form";
import { PullQuote } from "@/components/pull-quote";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anish Kumar — ML Engineer / Builds production AI" },
      { name: "description", content: "BTech AI/ML final-year student building production-ready ML systems. Computer vision, NLP, RAG, FastAPI, Docker." },
      { property: "og:title", content: "Anish Kumar — ML Engineer" },
      { property: "og:description", content: "Production ML systems. Computer vision, NLP, RAG pipelines." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  component: HomeRoot,
});

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function HomeRoot() {
  return (
    <RecruiterProvider>
      <ModeSwitcher />
    </RecruiterProvider>
  );
}

function ModeSwitcher() {
  const { recruiter } = useRecruiter();
  if (recruiter) {
    return (
      <div className="min-h-screen bg-background">
        <FloatingToggle />
        <RecruiterSummary />
      </div>
    );
  }
  return <Home />;
}

function FloatingToggle() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <RecruiterToggle />
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SplashScreen />
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Apps />
      <BlogSection />
      <Stack />
      <LearningSection />
      <About />
      <Experience />
      <Certifications />
      <GitHubSection />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(96%,1280px)]">
      <div className="flex items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2 rounded-full border border-white/10 bg-ink/80 backdrop-blur-xl px-3 py-2 text-bone font-display text-sm uppercase tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-lemon text-ink text-[11px]">AK</span>
          Anish<span className="text-bone/50">/kumar</span>
        </a>
        <SpotlightNavbar items={NAV} className="hidden md:flex" />
        <div className="flex items-center gap-2">
          <RecruiterToggle />
          <GpuHud />
          <a href="#contact" className="group inline-flex items-center gap-1.5 rounded-full bg-lemon px-4 py-2 text-sm font-semibold text-ink hover:scale-[1.02] transition">
            Hire me <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-28 pb-10 px-4">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2.5rem] bg-hero-gradient text-bone p-6 md:p-10 lg:p-14 min-h-[640px] flex flex-col">
        <div className="pointer-events-none absolute -right-40 -bottom-40 h-[600px] w-[600px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-[400px] w-[400px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute right-10 bottom-10 h-[200px] w-[200px] rounded-full border border-white/15" />

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
          <span className="h-2 w-2 rounded-full bg-lemon pulse-dot" />
          Open to ML / AI roles · 2026
        </div>

        <div className="mt-auto pt-16">
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-cyan-glow">
            python3 — ml_engineer.py
          </p>
          <h1 className="text-display mt-4 text-[18vw] md:text-[14vw] lg:text-[11rem] xl:text-[13rem] font-black text-bone">
            <ScrambleText text="ANISH" duration={900} /><br />
            <ScrambleText text="KUMAR" duration={1300} />
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-lemon px-6 py-3 text-sm font-bold text-ink">
              View projects <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </a>
            <a href="https://chief-anishkumar-ai.me/Anish_Kumar_Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-bone hover:bg-white/10 transition">
              <FileDown className="h-4 w-4" /> Resume
            </a>
            <span className="ml-auto hidden lg:block text-right text-xs font-mono uppercase tracking-widest text-bone/70 max-w-xs">
              BTech AI/ML — Final Year<br />
              Lovely Professional University
            </span>
          </div>
        </div>
      </div>

      {/* ML info terminal */}
      <div className="mx-auto max-w-[920px] mt-8 px-2">
        <ScrollReveal><InfoTerminal /></ScrollReveal>
      </div>
    </section>
  );
}

const TICKERS = [
  "Production ML", "Computer Vision", "RAG Pipelines", "FastAPI + Docker", "MLflow", "PyTorch", "vLLM", "Quantization", "TensorRT", "Edge Inference",
];
function Marquee() {
  const items = [...TICKERS, ...TICKERS];
  const [paused, setPaused] = useState(false);
  const [fast, setFast] = useState(false);
  return (
    <section
      className="border-y border-border bg-ink text-bone overflow-hidden cursor-pointer select-none"
      onMouseEnter={() => setFast(true)}
      onMouseLeave={() => setFast(false)}
      onClick={() => setPaused((p) => !p)}
      style={{
        // @ts-expect-error css vars
        "--marquee-duration": fast ? "10s" : "30s",
        "--marquee-play": paused ? "paused" : "running",
      }}
      title={paused ? "click to resume" : "click to pause"}
    >
      <div className="flex marquee-track gap-12 py-5 font-display uppercase text-2xl whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="text-electric">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { k: "3+", v: "Years building" },
    { k: "15+", v: "Projects shipped" },
    { k: "<80ms", v: "Inference latency" },
    { k: "8+", v: "Tech stack depth" },
  ];
  return (
    <section id="about" className="px-4 py-16">
      <div className="mx-auto max-w-[1280px] grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <ScrollReveal key={s.v} delay={i * 0.07}>
            <div className="rounded-3xl bg-card p-6 border border-border">
              <div className="font-display text-5xl md:text-6xl">{s.k}</div>
              <div className="mt-2 text-sm text-muted-foreground font-mono uppercase tracking-wider">{s.v}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

type Project = {
  category: string;
  title: string;
  blurb: string;
  metrics: { k: string; v: string }[];
  stack: string[];
  href: string;
  accent: "blue" | "dark" | "lemon" | "cyan";
  icon: typeof Eye;
};

const PROJECTS: Project[] = [
  {
    category: "Computer Vision",
    title: "Real-Time Object Detection",
    blurb: "YOLOv8 on a custom 12K-image dataset, served via FastAPI with TensorRT acceleration. Live webcam demo.",
    metrics: [{ k: "45", v: "Target FPS" }, { k: "12K", v: "Images" }, { k: "WIP", v: "Status" }],
    stack: ["YOLOv8", "PyTorch", "TensorRT", "FastAPI", "Docker"],
    href: "https://github.com/anishk-neuroforge/real-time-object-detection",
    accent: "blue",
    icon: Eye,
  },
  {
    category: "NLP / LLM",
    title: "BERT Sentiment Classifier",
    blurb: "Fine-tuned BERT for 5-class sentiment. Production REST API handling 500+ RPS, fully Dockerised.",
    metrics: [{ k: "91%", v: "Accuracy" }, { k: "500+", v: "RPS" }, { k: "5", v: "Classes" }],
    stack: ["Transformers", "ONNX", "FastAPI", "MLflow"],
    href: "https://github.com/anishk-neuroforge",
    accent: "dark",
    icon: MessageSquare,
  },
  {
    category: "ML Systems",
    title: "Churn Prediction Pipeline",
    blurb: "End-to-end churn predictor with SMOTE, SHAP explainability and a real-time Streamlit dashboard.",
    metrics: [{ k: "87%", v: "Precision" }, { k: "83%", v: "Recall" }, { k: "-18%", v: "Impact" }],
    stack: ["XGBoost", "SMOTE", "SHAP", "Streamlit"],
    href: "https://github.com/anishk-neuroforge",
    accent: "lemon",
    icon: BarChart3,
  },
  {
    category: "Computer Vision",
    title: "FaceNet Attendance",
    blurb: "FaceNet embeddings + cosine similarity for automated attendance — 200+ users at 80ms latency.",
    metrics: [{ k: "98.4%", v: "Accuracy" }, { k: "80ms", v: "Latency" }, { k: "200+", v: "Users" }],
    stack: ["TensorFlow", "FaceNet", "OpenCV", "SQLite"],
    href: "https://github.com/anishk-neuroforge",
    accent: "cyan",
    icon: Eye,
  },
  {
    category: "NLP / LLM",
    title: "Document Q&A — RAG",
    blurb: "RAG pipeline for multi-document Q&A with FAISS vector search and transformer embeddings.",
    metrics: [{ k: "0.81", v: "BLEU" }, { k: "1K+", v: "Docs" }, { k: "1.2s", v: "Latency" }],
    stack: ["LangChain", "FAISS", "HuggingFace"],
    href: "https://github.com/anishk-neuroforge/Document_Q_and_A",
    accent: "blue",
    icon: Database,
  },
  {
    category: "ML Systems",
    title: "Fraud Detection — XGBoost",
    blurb: "Imbalanced classification on 2M credit card records, SMOTE + cost-sensitive training, tracked in MLflow.",
    metrics: [{ k: "99.2%", v: "Recall" }, { k: "0.94", v: "F1" }, { k: "2M", v: "Records" }],
    stack: ["XGBoost", "SMOTE", "MLflow"],
    href: "https://github.com/anishk-neuroforge",
    accent: "dark",
    icon: Cpu,
  },
];

function Apps() {
  return (
    <section id="work" className="px-4 py-12">
      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal>
          <SectionHeader eyebrow="Model Registry" title="Projects, end to end." />
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <ScrollReveal key={p.title} delay={(i % 3) * 0.08}>
              <ProjectCard p={p} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const Icon = p.icon;
  const variants = {
    blue: "bg-hero-gradient text-bone",
    dark: "bg-card-dark text-bone",
    lemon: "bg-lemon text-ink",
    cyan: "bg-cyan-glow text-ink",
  } as const;
  const isLight = p.accent === "lemon" || p.accent === "cyan";
  const spot = isLight ? "rgba(0,0,0,0.10)" : "rgba(180, 220, 255, 0.22)";
  return (
    <TiltCard className="h-full" spotlightColor={spot}>
      <a href={p.href} target="_blank" rel="noreferrer" className={`relative overflow-hidden rounded-3xl p-6 min-h-[360px] flex flex-col h-full ${variants[p.accent]} transition`}>
        <div className="flex items-start justify-between">
          <span className={`font-mono text-[10px] uppercase tracking-widest ${isLight ? "text-ink/70" : "text-bone/70"}`}>{p.category}</span>
          <span className={`grid h-9 w-9 place-items-center rounded-full ${isLight ? "bg-ink text-bone" : "bg-white/15 text-bone"} transition group-hover:rotate-45`}>
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <Icon className={`mt-6 h-9 w-9 ${isLight ? "text-ink" : "text-bone"}`} strokeWidth={1.5} />
        <h3 className="text-display mt-4 text-3xl">{p.title}</h3>
        <p className={`mt-3 text-sm leading-relaxed ${isLight ? "text-ink/80" : "text-bone/80"}`}>{p.blurb}</p>
        <div className="mt-auto pt-6 grid grid-cols-3 gap-2">
          {p.metrics.map(m => (
            <div key={m.v} className={`rounded-xl px-3 py-2 ${isLight ? "bg-ink/10" : "bg-white/10"}`}>
              <div className="font-display text-xl">{m.k}</div>
              <div className={`text-[10px] font-mono uppercase tracking-wider ${isLight ? "text-ink/60" : "text-bone/60"}`}>{m.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map(s => (
            <span key={s} className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isLight ? "bg-ink/10 text-ink" : "bg-white/10 text-bone"}`}>{s}</span>
          ))}
        </div>
      </a>
    </TiltCard>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</div>
        <h2 className="text-display mt-3 text-5xl md:text-7xl lg:text-8xl max-w-3xl">{title}</h2>
      </div>
    </div>
  );
}

const STACK = [
  { icon: Cpu, label: "PyTorch · TensorFlow", note: "Training & fine-tuning" },
  { icon: Eye, label: "YOLO · FaceNet · OpenCV", note: "Computer vision" },
  { icon: MessageSquare, label: "BERT · LangChain · RAG", note: "NLP & LLMs" },
  { icon: Zap, label: "FastAPI · ONNX · TensorRT", note: "Inference serving" },
  { icon: Box, label: "Docker · MLflow", note: "MLOps & tracking" },
  { icon: Database, label: "FAISS · SQL · Pandas", note: "Data & retrieval" },
];

function Stack() {
  return (
    <section id="stack" className="px-4 py-16">
      <div className="mx-auto max-w-[1280px] rounded-[2.5rem] bg-ink text-bone p-8 md:p-12">
        <SectionHeaderDark eyebrow="The Stack" title="Tools I Actually Ship With." />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STACK.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/10 p-5 hover:bg-white/5 transition">
                <s.icon className="h-7 w-7 text-electric" strokeWidth={1.5} />
                <div className="mt-4 font-display text-xl">{s.label}</div>
                <div className="mt-1 text-xs font-mono uppercase tracking-wider text-bone/60">{s.note}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeaderDark({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-glow">{eyebrow}</div>
      <h2 className="text-display mt-3 text-5xl md:text-7xl text-bone max-w-3xl">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-[1280px] grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2"><ProfileCard /></div>
        <div className="lg:col-span-3 rounded-[2.5rem] bg-card p-8 md:p-12 border border-border">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">About</div>
          <h2 className="text-display mt-3 text-4xl md:text-5xl">I write ML code that survives <span className="text-electric-deep">git push --force.</span></h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            Final-year BTech AI/ML student building production-ready machine learning systems. I don't just train models — I deploy them. My focus is the full ML lifecycle: data pipelines, training, inference optimisation, API serving and monitoring.
          </p>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            Currently building local LLM inference servers with vLLM, quantised model deployment with GGUF, and RAG evaluation pipelines with RAGAS metrics.
          </p>
          <div className="mt-8 rounded-2xl bg-hero-gradient text-bone p-6 flex items-start gap-4">
            <Sparkles className="h-6 w-6 shrink-0 mt-1" />
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-cyan-glow">Currently building</div>
              <ul className="mt-3 space-y-1.5 font-display text-lg">
                <li>→ Quantised Mistral server</li>
                <li>→ RAG eval with RAGAS</li>
                <li>→ Edge inference w/ GGUF</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const EXP = [
  { period: "2024 — 2025", role: "AI Training & Evaluation Specialist", org: "Outlier AI", body: "RLHF-style evaluation of 500+ LLM responses for safety, reasoning and code quality. Improved prompt acceptance rate by 18%." },
  { period: "2023 — Now", role: "Independent ML Engineer", org: "Self-directed / Open source", body: "Shipped 6+ end-to-end ML systems across CV, NLP and predictive modelling — Dockerised, API-served, benchmarked." },
  { period: "2023 — 2027", role: "BTech — Artificial Intelligence & ML", org: "Lovely Professional University", body: "Coursework in Deep Learning, Computer Vision, NLP, Statistics, Data Structures, MLOps." },
];

function Experience() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader eyebrow="Training History" title="Checkpoints." />
        <div className="mt-10 divide-y divide-border border-y border-border">
          {EXP.map(e => (
            <div key={e.role} className="group grid md:grid-cols-12 gap-4 py-8 hover:bg-card transition px-2">
              <div className="md:col-span-2 font-mono text-xs uppercase tracking-widest text-muted-foreground pt-2">{e.period}</div>
              <div className="md:col-span-4">
                <div className="font-display text-2xl">{e.role}</div>
                <div className="text-sm text-muted-foreground mt-1">[ {e.org} ]</div>
              </div>
              <div className="md:col-span-5 text-base text-foreground/80 leading-relaxed">{e.body}</div>
              <div className="md:col-span-1 flex md:justify-end items-start pt-2">
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:rotate-45 group-hover:text-foreground" />
              </div>
            </div>
          ))}
        </div>
        <ScrollReveal>
          <PullQuote
            text="Structured feedback that improved prompt acceptance by 18%."
            attribution="Outlier AI · RLHF Evaluation, 500+ responses"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

function GitHubSection() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal><GitHubStats /></ScrollReveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-4 py-16">
      <div className="mx-auto max-w-[1280px] relative overflow-hidden rounded-[2.5rem] bg-hero-gradient text-bone p-8 md:p-16 min-h-[500px]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full border border-white/10" />

        <div className="grid lg:grid-cols-2 gap-10 relative">
          <div className="flex flex-col">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-glow">Send a message</div>
            <h2 className="text-display mt-4 text-5xl md:text-7xl lg:text-8xl">
              LET'S<br />BUILD.
            </h2>
            <p className="mt-6 max-w-lg text-bone/80">I reply within 24 hours. Open to ML/AI engineering roles, internships and collaborations.</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="mailto:anish00kumar11@gmail.com" className="group inline-flex items-center gap-2 rounded-full bg-lemon px-5 py-2.5 text-sm font-bold text-ink">
                <Mail className="h-4 w-4" /> anish00kumar11@gmail.com <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
              </a>
            </div>

            <div className="mt-auto pt-10 flex flex-wrap gap-3 text-sm font-mono">
              <SocialLink href="https://github.com/anishk-neuroforge" icon={Github} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/anishkumar25/" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="https://leetcode.com/anishk-neuroforge" icon={Cpu} label="LeetCode" />
              <SocialLink href="https://kaggle.com/anishkumar25" icon={BarChart3} label="Kaggle" />
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: typeof Github; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 hover:bg-white/10 transition text-bone">
      <Icon className="h-4 w-4" /> {label}
    </a>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-10">
      <div className="mx-auto max-w-[1280px] flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-border text-xs font-mono uppercase tracking-widest text-muted-foreground">
        <div>© 2026 Anish Kumar · v3.0</div>
        <div>▶ currently_training.py</div>
      </div>
    </footer>
  );
}
