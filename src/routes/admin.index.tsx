import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@/components/site/Icon";
import { useDB, resetDemo } from "@/lib/store";
import { MODULES } from "@/lib/admin-modules";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const db = useDB();
  const stats = [
    { l: "Total Services", v: db.services.length, icon: "briefcase", m: "services" },
    { l: "Total Programs", v: db.programs.length, icon: "crown", m: "programs" },
    { l: "Total Articles", v: db.articles.length, icon: "doc", m: "articles" },
    { l: "Total Enquiries", v: db.enquiries.length, icon: "inbox", m: "enquiries" },
  ];
  const recent = [...db.enquiries].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-4xl text-navy">Dashboard</h1><p className="mt-1 text-sm text-muted-foreground">Overview of your website content.</p></div>
        <button onClick={() => confirm("Reset all demo data to defaults?") && resetDemo()} className="btn btn-outline !py-2 !text-xs">Reset demo data</button>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.l} to="/admin/$module" params={{ module: s.m }} className="card-lift rounded-lg bg-card p-6 shadow-card">
            <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{s.l}</span><span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-gold"><Icon name={s.icon} className="h-4 w-4" /></span></div>
            <p className="mt-4 font-display text-5xl text-navy">{s.v}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="rounded-lg bg-card p-6 shadow-card xl:col-span-2">
          <div className="flex items-center justify-between"><h2 className="text-2xl text-navy">Recent Enquiries</h2><Link to="/admin/$module" params={{ module: "enquiries" }} className="text-xs font-semibold uppercase tracking-wider text-royal">View all</Link></div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground"><th className="py-3 pr-4">Name</th><th className="py-3 pr-4">Service</th><th className="py-3 pr-4">Date</th><th className="py-3">Status</th></tr></thead>
              <tbody>
                {recent.map((e) => (
                  <tr key={e.id} className="border-b border-border/60"><td className="py-3 pr-4 font-medium text-navy">{e.name}</td><td className="py-3 pr-4 text-muted-foreground">{e.service}</td><td className="py-3 pr-4 text-muted-foreground">{e.date}</td><td className="py-3"><StatusPill s={e.status} /></td></tr>
                ))}
                {!recent.length && <tr><td colSpan={4} className="py-6 text-center text-muted-foreground">No enquiries yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-lg bg-card p-6 shadow-card">
          <h2 className="text-2xl text-navy">Quick Actions</h2>
          <div className="mt-4 grid gap-2">
            {MODULES.map((m) => (
              <Link key={m.slug} to="/admin/$module" params={{ module: m.slug }} search={{ new: true }} className="flex items-center justify-between rounded border border-border px-4 py-3 text-sm text-navy transition-colors hover:border-gold hover:bg-gold/10">
                <span className="flex items-center gap-3"><Icon name={m.icon} className="h-4 w-4 text-gold" />Add {m.singular}</span><Icon name="plus" className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusPill({ s }: { s: string }) {
  const good = ["active", "published", "closed"].includes(s);
  const warn = ["new"].includes(s);
  return <span className={`inline-block rounded-full px-2.5 py-1 text-[0.7rem] font-semibold capitalize ${good ? "bg-success/15 text-success" : warn ? "bg-gold/20 text-navy" : "bg-muted text-muted-foreground"}`}>{s}</span>;
}
