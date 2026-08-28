import { NextResponse } from "next/server";
import { getWriteClient } from "@/sanity/lib/writeClient";
import { fetchPracticeAreas } from "@/sanity/lib/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGE_LEN = 4000;
const MAX_FIELD_LEN = 200;

type Payload = {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  practiceArea?: string;
  message?: string;
  consent?: boolean;
  website?: string; // honeypot — must stay empty
};

function trimField(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields, humans don't. Silently accept
  // (200 OK) so bots don't retry with a different name.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true, dropped: true });
  }

  const name = trimField(body.name, MAX_FIELD_LEN);
  const surname = trimField(body.surname, MAX_FIELD_LEN);
  const email = trimField(body.email, MAX_FIELD_LEN);
  const phone = trimField(body.phone, MAX_FIELD_LEN);
  const practiceAreaSlug = trimField(body.practiceArea, MAX_FIELD_LEN);
  const message = trimField(body.message, MAX_MESSAGE_LEN);
  const consent = body.consent === true;

  if (!name || !surname || !email || !message) {
    return NextResponse.json(
      { error: "Zorunlu alanlar eksik." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Geçerli bir e-posta adresi girin." },
      { status: 400 },
    );
  }

  // Look up the practice area's display title so editors don't have to
  // decode slugs in Studio. Non-blocking: if the lookup fails we still
  // save the submission with just the slug.
  let practiceAreaTitle = "";
  if (practiceAreaSlug) {
    try {
      const areas = await fetchPracticeAreas();
      practiceAreaTitle =
        areas.find((a) => a.slug === practiceAreaSlug)?.title ?? "";
    } catch {
      practiceAreaTitle = "";
    }
  }

  const userAgent = trimField(req.headers.get("user-agent") ?? "", 400);

  try {
    const client = getWriteClient();
    await client.create({
      _type: "contactSubmission",
      submittedAt: new Date().toISOString(),
      status: "new",
      name,
      surname,
      email,
      phone: phone || undefined,
      practiceAreaSlug: practiceAreaSlug || undefined,
      practiceAreaTitle: practiceAreaTitle || undefined,
      message,
      consent,
      userAgent: userAgent || undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] Sanity write failed", e);
    return NextResponse.json(
      { error: "Mesaj kaydedilemedi. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}
