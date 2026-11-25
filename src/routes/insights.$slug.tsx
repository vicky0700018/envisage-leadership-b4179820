import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Icon } from "@/components/site/Icon";
import { Img } from "@/components/site/Img";
import { ArticleCard, fmtDate } from "@/components/site/ArticleCard";
import { useDB } from "@/lib/store";
import { createDefaults } from "@/lib/data";

export const Route = createFileRoute("/insights/$slug")({
  head: ({ params }) => {
    const a = createDefaults().articles.find((x) => x.slug === params.slug);
    const title = a ? `${a.title} — Envisage Insights` : "Article — Envisage Insights";
    const desc = a?.excerpt ?? "An article from Envisage Leadership LLP insights.";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const db = useDB();
  const a = db.articles.find((x) => x.slug === slug && x.status === "published");
  if (!a)
    return (
      <SiteLayout>
        <section className="flex min-h-[70vh] items-center bg-navy pt-24">
          <div className="container-x text-center">
            <h1 className="text-5xl text-navy-foreground">Article not found</h1>
            <p className="mt-4 text-navy-foreground/70">This article may have been moved or unpublished.</p>
            <Link to="/insights" className="btn btn-gold mt-8">Back to Insights</Link>
          </div>
        </section>
      </SiteLayout>
    );
  const related = db.articles.filter((x) => x.status === "published" && x.id !== a.id).sort((x, y) => Number(y.category === a.category) - Number(x.category === a.category)).slice(0, 3);
  return (
    <SiteLayout>
      <section className="bg-navy pb-16 pt-36">
        <div className="container-x max-w-4xl hero-in">
          <Link to="/insights" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-navy-foreground/60 hover:text-gold"><span className="rotate-180"><Icon name="arrow" className="h-4 w-4" /></span> All insights</Link>
          <p className="eyebrow mt-8">{a.category}</p>
          <h1 className="mt-4 text-4xl leading-tight text-navy-foreground md:text-6xl">{a.title}</h1>
          <p className="mt-6 text-sm text-navy-foreground/60">{a.author} · {fmtDate(a.date)} · {a.readTime} read</p>
        </div>
      </section>
      <div className="container-x -mt-1 max-w-5xl"><div className="aspect-[16/8] overflow-hidden rounded-sm shadow-lift"><Img src={a.image} alt={a.title} eager /></div></div>
      <article className="container-x max-w-3xl py-16">
        <p className="font-display text-2xl leading-snug text-navy">{a.excerpt}</p>
        <span className="gold-rule my-10" />
        {a.content.split("\n").filter(Boolean).map((p, i) => <p key={i} className="mb-6 text-lg leading-relaxed text-foreground/85">{p}</p>)}
        <div className="mt-12 rounded-sm border-l-2 border-gold bg-secondary p-8">
          <p className="font-display text-2xl text-navy">Want to explore this with your team?</p>
          <Link to="/contact" className="btn btn-navy mt-5">Book a Consultation</Link>
        </div>
      </article>
      <section className="bg-secondary py-20">
        <div className="container-x">
          <h2 className="text-4xl text-navy">Related articles</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">{related.map((r, i) => <Reveal key={r.id} delay={i * 80}><ArticleCard a={r} /></Reveal>)}</div>
        </div>
      </section>
    </SiteLayout>
  );
}
