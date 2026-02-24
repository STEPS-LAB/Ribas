"use client";

import { type RefObject, useEffect } from "react";

/**
 * Calls handler when a click occurs outside the given ref(s).
 * Uses mousedown + touchstart to close before click completes (better UX for dropdowns).
 */
export function useOnClickOutside(
  ref: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const refs = Array.isArray(ref) ? ref : [ref];
    const isOutside = (target: EventTarget | null): boolean =>
      target instanceof Node && refs.every((r) => r.current && !r.current.contains(target));

    const handle = (e: MouseEvent | TouchEvent) => {
      if (isOutside(e.target)) handler(e);
    };

    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [ref, handler]);
}
