"use client";

import { useState } from "react";
import { z } from "zod";
import { Send } from "lucide-react";

const Schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "Message too short").max(1000),
});

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = Schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    const { name, email, message } = parsed.data;
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    window.location.href = `mailto:anish00kumar11@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl bg-white/5 backdrop-blur border border-white/15 p-6 md:p-8 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Name" name="name" error={errors.name} />
        <Field label="Email" name="email" type="email" error={errors.email} />
      </div>
      <Field label="Message" name="message" textarea error={errors.message} />
      <button type="submit" className="group inline-flex items-center gap-2 rounded-full bg-lemon px-6 py-3 text-sm font-bold text-ink">
        {sent ? "Opening mail client…" : "Send message"} <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", textarea = false, error }: { label: string; name: string; type?: string; textarea?: boolean; error?: string }) {
  const cls = `w-full rounded-xl bg-ink/40 border ${error ? "border-destructive" : "border-white/15"} px-4 py-3 text-bone placeholder:text-bone/40 focus:outline-none focus:border-cyan-glow text-sm`;
  return (
    <label className="block">
      <span className="block text-[10px] font-mono uppercase tracking-widest text-bone/70 mb-1.5">{label}</span>
      {textarea
        ? <textarea name={name} rows={5} maxLength={1000} className={cls} placeholder={`Your ${label.toLowerCase()}…`} />
        : <input name={name} type={type} maxLength={255} className={cls} placeholder={`Your ${label.toLowerCase()}…`} />}
      {error && <span className="block mt-1 text-[11px] text-destructive font-mono">{error}</span>}
    </label>
  );
}
