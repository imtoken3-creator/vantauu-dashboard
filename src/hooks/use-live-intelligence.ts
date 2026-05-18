"use client";

import { useEffect, useState } from "react";

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

export function useLiveIntelligence(address?: string) {
  const [state, setState] = useState<LiveIntelligenceState>({
    data: LIVE_INTELLIGENCE_FALLBACK,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadLiveIntelligence() {
      setState((current) => ({ ...current, isLoading: true, error: null }));

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

        setState({
          data: payload.data,
          isLoading: false,
          error: payload.ok ? null : fallbackReason,
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
      }
    }

    loadLiveIntelligence();

    return () => controller.abort();
  }, [address]);

  return state;
}
