import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import type { IconProps } from "@phosphor-icons/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<IconProps>;

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  className?: string;
  external?: boolean;
  icon?: IconComponent;
  ariaLabel?: string;
};

const variants = {
  primary:
    "bg-signal-300 text-steel-950 shadow-[0_18px_55px_rgba(245,172,19,0.2)] hover:bg-signal-200",
  secondary:
    "border border-white/16 bg-white/9 text-white shadow-inner-line hover:border-signal-300/50 hover:bg-white/13",
  ghost: "border border-transparent text-white/86 hover:border-white/12 hover:bg-white/8",
  light:
    "border border-steel-200 bg-steel-950 text-white shadow-[0_18px_50px_rgba(10,14,18,0.15)] hover:border-signal-300/60"
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
    "group inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-full px-3 py-2 pl-6 text-sm font-extrabold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]",
    variants[variant],
    className
  );

  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:scale-105",
          variant === "primary" ? "bg-steel-950 text-white" : "bg-white/10 text-signal-200",
          variant === "light" && "bg-signal-300 text-steel-950"
        )}
      >
        <Icon className="h-4 w-4 shrink-0" weight="bold" aria-hidden />
      </span>
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
    <div className={cn("max-w-[780px]", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 inline-flex rounded-full border px-3 py-1 text-[0.68rem] font-extrabold uppercase",
            tone === "light"
              ? "border-signal-300/25 bg-signal-300/10 text-signal-200"
              : "border-steel-300 bg-white text-steel-700"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-balance text-[2.45rem] font-black leading-[0.98] md:text-5xl",
          tone === "light" ? "text-white" : "text-steel-950"
        )}
      >
        {title}
      </h2>
      {text ? (
        <p className={cn("mt-5 max-w-[62ch] text-base leading-7 md:text-lg", tone === "light" ? "text-steel-200" : "text-steel-700")}>
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
        "inline-flex max-w-full flex-wrap items-center rounded-full border border-signal-300/35 bg-signal-300/12 px-4 py-2 text-left text-sm font-extrabold leading-5 text-signal-100 shadow-inner-line",
        className
      )}
    >
      {children}
    </span>
  );
}
