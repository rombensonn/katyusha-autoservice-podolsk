"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";
import { faqItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="bezel-shell">
      <div className="bezel-core divide-y divide-white/10 overflow-hidden">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left text-base font-extrabold text-white transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/7 md:px-6"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <CaretDown
                className={cn("h-5 w-5 shrink-0 text-signal-300 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]", isOpen && "rotate-180")}
                weight="bold"
                aria-hidden
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 leading-7 text-steel-200 md:px-6">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
      </div>
    </div>
  );
}
