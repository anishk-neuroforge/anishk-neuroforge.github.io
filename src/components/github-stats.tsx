"use client";

import { useEffect, useState } from "react";
import { Github, Star, GitFork, Users, BookOpen } from "lucide-react";

const USER = "anishk-neuroforge";

type Stats = { repos: number; stars: number; followers: number; following: number };

export function GitHubStats() {
  const [s, setS] = useState<Stats | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let cancel = false;
    async function run() {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`).then(x => x.json()),
          fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`).then(x => x.json()),
        ]);
        if (cancel) return;
        const stars = Array.isArray(r) ? r.reduce((a: number, b: { stargazers_count?: number }) => a + (b.stargazers_count || 0), 0) : 0;
        setS({
          repos: u.public_repos ?? (Array.isArray(r) ? r.length : 0),
          stars,
          followers: u.followers ?? 0,
          following: u.following ?? 0,
        });
      } catch {
        if (!cancel) setErr(true);
      }
    }
    run();
    return () => { cancel = true; };
  }, []);

  const items = [
    { icon: BookOpen, k: s?.repos ?? "—", v: "Public repos" },
    { icon: Star, k: s?.stars ?? "—", v: "Total stars" },
    { icon: Users, k: s?.followers ?? "—", v: "Followers" },
    { icon: GitFork, k: s?.following ?? "—", v: "Following" },
  ];

  return (
    <div className="rounded-[2rem] bg-ink text-bone p-6 md:p-8 border border-white/10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Github className="h-6 w-6 text-cyan-glow" />
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-glow">git remote -v</div>
            <a href={`https://github.com/${USER}`} target="_blank" rel="noreferrer" className="font-display text-2xl hover:underline">
              github.com/{USER}
            </a>
          </div>
        </div>
        <a
          href={`https://github.com/${USER}`}
          target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-lemon px-4 py-2 text-xs font-bold text-ink"
        >
          Follow on GitHub
        </a>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((i) => (
          <div key={i.v} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <i.icon className="h-4 w-4 text-cyan-glow" strokeWidth={1.5} />
            <div className="mt-2 font-display text-3xl">{i.k}</div>
            <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-bone/60">{i.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <img
          alt="GitHub contribution graph"
          className="w-full rounded-2xl border border-white/10"
          src={`https://ghchart.rshah.org/4b9aff/${USER}`}
          loading="lazy"
        />
        {err && <div className="mt-2 text-[10px] font-mono text-bone/50">Live stats unavailable · graph above is cached.</div>}
      </div>
    </div>
  );
}
