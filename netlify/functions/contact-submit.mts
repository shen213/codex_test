import type { Config } from "@netlify/functions";
import { Pool } from "pg";

type ContactSubmission = {
  name: string;
  phone: string;
  email: string | null;
  destination: string | null;
  message: string;
};

let pool: Pool | null = null;

function getDatabaseUrl() {
  const env = (globalThis as typeof globalThis & {
    Netlify?: { env: { get(key: string): string | undefined } };
  }).Netlify?.env;

  return (
    env?.get("SUPABASE_DB_URL") ??
    env?.get("DATABASE_URL") ??
    process.env.SUPABASE_DB_URL ??
    process.env.DATABASE_URL ??
    ""
  );
}

function getPool() {
  if (pool) return pool;

  const connectionString = getDatabaseUrl();
  if (!connectionString) {
    throw new Error("Missing SUPABASE_DB_URL or DATABASE_URL");
  }

  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 1,
  });

  return pool;
}

function validatePayload(payload: ContactSubmission) {
  if (!payload.name || !payload.phone || !payload.message) {
    throw new Error("Missing required fields");
  }

  if (payload.name.length > 120 || payload.phone.length > 40 || payload.message.length > 4000) {
    throw new Error("Field length exceeded");
  }
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const contentType = req.headers.get("content-type") ?? "";
  let payload: ContactSubmission;

  if (contentType.includes("application/json")) {
    const body = (await req.json()) as Partial<ContactSubmission>;
    payload = {
      name: (body.name ?? "").trim(),
      phone: (body.phone ?? "").trim(),
      email: (body.email ?? "").trim() || null,
      destination: (body.destination ?? "").trim() || null,
      message: (body.message ?? "").trim(),
    };
  } else {
    const formData = await req.formData();
    payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim() || null,
      destination: String(formData.get("destination") ?? "").trim() || null,
      message: String(formData.get("message") ?? "").trim(),
    };
  }

  try {
    validatePayload(payload);
    const db = getPool();

    await db.query(
      `insert into public.contact_submissions (name, phone, email, destination, message)
       values ($1, $2, $3, $4, $5)`,
      [payload.name, payload.phone, payload.email, payload.destination, payload.message],
    );

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 400 });
  }
};

export const config: Config = {
  path: "/api/contact",
};
