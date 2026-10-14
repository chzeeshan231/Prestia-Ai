// LocalStorage-backed mock of the Supabase tables from the SOW (§10).
// Tables: customers, orders, subscriptions, funnel_events, webhook_events,
// idempotency_keys. Plans, funnel steps and legal pages are static config/data.

const PREFIX = "prestia_demo_";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, val: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(val));
  } catch {
    /* storage full / private mode — demo continues in memory */
  }
}

export interface Table<T extends { id: string }> {
  all(): T[];
  get(id: string): T | undefined;
  insert(row: T): T;
  update(id: string, patch: Partial<T>): T | undefined;
  clear(): void;
}

function table<T extends { id: string }>(name: string): Table<T> {
  return {
    all: () => read<T[]>(name, []),
    get: (id) => read<T[]>(name, []).find((r) => r.id === id),
    insert: (row) => {
      const rows = read<T[]>(name, []);
      rows.push(row);
      write(name, rows);
      return row;
    },
    update: (id, patch) => {
      const rows = read<T[]>(name, []);
      const i = rows.findIndex((r) => r.id === id);
      if (i === -1) return undefined;
      rows[i] = { ...rows[i], ...patch };
      write(name, rows);
      return rows[i];
    },
    clear: () => write(name, []),
  };
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  stripeCustomerId: string;
  createdAt: string;
}

export interface IdempotencyRecord {
  id: string; // the idempotency key itself
  result: "succeeded" | "failed" | "requires_action";
  paymentIntentId?: string;
  at: string;
}

import type {
  DemoOrder,
  DemoSubscription,
  FunnelEvent,
  WebhookEvent,
} from "@/lib/types";

export const db = {
  customers: table<Customer>("customers"),
  orders: table<DemoOrder>("orders"),
  subscriptions: table<DemoSubscription>("subscriptions"),
  funnelEvents: table<FunnelEvent>("funnel_events"),
  webhookEvents: table<WebhookEvent>("webhook_events"),
  idempotency: table<IdempotencyRecord>("idempotency_keys"),
  reset() {
    for (const t of [
      this.customers,
      this.orders,
      this.subscriptions,
      this.funnelEvents,
      this.webhookEvents,
      this.idempotency,
    ])
      t.clear();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(PREFIX + "draft");
      window.localStorage.removeItem(PREFIX + "demo_flags");
    }
  },
};

export function getFlags(): { failNextOffSession: boolean } {
  return read("demo_flags", { failNextOffSession: false });
}

export function setFlags(flags: { failNextOffSession: boolean }) {
  write("demo_flags", flags);
}
