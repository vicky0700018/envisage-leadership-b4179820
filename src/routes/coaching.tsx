import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero, SectionHeading } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Icon } from "@/components/site/Icon";
import { Img } from "@/components/site/Img";
import { Modal } from "@/components/site/Modal";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { IMAGES } from "@/lib/images";
import { useDB } from "@/lib/store";
import type { Program } from "@/lib/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/coaching")({
  head: () => seo("Coaching & Programs — Envisage Leadership LLP", "Executive coaching, leadership training, communication, decision-making and strategic thinking programs in Mumbai."),
  component: Coaching,
});

const METHOD = [
  { icon: "search", t: "Assess", d: "Understand strengths, goals and development areas through structured conversation." },
  { icon: "target", t: "Set Intent", d: "Agree clear, personal and business-linked development goals." },
  { icon: "layers", t: "Practise", d: "Apply new approaches in real situations between sessions." },
  { icon: "growth", t: "Reflect & Sustain", d: "Review progress and embed habits for lasting change." },
];
const JOURNEY = ["Discovery conversation", "Tailored program design", "Coaching & learning sessions", "Real-world application", "Progress review & next steps"];
const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

function Coaching() {
  const db = useDB();
  const all = db.programs.filter((p) => p.status === "active");
  const cats = ["All", ...Array.from(new Set(all.map((p) => p.category)))];
  const [cat, setCat] = useState("All");
  const [sel, setSel] = useState<Program | null>(null);
  const list = cat === "All" ? all : all.filter((p) => p.category === cat);
  return (
    <SiteLayout>
      <PageHero eyebrow="Coaching & Programs" title="Develop the leader within." text="Coaching and professional development programs that build confidence, judgement and the capability to lead at every level." image={IMAGES.coaching} alt="Executive coaching session in a calm office" />

      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Introduction" title="Programs designed around people" text="Whether you are a senior executive refining your leadership, a professional preparing for a bigger role, or an organisation investing in its managers, our programs combine reflection, practical tools and accountability." />
          </Reveal>
          <Reveal delay={120} className="img-zoom aspect-[4/3] rounded-sm shadow-lift"><Img src="training" alt="Corporate leadership training with Indian facilitator" width={1280} height={960} /></Reveal>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container-x">
          <Reveal><SectionHeading center eyebrow="Our Programs" title="Coaching & development programs" /></Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${cat === c ? "bg-navy text-gold" : "bg-card text-navy hover:bg-gold/20"}`}>{c}</button>
            ))}
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 70}>
                <button onClick={() => setSel(p)} className="card-lift group flex h-full w-full flex-col overflow-hidden rounded-sm bg-card text-left shadow-card">
                  <div className="img-zoom aspect-[4/3]"><Img src={p.image} alt={p.title} /></div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="eyebrow !text-[0.62rem]">{p.category}</span>
                    <h3 className="mt-3 text-2xl leading-tight text-navy">{p.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Icon name="clock" className="h-3.5 w-3.5" />{p.duration}</span>
                      <span className="text-royal">{p.format}</span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-24 md:py-32">
        <div className="container-x">
          <Reveal><SectionHeading light center eyebrow="Methodology" title="How our coaching works" /></Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {METHOD.map((m, i) => (
              <Reveal key={m.t} delay={i * 100} className="border border-gold/25 p-8 transition-colors duration-500 hover:border-gold">
                <Icon name={m.icon} className="h-8 w-8 text-gold" />
                <h3 className="mt-6 text-2xl text-navy-foreground">{m.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-foreground/65">{m.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <Reveal className="img-zoom aspect-[4/3] rounded-sm shadow-lift lg:order-2"><Img src="workshop" alt="Strategic thinking workshop with professionals mapping ideas" width={1280} height={960} /></Reveal>
          <Reveal delay={100}>
            <SectionHeading eyebrow="Learning Journey" title="Your path to growth" />
            <ol className="mt-10 space-y-0">
              {JOURNEY.map((j, i) => (
                <li key={j} className="relative flex gap-6 pb-8 last:pb-0">
                  {i < JOURNEY.length - 1 && <span className="absolute left-5 top-10 h-full w-px bg-gold/40" aria-hidden />}
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-display text-gold">{i + 1}</span>
                  <span className="pt-1.5 font-display text-2xl text-navy">{j}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-5">
          <Reveal className="lg:col-span-2"><SectionHeading eyebrow="Enquire" title="Find the right program" text="Tell us about yourself or your team and we will recommend a suitable coaching or development pathway." /></Reveal>
          <Reveal delay={100} className="lg:col-span-3"><EnquiryForm source="Coaching" title="Program enquiry" options={all.map((p) => p.title)} /></Reveal>
        </div>
      </section>

      <Modal open={!!sel} onClose={() => setSel(null)} wide>
        {sel && (
          <div>
            <div className="aspect-[16/7]"><Img src={sel.image} alt={sel.title} /></div>
            <div className="p-8 md:p-10">
              <span className="eyebrow">{sel.category} · {sel.format} · {sel.duration}</span>
              <h3 className="mt-3 text-4xl text-navy">{sel.title}</h3>
              <p className="mt-5 leading-relaxed text-muted-foreground">{sel.description}</p>
              <h4 className="mt-8 text-xl text-navy">Outcomes</h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">{lines(sel.outcomes).map((b) => <li key={b} className="flex gap-3 text-sm"><Icon name="check" className="mt-0.5 h-4 w-4 text-gold" />{b}</li>)}</ul>
              <a href="#enquire" onClick={(e) => { e.preventDefault(); setSel(null); setTimeout(() => document.getElementById("Coaching-name")?.focus(), 50); }} className="btn btn-navy mt-8">Enquire About This Program</a>
            </div>
          </div>
        )}
      </Modal>
    </SiteLayout>
  );
}
