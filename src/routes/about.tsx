import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, SectionHeading } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Icon } from "@/components/site/Icon";
import { Img } from "@/components/site/Img";
import { IMAGES } from "@/lib/images";
import { useDB } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About Us — Envisage Leadership LLP", "Our story, vision, mission, values and designated partners of Envisage Leadership LLP, Mumbai."),
  component: About,
});

function About() {
  const db = useDB();
  const sec = db.about.filter((s) => s.status === "active");
  const by = (t: string) => sec.find((s) => s.type === t);
  const values = sec.filter((s) => s.type === "value");
  const legal = db.company.filter((c) => c.status === "active" && c.type === "legal");
  const partners = db.company.filter((c) => c.status === "active" && c.type === "partner");
  const office = db.company.find((c) => c.type === "address")?.value;
  const overview = by("overview"), background = by("background"), vision = by("vision"), mission = by("mission"), philosophy = by("philosophy"), approach = by("approach");
  const initials = (n: string) => n.split(" ").map((x) => x[0]).slice(0, 2).join("");

  return (
    <SiteLayout>
      <PageHero eyebrow="About Us" title="A consultancy built around leadership." text="Strategy, structure and people — brought together to help organisations and leaders move forward with confidence." image={IMAGES.aboutOffice} alt="Elegant Envisage consultancy office in Mumbai" />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><SectionHeading eyebrow="Who We Are" title={overview?.title ?? "Company Overview"} /></Reveal>
          <Reveal delay={100} className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-7">
            {overview && <p className="font-display text-2xl leading-snug text-navy">{overview.body}</p>}
            {background && <div><h3 className="mb-2 text-2xl text-navy">{background.title}</h3><p className="text-base">{background.body}</p></div>}
          </Reveal>
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="container-x grid gap-8 md:grid-cols-2">
          {[vision, mission].filter(Boolean).map((s, i) => (
            <Reveal key={s!.id} delay={i * 120} className="border border-gold/30 p-10 md:p-14">
              <Icon name={i ? "target" : "eye"} className="h-9 w-9 text-gold" />
              <h3 className="mt-6 text-4xl text-navy-foreground">{s!.title}</h3>
              <p className="mt-5 leading-relaxed text-navy-foreground/70">{s!.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="img-zoom aspect-[4/3] rounded-sm shadow-lift"><Img src="aboutTeam" alt="Envisage team in a collaborative planning session" width={1280} height={960} /></Reveal>
          <Reveal delay={120} className="space-y-10">
            {philosophy && <div><span className="eyebrow">Our Philosophy</span><h3 className="mt-3 text-3xl text-navy">{philosophy.title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{philosophy.body}</p></div>}
            {approach && <div><span className="eyebrow">How We Work</span><h3 className="mt-3 text-3xl text-navy">{approach.title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{approach.body}</p></div>}
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container-x">
          <Reveal><SectionHeading center eyebrow="Our Values" title="The principles that guide us" /></Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.id} delay={i * 80} className="card-lift rounded-sm bg-card p-8 shadow-card">
                <span className="font-display text-5xl text-gold/60">0{i + 1}</span>
                <h3 className="mt-4 text-2xl text-navy">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal><SectionHeading center eyebrow="Leadership" title="Designated Partners" /></Reveal>
          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            {partners.map((p, i) => (
              <Reveal key={p.id} delay={i * 120} className="card-lift group rounded-sm bg-card p-10 text-center shadow-card">
                <span className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-gold bg-navy font-display text-4xl text-gold transition-transform duration-500 group-hover:scale-105">{initials(p.value)}</span>
                <h3 className="mt-7 text-3xl text-navy">{p.value}</h3>
                <p className="eyebrow mt-3">{p.label}</p>
                <p className="mt-4 text-sm text-muted-foreground">ENVISAGE LEADERSHIP LLP</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading light eyebrow="Registration" title="Company Details" />
            <dl className="mt-10 divide-y divide-navy-foreground/10">
              {legal.map((c) => (
                <div key={c.id} className="grid grid-cols-5 gap-4 py-4 text-sm">
                  <dt className="col-span-2 text-navy-foreground/55">{c.label}</dt>
                  <dd className="col-span-3 text-navy-foreground">{c.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-center border border-gold/30 p-10">
            <Icon name="building" className="h-9 w-9 text-gold" />
            <h3 className="mt-6 text-3xl text-navy-foreground">Registered Office</h3>
            <p className="mt-4 leading-relaxed text-navy-foreground/70">{office}</p>
            <Link to="/contact" className="btn btn-gold mt-8 self-start">Get in Touch</Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
