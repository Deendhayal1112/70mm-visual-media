"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered only in the browser
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks whether the user has requested reduced motion in their OS / browser settings.
 */
export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Custom React hook for executing GSAP animations within a scoped GSAP Context.
 * Automatically cleans up all animations, tweens, and ScrollTriggers on component unmount.
 */
export function useGsapContext(
  animationFn: (ctx: gsap.Context) => void,
  scopeRef: React.RefObject<HTMLElement | null>,
  dependencies: React.DependencyList = []
) {
  useEffect(() => {
    const element = scopeRef.current;
    if (!element) return;

    if (isReducedMotion()) {
      gsap.set(element.querySelectorAll("[data-animate]"), {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: "all",
      });
      return;
    }

    const ctx = gsap.context((self) => {
      animationFn(self);
    }, element);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopeRef, ...dependencies]);
}

/**
 * Reusable ScrollTrigger reveal animation for section elements.
 */
export function animateOnScroll(
  target: gsap.DOMTarget,
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    start?: string;
    opacity?: number;
  }
) {
  if (isReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 });
    return;
  }

  const {
    y = 30,
    duration = 0.9,
    delay = 0,
    stagger = 0.15,
    start = "top 85%",
  } = options || {};

  gsap.fromTo(
    target,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: target as Element,
        start,
        once: true,
      },
    }
  );
}
