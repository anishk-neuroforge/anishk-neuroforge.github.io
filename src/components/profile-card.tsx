import { MapPin, GraduationCap, Calendar } from "lucide-react";

export function ProfileCard() {
  return (
    <div className="rounded-[2rem] bg-card-dark text-bone p-6 border border-white/10 flex flex-col h-full">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-lemon text-ink font-display text-3xl">
            AK
          </div>
          <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-electric ring-2 ring-ink">
            <span className="h-2 w-2 rounded-full bg-bone pulse-dot" />
          </span>
        </div>
        <div>
          <div className="font-display text-2xl">Anish Kumar</div>
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-glow mt-1">ML Engineer · Open to work</div>
        </div>
      </div>
      <div className="mt-6 space-y-3 text-sm">
        <Row icon={MapPin} label="Punjab, India · Remote / Relocate" />
        <Row icon={GraduationCap} label="BTech AI/ML — LPU" />
        <Row icon={Calendar} label="Graduating 2027 · 2026 Intern roles open" />
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-bone/70">
        <span className="text-lemon">OPEN_TO_WORK</span> = <span className="text-cyan-glow">True</span>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <div className="flex items-center gap-3 text-bone/85">
      <Icon className="h-4 w-4 text-cyan-glow" strokeWidth={1.5} />
      <span>{label}</span>
    </div>
  );
}
