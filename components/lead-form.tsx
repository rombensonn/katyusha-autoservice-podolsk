"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PaperPlaneTilt, ShieldCheck } from "@phosphor-icons/react";
import { business } from "@/lib/site-data";
import { contactMethods } from "@/lib/lead-schema";
import { sitePath } from "@/lib/site-path";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  phone: string;
  carBrand: string;
  carModel: string;
  problem: string;
  contactMethod: (typeof contactMethods)[number];
  consent: boolean;
  company: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  carBrand: "",
  carModel: "",
  problem: "",
  contactMethod: "Звонок",
  consent: false,
  company: ""
};

const carModelsByBrand: Record<string, string[]> = {
  LADA: ["Granta", "Vesta", "Niva Travel", "Niva Legend", "Largus", "Xray", "Kalina", "Priora"],
  Haval: ["Jolion", "M6", "F7", "Dargo", "H3", "H5", "H9"],
  Chery: ["Tiggo 4", "Tiggo 7 Pro Max", "Tiggo 8 Pro Max", "Tiggo 9", "Arrizo 8"],
  Geely: ["Monjaro", "Coolray", "Atlas", "Tugella", "Emgrand", "Okavango"],
  Changan: ["UNI-S", "CS55 Plus", "CS35 Plus", "UNI-K", "Alsvin", "CS75 Plus"],
  Belgee: ["X50", "X70"],
  OMODA: ["C5", "S5"],
  JAECOO: ["J7", "J8"],
  EXEED: ["LX", "TXL", "VX", "RX"],
  TANK: ["300", "500"],
  GAC: ["GS3", "GS8", "Empow", "M8"],
  Jetour: ["Dashing", "X70 Plus", "T2"],
  Kaiyi: ["E5", "X3", "X7"],
  Москвич: ["3", "3e", "6", "8"],
  УАЗ: ["Patriot", "Pickup", "Hunter", "Profi"],
  Kia: ["Rio", "Ceed", "Sportage", "Sorento", "K5", "Cerato", "Seltos"],
  Hyundai: ["Solaris", "Creta", "Tucson", "Santa Fe", "Sonata", "Elantra"],
  Toyota: ["Camry", "Corolla", "RAV4", "Land Cruiser Prado", "Land Cruiser 300", "Highlander"],
  Volkswagen: ["Polo", "Tiguan", "Passat", "Jetta", "Touareg"],
  Skoda: ["Rapid", "Octavia", "Kodiaq", "Karoq", "Superb"],
  Renault: ["Logan", "Duster", "Sandero", "Kaptur", "Arkana"],
  Nissan: ["Qashqai", "X-Trail", "Almera", "Terrano", "Teana"],
  Mitsubishi: ["Outlander", "Pajero Sport", "ASX", "Lancer"],
  Mazda: ["CX-5", "Mazda 3", "Mazda 6", "CX-9"],
  Ford: ["Focus", "Mondeo", "Kuga", "Transit"],
  Chevrolet: ["Niva", "Lacetti", "Cruze", "Aveo", "Captiva"],
  BMW: ["3 Series", "5 Series", "X1", "X3", "X5"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLA", "GLC", "GLE"],
  Audi: ["A3", "A4", "A6", "Q3", "Q5", "Q7"],
  "Другая марка": ["Другая модель"]
};

const carBrands = Object.keys(carModelsByBrand);

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const reduceMotion = useReducedMotion();

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const updateCarBrand = (value: string) => {
    setForm((current) => ({ ...current, carBrand: value, carModel: "" }));
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.consent) {
      setStatus("error");
      setMessage("Нужно согласие на обработку персональных данных.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          car: [form.carBrand, form.carModel].filter(Boolean).join(" "),
          problem: form.problem,
          contactMethod: form.contactMethod,
          consent: form.consent,
          company: form.company,
          sourcePage: typeof window !== "undefined" ? window.location.href : "",
          submittedAt: new Date().toISOString()
        })
      });

      const data = (await response.json()) as { success: boolean; message?: string };

      if (!response.ok || !data.success) {
        setStatus("error");
        setMessage(data.message || `Не удалось отправить заявку. Позвоните напрямую: ${business.phoneFormatted}.`);
        return;
      }

      setStatus("success");
      setMessage(data.message || "Заявка отправлена. Сервис свяжется с вами для уточнения деталей и записи.");
      setForm(initialState);
    } catch {
      setStatus("error");
      setMessage(`Не удалось отправить заявку. Позвоните напрямую: ${business.phoneFormatted}.`);
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-white/14 bg-steel-950/78 px-4 py-3 text-base font-normal text-white shadow-inner-line transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] placeholder:text-steel-400 hover:border-signal-300/50 focus:border-signal-300";
  const selectedModels = form.carBrand ? carModelsByBrand[form.carBrand] ?? [] : [];

  return (
    <form
      onSubmit={submit}
      className={cn(
        "glass-panel rounded-[2rem] p-5 md:p-7",
        compact && "shadow-card"
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-extrabold text-white">
          Имя
          <input
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className={fieldClass}
            placeholder="Как к вам обращаться"
          />
        </label>

        <label className="block text-sm font-extrabold text-white">
          Телефон
          <input
            required
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={fieldClass}
            placeholder="+7 (___) ___-__-__"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-extrabold text-white">
          Марка автомобиля
          <select
            value={form.carBrand}
            onChange={(event) => updateCarBrand(event.target.value)}
            className={fieldClass}
          >
            <option value="">Выберите марку</option>
            {carBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-extrabold text-white">
          Модель
          <select
            value={form.carModel}
            onChange={(event) => update("carModel", event.target.value)}
            className={fieldClass}
            disabled={!form.carBrand}
          >
            <option value="">{form.carBrand ? "Выберите модель" : "Сначала марка"}</option>
            {selectedModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block text-sm font-extrabold text-white">
        Что случилось с автомобилем?
        <textarea
          required
          value={form.problem}
          onChange={(event) => update("problem", event.target.value)}
          className={cn(fieldClass, "min-h-28 resize-y")}
          placeholder="Кратко опишите симптомы, задачу или повреждение"
        />
      </label>

      <fieldset className="mt-5">
        <legend className="text-sm font-extrabold text-white">Удобный способ связи</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {contactMethods.map((method) => (
            <label
              key={method}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-lg border px-3 py-3 text-sm font-extrabold transition-colors duration-200",
                form.contactMethod === method
                  ? "border-signal-300 bg-signal-300/13 text-signal-100"
                  : "border-white/14 bg-white/7 text-steel-200 hover:border-signal-300/40"
              )}
            >
              <input
                type="radio"
                name="contactMethod"
                value={method}
                checked={form.contactMethod === method}
                onChange={() => update("contactMethod", method)}
                className="sr-only"
              />
              {method}
            </label>
          ))}
        </div>
      </fieldset>

      <input
        type="text"
        name="company"
        value={form.company}
        onChange={(event) => update("company", event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-steel-200">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-white/30 bg-steel-950 text-katyusha-700"
        />
        <span>
          Я согласен(на) на обработку персональных данных и принимаю{" "}
          <a className="font-bold text-signal-200 underline-offset-4 hover:underline" href={sitePath("/privacy")}>
            Политику обработки персональных данных
          </a>
          .
        </span>
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-full bg-signal-300 px-3 py-2 pl-6 text-sm font-extrabold text-steel-950 shadow-[0_18px_55px_rgba(245,172,19,0.2)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-signal-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? (
            <motion.span
              className="inline-block"
              initial={reduceMotion ? false : { opacity: 0.72 }}
              animate={reduceMotion ? undefined : { opacity: [0.72, 1, 0.72] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
            >
              Отправляем
            </motion.span>
          ) : (
            <span>Отправить заявку</span>
          )}
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-steel-950 text-white transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:scale-105">
            <PaperPlaneTilt className="h-4 w-4" weight="bold" aria-hidden />
          </span>
        </button>
        <p className="flex items-center gap-2 text-sm text-steel-300">
          <ShieldCheck className="h-4 w-4 text-signal-300" weight="duotone" aria-hidden />
          Данные нужны только для связи по заявке.
        </p>
      </div>

      <div aria-live="polite" className="mt-4 min-h-7">
        <AnimatePresence mode="wait">
          {message ? (
            <motion.p
              key={status}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm font-extrabold",
                status === "success"
                  ? "bg-emerald-400/12 text-emerald-100"
                  : "bg-katyusha-500/14 text-katyusha-100"
              )}
            >
              {message}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}
