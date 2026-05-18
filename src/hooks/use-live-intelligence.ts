"use client";

import { useEffect, useMemo, useState } from "react";

import {
  LIVE_INTELLIGENCE_FALLBACK,
  type LiveIntelligenceData,
} from "@/lib/live-intelligence";

type LiveIntelligenceResponse = {
  ok: boolean;
  data: LiveIntelligenceData;
  error?: string;
};

type LiveIntelligenceState = {
  data: LiveIntelligenceData;
  isLoading: boolean;
  error: string | null;
};

const DEFAULT_REFRESH_MS = 60_000;
const MIN_REFRESH_MS = 60_000;

type LiveIntelligenceOptions = {
  refreshMs?: number | false;
};

function resolveRefreshMs(refreshMs: LiveIntelligenceOptions["refreshMs"]) {
  if (refreshMs === false) {
    return false;
  }

  return Math.max(refreshMs ?? DEFAULT_REFRESH_MS, MIN_REFRESH_MS);
}

export function useLiveIntelligence(
  address?: string,
  options: LiveIntelligenceOptions = {}
) {
  const refreshMs = useMemo(
    () => resolveRefreshMs(options.refreshMs),
    [options.refreshMs]
  );
  const [state, setState] = useState<LiveIntelligenceState>({
    data: LIVE_INTELLIGENCE_FALLBACK,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let inFlight = false;

    async function loadLiveIntelligence(background = false) {
      if (inFlight) {
        return;
      }

      inFlight = true;

      if (!background) {
        setState((current) => ({ ...current, isLoading: true, error: null }));
      }

      try {
        const params = address ? `?address=${encodeURIComponent(address)}` : "";
        const response = await fetch(`/api/intelligence${params}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Live data request failed with ${response.status}`);
        }

        const payload = (await response.json()) as LiveIntelligenceResponse;
        const fallbackReason =
          payload.error ??
          payload.data.errors[0] ??
          payload.data.wallet.error ??
          null;

        const nextState: LiveIntelligenceState = {
          data: payload.data,
          isLoading: false,
          error: payload.ok ? null : fallbackReason,
        };

        setState((current) => {
          if (
            background &&
            current.data.updatedAt === nextState.data.updatedAt &&
            current.error === nextState.error
          ) {
            return current;
          }

          return nextState;
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          data: LIVE_INTELLIGENCE_FALLBACK,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Live data is temporarily unavailable",
        });
      } finally {
        inFlight = false;
      }
    }

    loadLiveIntelligence();

    const intervalId =
      refreshMs === false
        ? undefined
        : window.setInterval(() => {
            if (document.visibilityState === "visible") {
              void loadLiveIntelligence(true);
            }
          }, refreshMs);

    return () => {
      controller.abort();

      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [address, refreshMs]);

  return state;
}
