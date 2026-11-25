import { useSyncExternalStore } from "react";
import { createDefaults, type DB } from "./data";

const KEY = "envisage-demo-data-v1";
let serverState: DB | null = null;
let state: DB | null = null;
const listeners = new Set<() => void>();

function getServer(): DB { return (serverState ??= createDefaults()); }
function getClient(): DB {
  if (state) return state;
  state = createDefaults();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...state, ...(JSON.parse(raw) as Partial<DB>) };
  } catch { /* ignore */ }
  return state;
}

function commit(next: DB) {
  state = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}

export function useDB(): DB {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    getClient,
    getServer,
  );
}

export type CollectionKey = keyof DB;
type Item = { id: string } & Record<string, string>;

export function newId() { return Math.random().toString(36).slice(2, 10); }

export function upsert(col: CollectionKey, item: Item) {
  const db = getClient();
  const list = db[col] as unknown as Item[];
  const exists = list.some((x) => x.id === item.id);
  const next = exists ? list.map((x) => (x.id === item.id ? item : x)) : [item, ...list];
  commit({ ...db, [col]: next });
}
export function remove(col: CollectionKey, id: string) {
  const db = getClient();
  commit({ ...db, [col]: (db[col] as unknown as Item[]).filter((x) => x.id !== id) });
}
export function addEnquiry(e: Omit<Item, "id" | "status" | "date">) {
  upsert("enquiries", { ...e, id: newId(), status: "new", date: new Date().toISOString().slice(0, 10) } as Item);
}
export function resetDemo() { commit(createDefaults()); }

export function isPlaceholder(v?: string) { return !v || v.trim().startsWith("["); }
