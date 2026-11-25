import { useState, type FormEvent } from "react";
import { addEnquiry, useDB } from "@/lib/store";
import { Icon } from "./Icon";

type F = { name: string; email: string; phone: string; company: string; service: string; message: string };
const empty: F = { name: "", email: "", phone: "", company: "", service: "", message: "" };

export function validate(f: F) {
  const e: Partial<Record<keyof F, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email address";
  if (!/^[+\d][\d\s-]{7,15}$/.test(f.phone.trim())) e.phone = "Please enter a valid phone number";
  if (!f.service) e.service = "Please select a service";
  if (f.message.trim().length < 10) e.message = "Please share a few more details (min. 10 characters)";
  return e;
}

export function EnquiryForm({ source, title = "Send an enquiry", options, compact = false }: { source: string; title?: string; options?: string[]; compact?: boolean }) {
  const db = useDB();
  const opts = options ?? [...db.services.filter((s) => s.status === "active").map((s) => s.title), ...db.programs.filter((p) => p.status === "active").map((p) => p.title)];
  const [f, setF] = useState<F>(empty);
  const [err, setErr] = useState<Partial<Record<keyof F, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = validate(f);
    setErr(v);
    if (Object.keys(v).length) return;
    setState("sending");
    setTimeout(() => { addEnquiry({ ...f, source }); setState("done"); setF(empty); }, 900);
  };
  const set = (k: keyof F) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  const Err = ({ k }: { k: keyof F }) => (err[k] ? <p className="mt-1.5 text-xs text-destructive">{err[k]}</p> : null);
  const label = "mb-2 block text-xs font-semibold uppercase tracking-wider text-navy";

  if (state === "done")
    return (
      <div className="flex flex-col items-center rounded-lg border border-gold/40 bg-card p-10 text-center shadow-card page-in">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold"><Icon name="check" className="h-7 w-7" /></span>
        <h3 className="mt-5 text-3xl text-navy">Thank you for reaching out</h3>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">Your enquiry has been received. Our team will be in touch shortly. (Demo submission — saved to the admin panel.)</p>
        <button onClick={() => setState("idle")} className="btn btn-outline mt-6">Send another enquiry</button>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="rounded-lg bg-card p-6 shadow-card md:p-10">
      <h3 className="text-3xl text-navy">{title}</h3>
      <div className={`mt-8 grid gap-5 ${compact ? "" : "md:grid-cols-2"}`}>
        <div><label className={label} htmlFor={`${source}-name`}>Full Name *</label><input id={`${source}-name`} className="field" value={f.name} onChange={set("name")} /><Err k="name" /></div>
        <div><label className={label} htmlFor={`${source}-email`}>Email Address *</label><input id={`${source}-email`} type="email" className="field" value={f.email} onChange={set("email")} /><Err k="email" /></div>
        <div><label className={label} htmlFor={`${source}-phone`}>Phone Number *</label><input id={`${source}-phone`} type="tel" className="field" value={f.phone} onChange={set("phone")} /><Err k="phone" /></div>
        <div><label className={label} htmlFor={`${source}-company`}>Company Name</label><input id={`${source}-company`} className="field" value={f.company} onChange={set("company")} /></div>
        <div className={compact ? "" : "md:col-span-2"}>
          <label className={label} htmlFor={`${source}-service`}>Service Interested In *</label>
          <select id={`${source}-service`} className="field" value={f.service} onChange={set("service")}>
            <option value="">Select an option</option>
            {opts.map((o) => <option key={o}>{o}</option>)}
            <option>Other / General enquiry</option>
          </select><Err k="service" />
        </div>
        <div className={compact ? "" : "md:col-span-2"}><label className={label} htmlFor={`${source}-message`}>Message *</label><textarea id={`${source}-message`} rows={4} className="field resize-none" value={f.message} onChange={set("message")} /><Err k="message" /></div>
      </div>
      <button type="submit" disabled={state === "sending"} className="btn btn-navy mt-8 w-full md:w-auto disabled:opacity-70">
        {state === "sending" ? <><span className="spinner h-4 w-4 rounded-full border-2 border-navy-foreground/30 border-t-navy-foreground" /> Sending…</> : <>Submit Enquiry <Icon name="arrow" className="h-4 w-4" /></>}
      </button>
    </form>
  );
}
