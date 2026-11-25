import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Brand } from "@/components/site/Brand";
import { checkCredentials, DEMO_PASS, DEMO_USER, login } from "@/lib/auth";
import { IMAGES } from "@/lib/images";

export const Route = createFileRoute("/admin_/login")({
  head: () => ({ meta: [{ title: "Admin Login — Envisage Leadership" }, { name: "description", content: "Demo admin login for Envisage Leadership LLP website." }, { name: "robots", content: "noindex" }, { property: "og:title", content: "Admin Login — Envisage Leadership" }, { property: "og:description", content: "Demo admin login." }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!checkCredentials(u, p)) { setErr("Invalid username or password."); return; }
    setBusy(true); login(); setTimeout(() => nav({ to: "/admin" }), 400);
  };
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src={IMAGES.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative flex h-full flex-col justify-between p-14"><Brand light /><p className="max-w-md font-display text-4xl text-navy-foreground">Manage your website content with ease.</p></div>
      </div>
      <div className="flex items-center justify-center bg-secondary p-6">
        <form onSubmit={submit} className="page-in w-full max-w-md rounded-lg bg-card p-10 shadow-lift">
          <div className="lg:hidden"><span className="inline-block rounded bg-navy p-3"><Brand light /></span></div>
          <h1 className="mt-6 text-4xl text-navy lg:mt-0">Admin Login</h1>
          <div className="mt-6 rounded-sm border border-gold/50 bg-gold/10 p-4 text-sm text-navy">
            <p className="font-semibold">Demo credentials</p>
            <p className="mt-1">Username: <code className="font-semibold">{DEMO_USER}</code></p>
            <p>Password: <code className="font-semibold">{DEMO_PASS}</code></p>
            <p className="mt-2 text-xs text-muted-foreground">Demo authentication only — not production security.</p>
          </div>
          <label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-navy" htmlFor="u">Username</label>
          <input id="u" className="field mt-2" value={u} onChange={(e) => setU(e.target.value)} autoComplete="username" />
          <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-navy" htmlFor="p">Password</label>
          <input id="p" type="password" className="field mt-2" value={p} onChange={(e) => setP(e.target.value)} autoComplete="current-password" />
          {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
          <button className="btn btn-navy mt-8 w-full" disabled={busy}>{busy ? "Signing in…" : "Sign In"}</button>
          <Link to="/" className="mt-6 block text-center text-xs text-muted-foreground hover:text-royal">← Back to website</Link>
        </form>
      </div>
    </div>
  );
}
