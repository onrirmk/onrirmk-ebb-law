"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** "fade" = opacity 0→1, "slideUp" = also translateY 16px→0. Default "fade". */
  variant?: "fade" | "slideUp";
  /** Milliseconds before the transition starts. Use for staggering siblings. */
  delay?: number;
  /** Transition duration in ms. Default 700. */
  duration?: number;
  /** Skip the intersection observer and animate on mount. Use for above-the-fold elements. */
  immediate?: boolean;
  /** Forwarded to the wrapper element. */
  className?: string;
  /** Forwarded to the wrapper element. */
  style?: CSSProperties;
};

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function FadeIn({
  children,
  variant = "fade",
  delay = 0,
  duration = 700,
  immediate = false,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    if (immediate) {
      const t = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(t);
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [immediate]);

  const baseTransform = variant === "slideUp" ? "translateY(16px)" : "none";
  const transform = visible ? "none" : baseTransform;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform,
        transition: `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
        willChange: visible ? undefined : "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
