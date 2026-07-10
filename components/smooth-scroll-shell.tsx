"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type LocomotiveScrollInstance = {
  resize?: () => void;
  destroy: () => void;
  scrollTo: (
    target: Element | string | number,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (progress: number) => number;
      immediate?: boolean;
    }
  ) => void;
};

type LocomotiveScrollConstructor = new (options: {
  lenisOptions: {
    wrapper: Window;
    content: HTMLElement;
    lerp: number;
    duration: number;
    wheelMultiplier: number;
    smoothWheel: boolean;
    orientation: "vertical";
    gestureOrientation: "vertical";
  };
  autoStart: boolean;
}) => LocomotiveScrollInstance;

export function SmoothScrollShell({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    let scroll: LocomotiveScrollInstance | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let anchorHandler: ((event: MouseEvent) => void) | null = null;

    async function boot() {
      const el = containerRef.current;

      if (!el) {
        return;
      }

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const desktopPointer = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;

      if (reduceMotion || !desktopPointer) {
        return;
      }

      const LocomotiveScroll = (await import("locomotive-scroll")).default as unknown as LocomotiveScrollConstructor;

      if (cancelled) {
        return;
      }

      scroll = new LocomotiveScroll({
        lenisOptions: {
          wrapper: window,
          content: el,
          lerp: 0.08,
          duration: 0.9,
          wheelMultiplier: 0.92,
          smoothWheel: true,
          orientation: "vertical",
          gestureOrientation: "vertical"
        },
        autoStart: true
      });

      const update = () => scroll?.resize?.();
      anchorHandler = (event) => {
        const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href^='#']");
        const href = anchor?.getAttribute("href");

        if (!anchor || !href || href === "#") {
          return;
        }

        const target = document.querySelector(href);

        if (!target) {
          return;
        }

        event.preventDefault();
        scroll?.scrollTo(target, {
          offset: -96,
          duration: 0.85,
          easing: (progress) => Math.min(1, 1.001 - Math.pow(2, -10 * progress))
        });
        window.history.replaceState(null, "", href);
      };

      document.addEventListener("click", anchorHandler);
      resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(el);
      void document.fonts?.ready.then(update);
      window.setTimeout(update, 500);
    }

    void boot();

    return () => {
      cancelled = true;
      if (anchorHandler) {
        document.removeEventListener("click", anchorHandler);
      }
      resizeObserver?.disconnect();
      scroll?.destroy();
    };
  }, []);

  return (
    <main ref={containerRef} data-scroll-container className={className}>
      {children}
    </main>
  );
}
