"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarCheck, List, Phone, Wrench, X } from "@phosphor-icons/react";
import { business } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#services", label: "Услуги" },
  { href: "#body", label: "Кузов" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Адрес" }
];

export function SiteHeader({ hrefPrefix = "" }: { hrefPrefix?: string } = {}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const close = () => setOpen(false);
  const withPrefix = (href: string) => `${hrefPrefix}${href}`;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:pt-5">
        <div className="nav-glass mx-auto flex min-h-14 w-full max-w-[1120px] items-center justify-between gap-3 rounded-full px-3 py-2 md:min-h-16 md:px-4">
          <a href={withPrefix("#top")} onClick={close} className="flex min-w-0 cursor-pointer items-center gap-3" aria-label="Катюша, к началу страницы">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/14 bg-signal-300 text-steel-950 shadow-inner-line">
              <Wrench className="h-5 w-5" weight="bold" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-black text-white md:text-base">Катюша</span>
              <span className="hidden text-xs font-bold text-steel-300 sm:block">автосервис в Подольске</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 text-sm font-extrabold text-steel-200 lg:flex" aria-label="Основная навигация">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={withPrefix(item.href)}
                className="cursor-pointer rounded-full px-4 py-2 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${business.phone}`}
              className="hidden min-h-10 cursor-pointer items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm font-extrabold text-white transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-signal-300/50 hover:bg-white/12 sm:inline-flex"
              aria-label={`Позвонить ${business.phoneFormatted}`}
            >
              <Phone className="h-4 w-4" weight="bold" aria-hidden />
              <span className="hidden xl:inline">{business.phoneFormatted}</span>
              <span className="xl:hidden">Позвонить</span>
            </a>
            <a
              href={withPrefix("#lead")}
              onClick={close}
              className="hidden min-h-10 cursor-pointer items-center gap-2 rounded-full bg-signal-300 px-4 py-2 text-sm font-extrabold text-steel-950 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-signal-200 sm:inline-flex"
            >
              <CalendarCheck className="h-4 w-4" weight="bold" aria-hidden />
              Записаться
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/14 bg-white/8 text-white transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/12 lg:hidden"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
            >
              <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
              <List className={cn("absolute h-5 w-5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]", open && "scale-75 opacity-0")} weight="bold" aria-hidden />
              <X className={cn("absolute h-5 w-5 scale-75 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]", open && "scale-100 opacity-100")} weight="bold" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-steel-950/92 px-5 pt-28 backdrop-blur-3xl lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mx-auto flex max-w-md flex-col gap-3" aria-label="Мобильная навигация">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={withPrefix(item.href)}
                  onClick={close}
                  className="rounded-[1.5rem] border border-white/12 bg-white/7 px-5 py-4 text-2xl font-black text-white"
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.52, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={withPrefix("#lead")}
                onClick={close}
                className="mt-3 rounded-full bg-signal-300 px-5 py-4 text-center text-base font-black text-steel-950"
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: navItems.length * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                Записаться
              </motion.a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
