import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Brand } from "@/components/site/Brand";
import { Icon } from "@/components/site/Icon";
import { isLoggedIn, logout } from "@/lib/auth";
import { MODULES } from "@/lib/admin-modules";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — Envisage Leadership" }, { name: "description", content: "Demo content management panel." }, { name: "robots", content: "noindex" }, { property: "og:title", content: "Admin Panel — Envisage Leadership" }, { property: "og:description", content: "Demo content management panel." }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const nav = useNavigate();
  const [ok, setOk] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { if (isLoggedIn()) setOk(true); else nav({ to: "/admin/login", replace: true }); }, [nav]);
  if (!ok)
    return <div className="flex min-h-screen items-center justify-center bg-secondary"><span className="spinner h-8 w-8 rounded-full border-2 border-gold/30 border-t-gold" /></div>;
  const link = "flex items-center gap-3 rounded px-3 py-2.5 text-sm text-navy-foreground/70 transition-colors hover:bg-navy-foreground/5 hover:text-gold data-[status=active]:bg-gold/15 data-[status=active]:text-gold";
  return (
    <div className="min-h-screen bg-secondary lg:pl-64">
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-navy p-5 transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <Link to="/admin" className="px-2 py-3"><Brand light /></Link>
        <nav className="mt-8 flex-1 space-y-1 overflow-y-auto" onClick={() => setOpen(false)}>
          <Link to="/admin" activeOptions={{ exact: true }} className={link}><Icon name="grid" className="h-4 w-4" />Dashboard</Link>
          {MODULES.map((m) => <Link key={m.slug} to="/admin/$module" params={{ module: m.slug }} className={link}><Icon name={m.icon} className="h-4 w-4" />{m.title}</Link>)}
        </nav>
        <div className="space-y-1 border-t border-navy-foreground/10 pt-4">
          <Link to="/" className={link}><Icon name="eye" className="h-4 w-4" />View Website</Link>
          <button onClick={() => { logout(); nav({ to: "/admin/login" }); }} className={`${link} w-full`}><Icon name="logout" className="h-4 w-4" />Logout</button>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-40 bg-navy/50 lg:hidden" onClick={() => setOpen(false)} />}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card px-5 py-4 lg:px-10">
        <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Icon name="menu" className="h-6 w-6 text-navy" /></button>
        <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-navy">Demo mode · data saved in this browser</span>
        <span className="flex items-center gap-2 text-sm text-navy"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs text-gold">AD</span><span className="hidden sm:inline">admin</span></span>
      </header>
      <main className="page-in p-5 lg:p-10"><Outlet /></main>
    </div>
  );
}
