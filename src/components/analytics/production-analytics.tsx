"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type AnalyticsPayload = {
  event: string;
  path: string;
  value?: number;
  rating?: "good" | "needs-improvement" | "poor";
};

const endpoint =
  process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ??
  (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" ? "/api/analytics" : "");

function sendAnalytics(payload: AnalyticsPayload) {
  if (!endpoint || typeof window === "undefined") {
    return;
  }

  const body = JSON.stringify({
    ...payload,
    ts: Date.now(),
    referrer: document.referrer || undefined,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch(endpoint, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true,
  });
}

function rateMetric(value: number, good: number, poor: number) {
  if (value <= good) {
    return "good";
  }

  return value <= poor ? "needs-improvement" : "poor";
}

export function ProductionAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    sendAnalytics({ event: "page_view", path: pathname });
  }, [pathname]);

  useEffect(() => {
    if (!endpoint || typeof PerformanceObserver === "undefined") {
      return;
    }

    const observers: PerformanceObserver[] = [];

    const observe = (
      type: string,
      callback: (entry: PerformanceEntry) => void
    ) => {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach(callback);
        });
        observer.observe({ type, buffered: true });
        observers.push(observer);
      } catch {
        // Some browsers do not support every performance entry type.
      }
    };

    observe("largest-contentful-paint", (entry) => {
      sendAnalytics({
        event: "web_vital_lcp",
        path: pathname,
        value: Math.round(entry.startTime),
        rating: rateMetric(entry.startTime, 2500, 4000),
      });
    });

    observe("layout-shift", (entry) => {
      const layoutShift = entry as PerformanceEntry & {
        value?: number;
        hadRecentInput?: boolean;
      };

      if (layoutShift.hadRecentInput || layoutShift.value == null) {
        return;
      }

      sendAnalytics({
        event: "web_vital_cls",
        path: pathname,
        value: Number(layoutShift.value.toFixed(4)),
        rating: rateMetric(layoutShift.value, 0.1, 0.25),
      });
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [pathname]);

  return null;
}
