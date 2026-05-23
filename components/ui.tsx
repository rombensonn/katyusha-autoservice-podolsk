import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  className?: string;
  external?: boolean;
  icon?: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  ariaLabel?: string;
};

const variants = {
  primary:
    "bg-katyusha-700 text-white shadow-soft hover:bg-katyusha-800 active:bg-katyusha-900",
  secondary:
    "border border-white/16 bg-white/8 text-white shadow-inner-line backdrop-blur hover:border-signal-300/60 hover:bg-white/12",
  ghost: "text-white/86 hover:bg-white/10",
  light:
    "border border-steel-300 bg-white text-steel-950 shadow-card hover:border-katyusha-300 hover:bg-concrete-50"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
  icon: Icon = ArrowRight,
  ariaLabel
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-extrabold transition-colors duration-200",
    variants[variant],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  id,
  className,
  tone = "dark"
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  id?: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-sm font-extrabold uppercase tracking-[0.18em]",
            tone === "light" ? "text-signal-300" : "text-katyusha-700"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-balance text-3xl font-extrabold leading-tight md:text-4xl",
          tone === "light" ? "text-white" : "text-steel-950"
        )}
      >
        {title}
      </h2>
      {text ? (
        <p className={cn("mt-4 text-lg leading-8", tone === "light" ? "text-steel-200" : "text-steel-700")}>
          {text}
        </p>
      ) : null}
    </div>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full flex-wrap items-center rounded-md border border-signal-300/35 bg-signal-400/12 px-3 py-1.5 text-left text-sm font-extrabold leading-5 text-signal-100 shadow-inner-line",
        className
      )}
    >
      {children}
    </span>
  );
}
