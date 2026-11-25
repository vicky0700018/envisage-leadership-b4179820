import { useEffect, type ReactNode } from "react";
import { Icon } from "./Icon";

export function Modal({ open, onClose, children, wide = false }: { open: boolean; onClose: () => void; children: ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose} role="dialog" aria-modal>
      <div className={`page-in relative max-h-[92vh] w-full overflow-y-auto rounded-t-lg bg-card shadow-lift sm:rounded-lg ${wide ? "max-w-3xl" : "max-w-xl"}`} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-navy shadow-card hover:bg-gold"><Icon name="close" className="h-4 w-4" /></button>
        {children}
      </div>
    </div>
  );
}
