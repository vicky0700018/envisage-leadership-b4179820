import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Icon } from "@/components/site/Icon";
import { Modal } from "@/components/site/Modal";
import { Img } from "@/components/site/Img";
import { StatusPill } from "./admin.index";
import { MODULES, type ModuleDef } from "@/lib/admin-modules";
import { IMAGES, IMAGE_LABELS, type ImageKey } from "@/lib/images";
import { newId, remove, upsert, useDB } from "@/lib/store";

type Row = { id: string; status: string } & Record<string, string>;

export const Route = createFileRoute("/admin/$module")({
  validateSearch: (s: Record<string, unknown>): { new?: boolean } => (s["new"] ? { new: true } : {}),
  component: ModulePage,
});

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function ModulePage() {
  const { module } = Route.useParams();
  const search = Route.useSearch();
  const def = MODULES.find((m) => m.slug === module);
  if (!def) return <div className="rounded-lg bg-card p-10 text-center shadow-card"><h1 className="text-3xl text-navy">Module not found</h1><Link to="/admin" className="btn btn-navy mt-6">Back to dashboard</Link></div>;
  return <Manager key={def.slug} def={def} openNew={!!search.new} />;
}

function Manager({ def, openNew }: { def: ModuleDef; openNew: boolean }) {
  const db = useDB();
  const rows = db[def.col] as unknown as Row[];
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState<Row | null>(null);
  const [edit, setEdit] = useState<Row | null>(null);
  const [del, setDel] = useState<Row | null>(null);
  const [toast, setToast] = useState("");

  const blank = (): Row => { const r: Row = { id: "", status: def.statuses[0]! }; def.fields.forEach((f) => (r[f.key] = f.options?.[0] ?? (f.type === "image" ? "aboutOffice" : f.type === "date" ? new Date().toISOString().slice(0, 10) : ""))); return r; };
  useEffect(() => { if (openNew) setEdit(blank()); }, [openNew]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 2500); return () => clearTimeout(t); }, [toast]);

  const filtered = rows.filter((r) => (status === "all" || r.status === status) && Object.values(r).join(" ").toLowerCase().includes(q.toLowerCase()));

  const save = (r: Row) => {
    const item = { ...r };
    if (def.col === "articles" && !item["slug"]) item["slug"] = slugify(item["title"] ?? "") || newId();
    const isNew = !item.id;
    if (isNew) item.id = newId();
    upsert(def.col, item);
    setEdit(null);
    setToast(isNew ? `${def.singular} added` : `${def.singular} updated`);
  };
  const toggle = (r: Row) => {
    const i = def.statuses.indexOf(r.status);
    upsert(def.col, { ...r, status: def.statuses[(i + 1) % def.statuses.length]! });
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl text-navy">{def.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{rows.length} records{def.publicPath && <> · changes appear on <Link to={def.publicPath} className="text-royal underline">{def.publicPath}</Link></>}</p>
        </div>
        <button onClick={() => setEdit(blank())} className="btn btn-navy !py-2.5"><Icon name="plus" className="h-4 w-4" />Add {def.singular}</button>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-lg bg-card p-4 shadow-card sm:flex-row">
        <label className="relative flex-1"><Icon name="search" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${def.title.toLowerCase()}…`} className="field !pl-11" aria-label="Search" /></label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="field sm:!w-48" aria-label="Filter by status"><option value="all">All statuses</option>{def.statuses.map((s) => <option key={s} value={s}>{s}</option>)}</select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg bg-card shadow-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead><tr className="border-b border-border bg-secondary text-left text-xs uppercase tracking-wider text-muted-foreground">
            {def.fields.some((f) => f.type === "image") && <th className="px-5 py-3">Image</th>}
            {def.columns.map((c) => <th key={c} className="px-5 py-3">{def.fields.find((f) => f.key === c)?.label ?? c}</th>)}
            <th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-border/60 transition-colors hover:bg-secondary/60">
                {def.fields.some((f) => f.type === "image") && <td className="px-5 py-3"><div className="h-11 w-16 overflow-hidden rounded"><Img src={r["image"] ?? ""} alt="" /></div></td>}
                {def.columns.map((c, i) => <td key={c} className={`max-w-xs truncate px-5 py-3 ${i === 0 ? "font-medium text-navy" : "text-muted-foreground"}`}>{r[c]}</td>)}
                <td className="px-5 py-3"><button onClick={() => toggle(r)} title="Click to change status"><StatusPill s={r.status} /></button></td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setView(r)} aria-label="View" title="View" className="flex h-9 w-9 items-center justify-center rounded-full bg-royal/10 text-royal transition-colors hover:bg-royal hover:text-navy-foreground"><Icon name="eye" className="h-4 w-4" /></button>
                    <button onClick={() => setEdit({ ...r })} aria-label="Edit" title="Edit" className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-navy transition-colors hover:bg-gold"><Icon name="edit" className="h-4 w-4" /></button>
                    <button onClick={() => setDel(r)} aria-label="Delete" title="Delete" className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10 text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"><Icon name="trash" className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={10} className="px-5 py-12 text-center text-muted-foreground">No records found.</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal open={!!view} onClose={() => setView(null)} wide>
        {view && (
          <div className="p-8">
            <span className="eyebrow">View {def.singular}</span>
            <h2 className="mt-2 pr-10 text-3xl text-navy">{view[def.columns[0]!]}</h2>
            {view["image"] && <div className="mt-5 aspect-[16/8] max-h-56 w-full overflow-hidden rounded"><Img src={view["image"]} alt="" /></div>}
            <dl className="mt-6 divide-y divide-border">
              {def.fields.filter((f) => f.type !== "image").map((f) => <div key={f.key} className="grid gap-1 py-3 sm:grid-cols-3"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{f.label}</dt><dd className="whitespace-pre-line text-sm sm:col-span-2">{view[f.key] || "—"}</dd></div>)}
              <div className="grid gap-1 py-3 sm:grid-cols-3"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</dt><dd><StatusPill s={view.status} /></dd></div>
            </dl>
            <div className="mt-6 flex gap-3"><button onClick={() => { setEdit({ ...view }); setView(null); }} className="btn btn-navy !py-2.5"><Icon name="edit" className="h-4 w-4" />Edit</button><button onClick={() => setView(null)} className="btn btn-outline !py-2.5">Close</button></div>
          </div>
        )}
      </Modal>

      <Modal open={!!edit} onClose={() => setEdit(null)} wide>
        {edit && <EditForm def={def} row={edit} onSave={save} onCancel={() => setEdit(null)} />}
      </Modal>

      <Modal open={!!del} onClose={() => setDel(null)}>
        {del && (
          <div className="p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive"><Icon name="trash" className="h-6 w-6" /></span>
            <h2 className="mt-5 text-3xl text-navy">Delete this {def.singular.toLowerCase()}?</h2>
            <p className="mt-2 text-sm text-muted-foreground">"{del[def.columns[0]!]}" will be permanently removed.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={() => setDel(null)} className="btn btn-outline !py-2.5">Cancel</button>
              <button onClick={() => { remove(def.col, del.id); setDel(null); setToast(`${def.singular} deleted`); }} className="btn !py-2.5 bg-destructive text-destructive-foreground hover:opacity-90">Delete</button>
            </div>
          </div>
        )}
      </Modal>

      {toast && <div role="status" className="page-in fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm text-navy-foreground shadow-lift"><Icon name="check" className="h-4 w-4 text-gold" />{toast}</div>}
    </div>
  );
}

function EditForm({ def, row, onSave, onCancel }: { def: ModuleDef; row: Row; onSave: (r: Row) => void; onCancel: () => void }) {
  const [r, setR] = useState<Row>(row);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const set = (k: string, v: string) => setR({ ...r, [k]: v });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    def.fields.forEach((f) => { if (f.required && !(r[f.key] ?? "").trim()) er[f.key] = `${f.label} is required`; });
    setErrs(er);
    if (!Object.keys(er).length) onSave(r);
  };
  const lbl = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy";
  return (
    <form onSubmit={submit} className="p-8">
      <span className="eyebrow">{row.id ? "Edit" : "Add"} {def.singular}</span>
      <h2 className="mt-2 pr-10 text-3xl text-navy">{row.id ? r[def.columns[0]!] || def.singular : `New ${def.singular}`}</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {def.fields.map((f) => (
          <div key={f.key} className={f.type === "textarea" || f.type === "image" ? "sm:col-span-2" : ""}>
            <label className={lbl} htmlFor={`f-${f.key}`}>{f.label}{f.required && " *"}</label>
            {f.type === "textarea" ? <textarea id={`f-${f.key}`} rows={f.key === "content" ? 7 : 3} className="field" value={r[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />
              : f.type === "select" ? <select id={`f-${f.key}`} className="field" value={r[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)}>{f.options!.map((o) => <option key={o}>{o}</option>)}</select>
              : f.type === "image" ? (
                <div>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {(Object.keys(IMAGES) as ImageKey[]).map((k) => (
                      <button type="button" key={k} onClick={() => set("image", k)} title={IMAGE_LABELS[k]} className={`aspect-square overflow-hidden rounded border-2 ${r["image"] === k ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"}`}><Img src={k} alt={IMAGE_LABELS[k]} /></button>
                    ))}
                  </div>
                  <input className="field mt-3" placeholder="…or paste an image URL (https://)" value={r["image"] && !(r["image"] in IMAGES) ? r["image"] : ""} onChange={(e) => set("image", e.target.value)} />
                </div>
              )
              : <input id={`f-${f.key}`} type={f.type === "date" ? "date" : "text"} className="field" value={r[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />}
            {f.hint && <p className="mt-1 text-xs text-muted-foreground">{f.hint}</p>}
            {errs[f.key] && <p className="mt-1 text-xs text-destructive">{errs[f.key]}</p>}
          </div>
        ))}
        <div>
          <label className={lbl} htmlFor="f-status">Status</label>
          <select id="f-status" className="field" value={r.status} onChange={(e) => set("status", e.target.value)}>{def.statuses.map((s) => <option key={s}>{s}</option>)}</select>
        </div>
      </div>
      <div className="mt-8 flex gap-3"><button type="submit" className="btn btn-navy !py-2.5">Save {def.singular}</button><button type="button" onClick={onCancel} className="btn btn-outline !py-2.5">Cancel</button></div>
    </form>
  );
}
