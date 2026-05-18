"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function LazyRender({
  children,
  className,
  id,
  minHeight = 360,
  rootMargin = "720px 0px",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  minHeight?: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || shouldRender) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setShouldRender(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={ref} id={id} className={className}>
      {shouldRender ? (
        children
      ) : (
        <div
          aria-hidden
          className="pointer-events-none chart-skeleton opacity-25"
          style={{ minHeight }}
        />
      )}
    </div>
  );
}
