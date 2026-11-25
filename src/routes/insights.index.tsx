import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero, SectionHeading } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Icon } from "@/components/site/Icon";
import { Img } from "@/components/site/Img";
import { ArticleCard, fmtDate } from "@/components/site/ArticleCard";
import { IMAGES } from "@/lib/images";
import { useDB } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/insights/")({
  head: () => seo("Insights — Envisage Leadership LLP", "Articles on leadership, management, business strategy, professional development and coaching."),
  component: Insights,
});

function Insights() {
  const db = useDB();
  const all = db.articles.filter((a) => a.status === "published").sort((a, b) => b.date.localeCompare(a.date));
  const cats = ["All", ...Array.from(new Set(all.map((a) => a.category)))];
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const lead = all.find((a) => a.featured === "yes");
  const list = all.filter((a) => (cat === "All" || a.category === cat) && (a.title + a.excerpt + a.category).toLowerCase().includes(q.toLowerCase()));
  return (
    <SiteLayout>
      <PageHero eyebrow="Insights" title="Ideas for leaders who think ahead." text="Perspectives on leadership, strategy, management and professional growth from the Envisage team." image={IMAGES.reading} alt="Executive reading a leadership book in a library lounge" />

      {lead && (
        <section className="py-24">
          <div className="container-x">
            <Reveal>
              <Link to="/insights/$slug" params={{ slug: lead.slug }} className="group grid overflow-hidden rounded-sm bg-navy shadow-lift lg:grid-cols-2">
                <div className="img-zoom aspect-[16/10] lg:aspect-auto"><Img src={lead.image} alt={lead.title} /></div>
                <div className="flex flex-col justify-center p-10 md:p-14">
                  <span className="eyebrow">Featured · {lead.category}</span>
                  <h2 className="mt-5 text-4xl leading-tight text-navy-foreground md:text-5xl">{lead.title}</h2>
                  <p className="mt-5 leading-relaxed text-navy-foreground/70">{lead.excerpt}</p>
                  <p className="mt-6 text-xs text-navy-foreground/50">{fmtDate(lead.date)} · {lead.readTime} read</p>
                  <span className="btn btn-gold mt-8 self-start">Read Article <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-secondary py-24">
        <div className="container-x">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Library" title="All articles" />
            <label className="relative w-full lg:w-80">
              <Icon name="search" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="field !pl-11" aria-label="Search articles" />
            </label>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {cats.map((c) => <button key={c} onClick={() => setCat(c)} className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${cat === c ? "bg-navy text-gold" : "bg-card text-navy hover:bg-gold/20"}`}>{c}</button>)}
          </div>
          {list.length ? (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {list.map((a, i) => <Reveal key={a.id} delay={(i % 3) * 80}><ArticleCard a={a} /></Reveal>)}
            </div>
          ) : (
            <p className="mt-16 text-center text-muted-foreground">No articles match your search.</p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
