import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { Icon } from "./Icon";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/coaching", label: "Coaching & Programs" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const solid = scrolled || open;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "bg-navy/95 py-3 shadow-lift backdrop-blur" : "bg-transparent py-5"}`}>
      <div className="container-x flex items-center justify-between gap-6">
        <Link to="/" aria-label="Envisage Leadership home"><Brand light /></Link>
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="nav-underline text-[0.8rem] font-medium tracking-wide text-navy-foreground/85 transition-colors hover:text-gold data-[status=active]:text-gold">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn btn-gold hidden sm:inline-flex !py-2.5 !px-5">Get Consultation</Link>
          <button onClick={() => setOpen(!open)} className="p-2 text-navy-foreground xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className={`overflow-hidden transition-[max-height] duration-500 xl:hidden ${open ? "max-h-[32rem]" : "max-h-0"}`}>
        <nav className="container-x flex flex-col gap-1 pb-6 pt-4" aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="border-b border-navy-foreground/10 py-3 font-display text-xl text-navy-foreground data-[status=active]:text-gold">
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-gold mt-4">Get Consultation</Link>
        </nav>
      </div>
    </header>
  );
}
