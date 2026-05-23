import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { leadSchema, type StoredLead } from "@/lib/lead-schema";
import { saveLead } from "@/lib/lead-storage";
import { sendEmailLead, sendTelegramLead } from "@/lib/notifications";
import { isRateLimited } from "@/lib/rate-limit";
import { normalizePhone } from "@/lib/utils";

const successMessage = "Заявка отправлена. Сервис свяжется с вами для уточнения деталей и записи.";
const errorMessage = "Не удалось отправить заявку. Позвоните напрямую: +7 (910) 000-07-39.";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
    }

    if (parsed.data.company && parsed.data.company.trim().length > 0) {
      return NextResponse.json({ success: true, message: successMessage });
    }

    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown";
    const userAgent = headerList.get("user-agent") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, message: errorMessage }, { status: 429 });
    }

    const receivedAt = new Date().toISOString();
    const lead: StoredLead = {
      name: parsed.data.name,
      phone: parsed.data.phone,
      phoneNormalized: normalizePhone(parsed.data.phone),
      car: parsed.data.car || "",
      problem: parsed.data.problem,
      contactMethod: parsed.data.contactMethod,
      sourcePage: parsed.data.sourcePage || "",
      submittedAt: parsed.data.submittedAt || "",
      receivedAt,
      ip,
      userAgent
    };

    const results = await Promise.allSettled([
      saveLead(lead),
      sendTelegramLead(lead),
      sendEmailLead(lead)
    ]);

    const saved = results[0].status === "fulfilled";
    const telegramOk =
      results[1].status === "fulfilled" && results[1].value.configured && results[1].value.sent;
    const emailOk =
      results[2].status === "fulfilled" && results[2].value.configured && results[2].value.sent;

    if (!saved && !telegramOk && !emailOk) {
      return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: successMessage });
  } catch {
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
