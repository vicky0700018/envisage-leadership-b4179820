import { Link } from "@tanstack/react-router";
import { Icon } from "./Icon";
import { isPlaceholder, useDB } from "@/lib/store";

export function FloatingContact() {
  const db = useDB();
  const v = (t: string) => db.contact.find((c) => c.type === t && c.status === "active")?.value;
  const items = [
    { key: "instagram", label: "Instagram", val: v("instagram"), href: (x: string) => `https://instagram.com/${x.replace(/^@/, "")}` },
    { key: "whatsapp", label: "WhatsApp", val: v("whatsapp"), href: (x: string) => `https://wa.me/${x.replace(/\D/g, "")}` },
    { key: "phone", label: "Call us", val: v("phone"), href: (x: string) => `tel:${x.replace(/\s/g, "")}` },
  ];
  const cls = "group relative flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy text-gold shadow-lift transition-all duration-300 hover:-translate-y-1 hover:bg-gold hover:text-navy";
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      {items.map((i) => {
        const tip = <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded bg-navy px-3 py-1.5 text-xs text-navy-foreground opacity-0 shadow-card transition-opacity group-hover:opacity-100">{isPlaceholder(i.val) ? `${i.label} — details coming soon` : i.label}</span>;
        return isPlaceholder(i.val) ? (
          <Link key={i.key} to="/contact" aria-label={i.label} className={cls}><Icon name={i.key} />{tip}</Link>
        ) : (
          <a key={i.key} href={i.href(i.val!)} target={i.key === "phone" ? undefined : "_blank"} rel="noreferrer" aria-label={i.label} className={cls}><Icon name={i.key} />{tip}</a>
        );
      })}
    </div>
  );
}
