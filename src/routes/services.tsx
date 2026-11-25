import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero, SectionHeading } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Icon } from "@/components/site/Icon";
import { Img } from "@/components/site/Img";
import { Modal } from "@/components/site/Modal";
import { IMAGES } from "@/lib/images";
import { useDB } from "@/lib/store";
import type { Service } from "@/lib/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => seo("Services — Envisage Leadership LLP", "Management consultancy, strategy, corporate planning, organisational development and executive development services."),
  component: Services,
});

const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

function Services() {
  const db = useDB();
  const list = db.services.filter((s) => s.status === "active");
  const [sel, setSel] = useState<Service | null>(null);
  return (
    <SiteLayout>
      <PageHero eyebrow="Our Services" title="Advisory that moves organisations forward." text="Integrated consultancy services that bring strategic clarity, organisational strength and leadership capability." image={IMAGES.strategy} alt="Business strategy meeting with consultant presenting" />

      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal><SectionHeading eyebrow="What We Offer" title="Consultancy services" text="Each engagement is shaped around your context. Explore our core areas of support below." /></Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {list.map((s, i) => (
              <Reveal key={s.id} delay={(i % 2) * 100}>
                <article className="card-lift group flex h-full flex-col overflow-hidden rounded-sm bg-card shadow-card">
                  <div className="img-zoom relative aspect-[16/9]">
                    <Img src={s.image} alt={s.title} />
                    <span className="absolute left-5 top-5 bg-navy/90 px-3 py-1 font-display text-lg text-gold">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="text-3xl text-navy">{s.title}</h3>
                    <p className="mt-2 text-sm font-medium text-royal">{s.summary}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                    <ul className="mt-6 space-y-2">
                      {lines(s.benefits).map((b) => <li key={b} className="flex gap-3 text-sm text-foreground"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{b}</li>)}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3 pt-2">
                      <button onClick={() => setSel(s)} className="btn btn-outline !py-2.5">Learn More</button>
                      <Link to="/contact" className="btn btn-navy !py-2.5">Request Consultation</Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="img-zoom aspect-[16/10] rounded-sm shadow-lift"><Img src="execdev" alt="Senior Indian executive overlooking Mumbai" /></Reveal>
          <Reveal delay={120}>
            <SectionHeading eyebrow="Engagement Model" title="Tailored, collaborative and practical" text="We begin with a discovery conversation, agree clear objectives and scope, and then work alongside your team — combining advisory, facilitation and coaching as your needs evolve." />
            <Link to="/contact" className="btn btn-gold mt-8">Schedule a Discovery Call</Link>
          </Reveal>
        </div>
      </section>

      <Modal open={!!sel} onClose={() => setSel(null)} wide>
        {sel && (
          <div>
            <div className="aspect-[16/7]"><Img src={sel.image} alt={sel.title} /></div>
            <div className="p-8 md:p-10">
              <span className="eyebrow">Service</span>
              <h3 className="mt-3 text-4xl text-navy">{sel.title}</h3>
              <p className="mt-2 font-medium text-royal">{sel.summary}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{sel.description}</p>
              <h4 className="mt-8 text-xl text-navy">Key benefits</h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">{lines(sel.benefits).map((b) => <li key={b} className="flex gap-3 text-sm"><Icon name="check" className="mt-0.5 h-4 w-4 text-gold" />{b}</li>)}</ul>
              <Link to="/contact" className="btn btn-navy mt-8">Book a Consultation</Link>
            </div>
          </div>
        )}
      </Modal>
    </SiteLayout>
  );
}
