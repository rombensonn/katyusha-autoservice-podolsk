import { CalendarCheck, Phone } from "lucide-react";
import { business } from "@/lib/site-data";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/12 bg-steel-950/92 px-4 py-3 shadow-[0_-12px_36px_rgba(0,0,0,0.32)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href={`tel:${business.phone}`}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/16 bg-white/10 px-4 py-3 text-sm font-extrabold text-white"
          aria-label={`Позвонить ${business.phoneFormatted}`}
        >
          <Phone className="h-4 w-4" aria-hidden />
          Позвонить
        </a>
        <a
          href="#lead"
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-katyusha-700 px-4 py-3 text-sm font-extrabold text-white"
        >
          <CalendarCheck className="h-4 w-4" aria-hidden />
          Записаться
        </a>
      </div>
    </div>
  );
}
