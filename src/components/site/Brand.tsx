export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden>
        <rect x="1" y="1" width="38" height="38" className="fill-navy stroke-gold" strokeWidth="1.2" />
        <path d="M11 12h17M11 20h13M11 28h17M11 12v16" className="stroke-gold" strokeWidth="2" fill="none" />
      </svg>
      <span className="leading-none">
        <span className={`block font-display text-xl font-semibold tracking-[0.18em] ${light ? "text-navy-foreground" : "text-navy"}`}>ENVISAGE</span>
        <span className="mt-1 block text-[0.6rem] font-semibold tracking-[0.42em] text-gold">LEADERSHIP LLP</span>
      </span>
    </span>
  );
}
