import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero, SectionHeading } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Icon } from "@/components/site/Icon";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { IMAGES } from "@/lib/images";
import { useDB } from "@/lib/store";
import { COMPANY_NAME, REGISTERED_OFFICE } from "@/lib/data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact — Envisage Leadership LLP", "Contact Envisage Leadership LLP, Chembur, Mumbai, for consultancy and coaching enquiries."),
  component: Contact,
});

function Contact() {
  const db = useDB();
  const [tab, setTab] = useState<"enquiry" | "consult">("enquiry");
  const items = db.contact.filter((c) => c.status === "active");
  const icon: Record<string, string> = { email: "mail", phone: "phone", whatsapp: "whatsapp", instagram: "instagram", address: "pin", hours: "clock" };
  const address = items.find((i) => i.type === "address")?.value ?? REGISTERED_OFFICE;
  return (
    <SiteLayout>
      <PageHero eyebrow="Contact" title="Let's start a conversation." text="Share your goals with us and we'll help you find the right consultancy or coaching pathway." image={IMAGES.mentoring} alt="Two professionals in a mentoring conversation" />

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <SectionHeading eyebrow="Get in Touch" title={COMPANY_NAME} />
            <ul className="mt-10 space-y-6">
              {items.map((c) => (
                <li key={c.id} className="flex gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-gold"><Icon name={icon[c.type] ?? "info"} className="h-4.5 w-4.5" /></span>
                  <div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</p><p className="mt-1 text-navy">{c.value}</p></div>
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-sm bg-secondary p-4 text-xs text-muted-foreground">Contact numbers and email will be updated once verified.</p>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-3">
            <div className="mb-6 inline-flex rounded-full bg-secondary p-1">
              {([["enquiry", "General Enquiry"], ["consult", "Request Consultation"]] as const).map(([k, l]) => (
                <button key={k} onClick={() => setTab(k)} className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${tab === k ? "bg-navy text-gold shadow-card" : "text-navy"}`}>{l}</button>
              ))}
            </div>
            {tab === "enquiry" ? <EnquiryForm key="e" source="Contact" title="Contact enquiry" /> : <EnquiryForm key="c" source="Consultation" title="Consultation request" />}
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <Reveal className="overflow-hidden rounded-sm shadow-card">
            <div className="flex items-center gap-3 bg-navy px-6 py-4 text-sm text-navy-foreground"><Icon name="pin" className="h-4 w-4 text-gold" /> {address}</div>
            <iframe title="Map showing Envisage Leadership registered office in Chembur, Mumbai" className="h-[420px] w-full border-0 grayscale-[40%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent("Runwal Classique, CTR Avenue Road, Chembur, Mumbai 400071")}&output=embed`} />
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
