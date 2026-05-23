"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Send, ShieldCheck } from "lucide-react";
import { business } from "@/lib/site-data";
import { contactMethods } from "@/lib/lead-schema";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  phone: string;
  car: string;
  problem: string;
  contactMethod: (typeof contactMethods)[number];
  consent: boolean;
  company: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  car: "",
  problem: "",
  contactMethod: "Звонок",
  consent: false,
  company: ""
};

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const reduceMotion = useReducedMotion();

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
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
          ...form,
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
    "mt-2 w-full rounded-lg border border-white/14 bg-steel-950/70 px-4 py-3 text-base text-white shadow-inner-line transition-colors duration-200 placeholder:text-steel-400 hover:border-signal-300/50";

  return (
    <form
      onSubmit={submit}
      className={cn(
        "glass-panel rounded-xl p-5 md:p-7",
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

      <label className="mt-4 block text-sm font-extrabold text-white">
        Марка и модель автомобиля
        <input
          value={form.car}
          onChange={(event) => update("car", event.target.value)}
          className={fieldClass}
          placeholder="Например: Kia Rio, Lada Vesta"
        />
      </label>

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
                  ? "border-signal-300 bg-signal-400/13 text-signal-100"
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
          <a className="font-bold text-signal-200 underline-offset-4 hover:underline" href="/privacy">
            Политику обработки персональных данных
          </a>
          .
        </span>
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-katyusha-700 px-6 py-3 text-sm font-extrabold text-white shadow-soft transition-colors duration-200 hover:bg-katyusha-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <motion.span
              aria-hidden
              className="h-4 w-4 rounded-full border-2 border-white/50 border-t-white"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <Send className="h-4 w-4" aria-hidden />
          )}
          Отправить заявку
        </button>
        <p className="flex items-center gap-2 text-sm text-steel-300">
          <ShieldCheck className="h-4 w-4 text-signal-300" aria-hidden />
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
              className={cn(
                "rounded-lg px-4 py-3 text-sm font-extrabold",
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
