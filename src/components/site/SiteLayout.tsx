import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingContact } from "./FloatingContact";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="page-in">{children}</main>
      <Footer />
      <FloatingContact />
    </div>
  );
}

export function PageHero({ eyebrow, title, text, image, alt }: { eyebrow: string; title: string; text: string; image: string; alt: string }) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-navy pb-20 pt-40">
      <img src={image} alt={alt} width={1280} height={864} className="slow-zoom absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container-x relative hero-in">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[1.05] text-navy-foreground md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-foreground/75 md:text-lg">{text}</p>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text, center = false, light = false }: { eyebrow: string; title: string; text?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={`mt-4 text-4xl font-medium leading-tight md:text-5xl ${light ? "text-navy-foreground" : "text-navy"}`}>{title}</h2>
      <span className={`gold-rule mt-6 ${center ? "mx-auto" : ""}`} />
      {text && <p className={`mt-6 leading-relaxed ${light ? "text-navy-foreground/70" : "text-muted-foreground"}`}>{text}</p>}
    </div>
  );
}
