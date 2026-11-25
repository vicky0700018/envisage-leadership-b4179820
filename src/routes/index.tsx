import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, SectionHeading } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Icon } from "@/components/site/Icon";
import { Img } from "@/components/site/Img";
import { ArticleCard } from "@/components/site/ArticleCard";
import { IMAGES } from "@/lib/images";
import { useDB } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Envisage Leadership LLP — Envision Your Potential. Lead Beyond Limits.", "Mumbai-based management consultancy and leadership coaching centre for leaders, teams and organisations."),
  component: Home,
});

const EXPERTISE = [
  { icon: "briefcase", t: "Business & Management Consultancy", d: "Objective counsel on structure, operations and key decisions." },
  { icon: "crown", t: "Leadership Development", d: "Building leaders who inspire trust and deliver results." },
  { icon: "chess", t: "Corporate Strategy & Advisory", d: "Clear direction, sharper priorities and a practical roadmap." },
  { icon: "user", t: "Executive Coaching", d: "Confidential one-on-one coaching for senior leaders." },
  { icon: "growth", t: "Professional Development", d: "Structured growth for emerging and established professionals." },
  { icon: "org", t: "Organizational Growth", d: "Aligning people, structure and culture for scale." },
];
const COACHING = ["Executive leadership coaching", "Personal development", "Professional growth", "Corporate training", "Strategic thinking"];
const WHY = [
  { icon: "compass", t: "Strategic Perspective", d: "We see the whole picture and help you focus on what matters." },
  { icon: "crown", t: "Leadership Excellence", d: "Leadership is at the heart of every engagement." },
  { icon: "growth", t: "Professional Growth", d: "We invest in the long-term development of people." },
  { icon: "target", t: "Business-Focused Approach", d: "Practical recommendations grounded in business reality." },
  { icon: "handshake", t: "Personalized Guidance", d: "Every engagement is tailored to your context and goals." },
];
const STEPS = [
  { t: "Discover", d: "We listen deeply to understand your context, people and ambitions." },
  { t: "Strategize", d: "Together we define priorities and a clear, realistic plan." },
  { t: "Develop", d: "We build capability through advisory, coaching and training." },
  { t: "Transform", d: "We support execution so change becomes lasting progress." },
];

function Home() {
  const db = useDB();
  const featured = db.articles.filter((a) => a.status === "published" && a.featured === "yes").slice(0, 3);
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy">
        <img src={IMAGES.hero} alt="Indian executive leadership team in a Mumbai boardroom at dusk" width={1920} height={1088} className="slow-zoom absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="drift absolute -right-40 top-1/4 h-96 w-96 rounded-full border border-gold/20" aria-hidden />
        <div className="container-x relative pt-24">
          <div className="max-w-3xl">
            <span className="eyebrow hero-in">Management Consultancy · Leadership · Coaching</span>
            <h1 className="hero-in mt-6 text-5xl font-medium leading-[1.02] text-navy-foreground sm:text-6xl lg:text-7xl" style={{ animationDelay: "150ms" }}>
              Envision Your Potential.<br /><em className="text-gold">Lead Beyond Limits.</em>
            </h1>
            <p className="hero-in mt-8 max-w-xl text-lg leading-relaxed text-navy-foreground/75" style={{ animationDelay: "300ms" }}>
              ENVISAGE LEADERSHIP LLP is a Mumbai-based consultancy and coaching centre helping leaders and organisations think strategically, lead with purpose and grow with confidence.
            </p>
            <div className="hero-in mt-10 flex flex-wrap gap-4" style={{ animationDelay: "450ms" }}>
              <Link to="/services" className="btn btn-gold">Explore Our Services <Icon name="arrow" className="h-4 w-4" /></Link>
              <Link to="/contact" className="btn btn-outline-light">Book a Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About intro */}
      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="img-zoom aspect-[4/3] rounded-sm shadow-lift"><Img src="aboutTeam" alt="Envisage consulting team collaborating in a modern office" width={1280} height={960} /></div>
            <div className="absolute -bottom-6 -left-6 -z-10 hidden h-full w-full border border-gold/50 md:block" aria-hidden />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading eyebrow="About Envisage" title="Consultancy with clarity. Coaching with purpose." />
            <p className="mt-6 leading-relaxed text-muted-foreground">We partner with founders, executives and teams to turn ambition into clear strategy and capable leadership. Our philosophy is simple: organisations grow when their people are equipped to think strategically and lead with intent.</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">Every engagement blends structured business thinking with genuine personal development — so progress is both measurable and meaningful.</p>
            <Link to="/about" className="btn btn-navy mt-8">Read More <Icon name="arrow" className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Expertise */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-x">
          <Reveal><SectionHeading center eyebrow="Our Expertise" title="Where we create value" text="Integrated consultancy and development services designed around the needs of modern leaders." /></Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERTISE.map((e, i) => (
              <Reveal key={e.t} delay={i * 80}>
                <Link to="/services" className="card-lift group block h-full rounded-sm border-t-2 border-transparent bg-card p-9 shadow-card hover:border-gold">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold transition-colors group-hover:bg-gold group-hover:text-navy"><Icon name={e.icon} /></span>
                  <h3 className="mt-6 text-2xl text-navy">{e.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.d}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-royal">Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching */}
      <section className="relative overflow-hidden bg-navy py-24 md:py-32">
        <div className="drift absolute -left-32 bottom-0 h-80 w-80 rounded-full border border-gold/15" aria-hidden />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading light eyebrow="Coaching & Development" title="Growth that starts with the individual" text="Our coaching and development programs help professionals at every level build the mindset and skills to lead." />
            <ul className="mt-10 space-y-4">
              {COACHING.map((c) => (
                <li key={c} className="flex items-center gap-4 border-b border-navy-foreground/10 pb-4 text-navy-foreground">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold text-gold"><Icon name="check" className="h-3.5 w-3.5" /></span>
                  <span className="font-display text-xl">{c}</span>
                </li>
              ))}
            </ul>
            <Link to="/coaching" className="btn btn-gold mt-10">View Programs <Icon name="arrow" className="h-4 w-4" /></Link>
          </Reveal>
          <Reveal delay={150} className="img-zoom aspect-[4/5] rounded-sm lg:aspect-[4/4.6]"><Img src="training" alt="Leadership training session with Indian professionals" width={1280} height={960} /></Reveal>
        </div>
      </section>

      {/* Why */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <Reveal><SectionHeading center eyebrow="Why Choose Us" title="Why Envisage Leadership" /></Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2 lg:grid-cols-5">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 80} className="group bg-card p-8 transition-colors duration-500 hover:bg-navy">
                <Icon name={w.icon} className="h-8 w-8 text-gold" />
                <h3 className="mt-6 text-xl text-navy group-hover:text-navy-foreground">{w.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-navy-foreground/70">{w.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="container-x">
          <Reveal><SectionHeading center eyebrow="Our Approach" title="A considered path to transformation" /></Reveal>
          <div className="relative mt-16 grid gap-10 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gold/40 md:block" aria-hidden />
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 120} className="relative text-center">
                <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-background font-display text-2xl text-navy">0{i + 1}</span>
                <h3 className="mt-6 text-3xl text-navy">{s.t}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal><SectionHeading eyebrow="Featured Insights" title="Perspectives on leadership & strategy" /></Reveal>
            <Link to="/insights" className="btn btn-outline">All Insights</Link>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {featured.map((a, i) => <Reveal key={a.id} delay={i * 100}><ArticleCard a={a} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-royal py-24">
        <div className="drift absolute -right-20 -top-20 h-96 w-96 rounded-full border border-gold/25" aria-hidden />
        <Reveal className="container-x relative text-center">
          <span className="eyebrow">Begin the Conversation</span>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl leading-tight text-navy-foreground md:text-6xl">Ready to envision what's next for you and your organisation?</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn btn-gold">Book a Consultation</Link>
            <Link to="/coaching" className="btn btn-outline-light">Explore Coaching</Link>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
