import { Link } from "@tanstack/react-router";
import type { Article } from "@/lib/data";
import { Img } from "./Img";
import { Icon } from "./Icon";

export function fmtDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return y && m && day ? `${day} ${months[m - 1]} ${y}` : d;
}

export function ArticleCard({ a }: { a: Article }) {
  return (
    <Link to="/insights/$slug" params={{ slug: a.slug }} className="card-lift group flex h-full flex-col overflow-hidden rounded-sm bg-card shadow-card">
      <div className="img-zoom aspect-[16/10]"><Img src={a.image} alt={a.title} /></div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="eyebrow !tracking-[0.18em]">{a.category}</span><span>·</span><span>{fmtDate(a.date)}</span></div>
        <h3 className="mt-4 text-2xl leading-snug text-navy transition-colors group-hover:text-royal">{a.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-royal">Read article <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}
