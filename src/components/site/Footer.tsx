import { Link } from "@tanstack/react-router";
import { Brand } from "./Brand";
import { NAV } from "./Header";
import { Icon } from "./Icon";
import { useDB } from "@/lib/store";
import { COMPANY_NAME } from "@/lib/data";

export function Footer() {
  const db = useDB();
  const get = (t: string) => db.contact.find((c) => c.type === t && c.status === "active")?.value;
  const llpin = db.company.find((c) => c.label === "LLPIN")?.value;
  const services = db.services.filter((s) => s.status === "active").slice(0, 6);
  return (
    <footer className="bg-navy pb-28 pt-20 text-navy-foreground/75 sm:pb-12">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Brand light />
          <p className="mt-6 text-sm leading-relaxed">A Mumbai-based management consultancy and professional coaching centre helping leaders and organisations envision, strategise and grow.</p>
        </div>
        <div>
          <h4 className="eyebrow mb-5">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="transition-colors hover:text-gold">{n.label}</Link></li>)}
            <li><Link to="/admin/login" className="transition-colors hover:text-gold">Admin Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-5">Services</h4>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => <li key={s.id}><Link to="/services" className="transition-colors hover:text-gold">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-5">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span><span className="block font-semibold text-navy-foreground">Registered Office</span>{get("address")}</span></li>
            <li className="flex gap-3"><Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{get("email")}</li>
            <li className="flex gap-3"><Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{get("phone")}</li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-16 flex flex-col gap-3 border-t border-navy-foreground/10 pt-8 text-xs md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved. LLPIN: {llpin} · ROC Mumbai I</p>
        <p className="text-gold">Designed and development by SOSynch Ai Tech</p>
      </div>
    </footer>
  );
}
