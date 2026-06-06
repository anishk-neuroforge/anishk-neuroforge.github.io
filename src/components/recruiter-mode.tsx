"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Briefcase, Code2 } from "lucide-react";

type Ctx = { recruiter: boolean; toggle: () => void };
const RecruiterCtx = createContext<Ctx>({ recruiter: false, toggle: () => {} });

export function RecruiterProvider({ children }: { children: ReactNode }) {
  const [recruiter, setRecruiter] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.mode = recruiter ? "recruiter" : "builder";
  }, [recruiter]);
  return (
    <RecruiterCtx.Provider value={{ recruiter, toggle: () => setRecruiter(v => !v) }}>
      {children}
    </RecruiterCtx.Provider>
  );
}

export const useRecruiter = () => useContext(RecruiterCtx);

export function RecruiterToggle() {
  const { recruiter, toggle } = useRecruiter();
  return (
    <button
      onClick={toggle}
      title={recruiter ? "Switch to builder view" : "Switch to recruiter view"}
      className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink/80 backdrop-blur-xl px-3 py-2 text-xs font-mono uppercase tracking-widest text-bone hover:bg-ink transition"
    >
      {recruiter ? <Briefcase className="h-3.5 w-3.5 text-lemon" /> : <Code2 className="h-3.5 w-3.5 text-cyan-glow" />}
      {recruiter ? "Recruiter" : "Builder"}
    </button>
  );
}
