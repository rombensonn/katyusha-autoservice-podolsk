"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionSectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
  ariaLabelledby?: string;
};

export function MotionSection({
  id,
  className,
  children,
  delay = 0,
  ariaLabelledby
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}

type MotionCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function MotionCard({ className, children }: MotionCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "h-full rounded-lg border border-steel-200/12 bg-white p-5 shadow-card transition-colors duration-200",
        className
      )}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
