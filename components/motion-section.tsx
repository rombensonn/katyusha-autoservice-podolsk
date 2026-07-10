"use client";

import { motion, useReducedMotion } from "motion/react";
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
      data-scroll-section
      aria-labelledby={ariaLabelledby}
      className={className}
      initial={reduceMotion ? false : { y: 28 }}
      whileInView={reduceMotion ? undefined : { y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay }}
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
        "h-full rounded-[1.5rem] border border-steel-200/12 bg-white p-5 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
        className
      )}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}
