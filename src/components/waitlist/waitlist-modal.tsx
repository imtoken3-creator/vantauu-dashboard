"use client";

import {
  type FocusEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  LoaderCircle,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import { WAITLIST_ROLES, type WaitlistRole } from "@/lib/waitlist";

type WaitlistModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function WaitlistModal({
  open,
  onOpenChange,
  source = "landing",
}: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WaitlistRole>("Trader");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);

  const resetFormState = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  const closeModal = useCallback(() => {
    onOpenChange(false);
    window.setTimeout(resetFormState, 180);
  }, [onOpenChange, resetFormState]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalOverscrollBehavior = document.documentElement.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "contain";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overscrollBehavior = originalOverscrollBehavior;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, open]);

  function scrollFocusedFieldIntoView(event: FocusEvent<HTMLElement>) {
    const target = event.currentTarget;
    window.setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 160);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, note, source }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        error?: string;
        count?: number;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "Unable to join waitlist.");
      }

      setCount(payload.count ?? null);
      setStatus("success");
      setEmail("");
      setNote("");
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to join waitlist."
      );
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center overflow-hidden px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:items-center sm:px-4 sm:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Dismiss waitlist modal backdrop"
            className="absolute inset-0 bg-black/72 backdrop-blur-sm"
            onClick={closeModal}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="glow-border relative z-10 flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-lg border border-white/10 bg-background/95 shadow-xl shadow-primary/15 backdrop-blur-sm"
            style={{
              maxHeight:
                "min(90vh, calc(100dvh - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 1.5rem))",
            }}
          >
            <div className="absolute inset-0 cyber-grid animated-grid opacity-20" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
            <div className="absolute -right-24 top-10 h-40 w-72 bg-primary/12 blur-2xl" />

            <button
              type="button"
              aria-label="Close waitlist modal"
              className="absolute right-2 top-2 z-30 flex size-12 items-center justify-center rounded-lg border border-white/10 bg-background/95 text-muted-foreground shadow-lg shadow-black/20 transition hover:border-primary/30 hover:text-white focus-visible:text-white sm:right-3 sm:top-3 sm:size-11"
              onClick={closeModal}
            >
              <X className="size-4" />
            </button>

            <div className="relative z-10 shrink-0 px-5 pb-4 pt-5 pr-16 sm:px-6 sm:pt-6">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  <Sparkles className="size-3.5" />
                  Private access
                </div>
                <h2
                  id="waitlist-title"
                  className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                  Join the Vantauu waitlist.
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  Get early access to AI-native on-chain intelligence for
                  traders, researchers, builders, and funds.
                </p>
              </div>
            </div>

            <div className="relative z-10 min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-5"
                >
                  <motion.div
                    initial={{ scale: 0.7, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="mb-5 flex size-12 items-center justify-center rounded-lg border border-emerald-300/30 bg-emerald-300/10 text-emerald-200 shadow-xl shadow-emerald-300/15"
                  >
                    <Check className="size-6" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white">
                    You&apos;re on the list.
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-emerald-100/80">
                    We&apos;ll reach out as Vantauu opens new research cohorts.
                    {count ? ` You are submission #${count}.` : ""}
                  </p>
                  <button
                    type="button"
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-white transition hover:border-emerald-300/30 hover:bg-emerald-300/10"
                    onClick={closeModal}
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex min-h-full flex-col">
                  <div className="grid gap-5 pb-4">
                    <label className="grid gap-2">
                      <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        Work email
                      </span>
                      <input
                        required
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        enterKeyHint="next"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        onFocus={scrollFocusedFieldIntoView}
                        placeholder="you@company.com"
                        className="min-h-12 rounded-lg border border-white/10 bg-black/20 px-4 text-base text-white outline-none transition placeholder:text-muted-foreground focus:border-primary/45 focus:ring-4 focus:ring-primary/10 sm:text-sm"
                      />
                    </label>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        Role
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {WAITLIST_ROLES.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setRole(item)}
                            className={`group flex min-h-12 items-center justify-center gap-2 rounded-lg border px-3 text-sm transition duration-200 ${
                              role === item
                                ? "border-primary/45 bg-primary/15 text-white shadow-lg shadow-primary/10"
                                : "border-white/10 bg-white/[0.04] text-muted-foreground hover:border-primary/25 hover:text-white"
                            }`}
                          >
                            <UserRound className="size-4" />
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="grid gap-2">
                      <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        Context
                      </span>
                      <textarea
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                        onFocus={scrollFocusedFieldIntoView}
                        placeholder="What are you hoping to use Vantauu for?"
                        className="min-h-20 resize-none rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-base leading-6 text-white outline-none transition placeholder:text-muted-foreground focus:border-primary/45 focus:ring-4 focus:ring-primary/10 sm:min-h-24 sm:text-sm"
                      />
                    </label>

                    {error && (
                      <div className="rounded-lg border border-rose-300/20 bg-rose-300/10 px-3 py-2 text-sm text-rose-100">
                        {error}
                      </div>
                    )}
                  </div>

                  <div className="sticky bottom-0 -mx-5 mt-auto border-t border-white/10 bg-background/95 px-5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border border-primary/40 bg-[linear-gradient(135deg,rgba(124,140,255,0.95),rgba(56,189,248,0.84))] px-5 text-sm font-medium text-white shadow-xl shadow-primary/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <LoaderCircle className="size-4 animate-spin" />
                      ) : (
                        <Sparkles className="size-4" />
                      )}
                      Request Access
                      <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
