"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  BookOpen,
  Braces,
  BrainCircuit,
  Check,
  CircleDollarSign,
  Code2,
  Copy,
  Gauge,
  KeyRound,
  RadioTower,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  WalletCards,
} from "lucide-react";

import {
  apiDocsSections,
  docsNavigation,
  type ApiDocsSection,
  type ApiMethod,
  type DocsSectionId,
} from "@/data/docs";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const navIcons: Record<DocsSectionId, LucideIcon> = {
  introduction: BookOpen,
  authentication: KeyRound,
  "smart-money": BrainCircuit,
  "capital-flow": CircleDollarSign,
  narratives: RadioTower,
  alerts: Bell,
  wallet: WalletCards,
  websocket: Server,
  "rate-limits": Gauge,
  "error-codes": AlertTriangle,
};

const methodStyles: Record<ApiMethod, string> = {
  GET: "border-cyan-300/25 bg-cyan-300/10 text-cyan-200",
  POST: "border-primary/25 bg-primary/10 text-primary",
  STREAM: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
  GUIDE: "border-violet-300/25 bg-violet-300/10 text-violet-200",
  REF: "border-slate-300/20 bg-slate-300/10 text-slate-200",
};

const initialSectionId: DocsSectionId = "introduction";

export function ApiDocsDashboard() {
  const [activeId, setActiveId] = useState<DocsSectionId>(initialSectionId);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const activeSection = useMemo(
    () =>
      apiDocsSections.find((section) => section.id === activeId) ??
      apiDocsSections[0],
    [activeId]
  );

  async function handleCopy(copyKey: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(copyKey);
      window.setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      setCopiedKey(null);
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.08 }}
      className="page-stack"
    >
      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="hero-surface"
      >
        <div className="absolute inset-0 cyber-grid animated-grid opacity-35" />
        <div className="cinematic-gradient absolute inset-0 opacity-25" />
        <div className="scan-line" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
        <div className="absolute -right-20 top-12 h-px w-[34rem] -rotate-12 bg-gradient-to-r from-transparent via-primary/80 to-transparent blur-md" />

        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-end">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              <Sparkles className="size-3.5" />
              Developer portal
            </div>
            <h1 className="text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl xl:text-6xl">
              Build with mock crypto intelligence APIs.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Explore wallet attribution, liquidity flow, narrative signals, and
              alerting contracts in a dark, production-grade docs surface built
              for Web3 AI SaaS workflows.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {[
              ["Base URL", "api.vantauu.dev"],
              ["API Version", "v1 mock"],
              ["Auth Model", "Bearer token"],
            ].map(([label, value]) => (
              <div key={label} className="surface-card">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 font-mono text-sm font-semibold text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)_360px]"
      >
        <DocsSidebar activeId={activeId} onSelect={setActiveId} />

        <main className="min-w-0 space-y-6">
          <EndpointOverview section={activeSection} />
          <ParametersTable section={activeSection} />
          <CodeBlock
            title="Example request"
            label={activeSection.path}
            code={activeSection.requestExample}
            copyKey={`${activeSection.id}-request-main`}
            copiedKey={copiedKey}
            onCopy={handleCopy}
          />
          <CodeBlock
            title="Example response"
            label="application/json"
            code={activeSection.responseExample}
            copyKey={`${activeSection.id}-response-main`}
            copiedKey={copiedKey}
            onCopy={handleCopy}
          />
          <StatusCodes section={activeSection} />
        </main>

        <RightPanel
          section={activeSection}
          copiedKey={copiedKey}
          onCopy={handleCopy}
        />
      </motion.section>
    </motion.div>
  );
}

function DocsSidebar({
  activeId,
  onSelect,
}: {
  activeId: DocsSectionId;
  onSelect: (id: DocsSectionId) => void;
}) {
  return (
    <aside className="section-surface h-fit xl:sticky xl:top-24">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">API Reference</p>
          <h2 className="text-lg font-semibold text-white">Docs navigation</h2>
        </div>
        <BookOpen className="size-5 text-primary" />
      </div>

      <nav className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
        {docsNavigation.map((item) => {
          const Icon = navIcons[item.id];
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "group flex items-center gap-3 rounded-lg border p-3 text-left transition duration-300 hover:-translate-y-0.5",
                isActive
                  ? "border-primary/35 bg-primary/12 shadow-lg shadow-primary/15"
                  : "border-white/10 bg-black/15 hover:border-cyan-300/25 hover:bg-white/[0.055]"
              )}
            >
              <span
                className={cn(
                  "rounded-md border p-2 transition group-hover:scale-105",
                  isActive
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-white/10 bg-white/[0.04] text-muted-foreground group-hover:text-cyan-200"
                )}
              >
                <Icon className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-white">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {item.eyebrow}
                </span>
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function EndpointOverview({ section }: { section: ApiDocsSection }) {
  return (
    <section className="section-surface-grid overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div className="min-w-0">
          <p className="section-eyebrow">Endpoint title</p>
          <div className="flex flex-wrap items-center gap-3">
            <MethodBadge method={section.method} />
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {section.title}
            </h2>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
            {section.description}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <InfoPill label="Latency" value={section.latency} />
          <InfoPill label="Mode" value={section.availability} />
        </div>
      </div>

      <div className="relative mt-6 rounded-lg border border-white/10 bg-black/25 p-4">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <Terminal className="size-4 shrink-0 text-primary" />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Endpoint
          </span>
          <code className="min-w-0 break-all font-mono text-sm text-cyan-100">
            {section.path}
          </code>
        </div>
      </div>

      <div className="relative mt-5 grid gap-3 md:grid-cols-3">
        {section.highlights.map((highlight) => (
          <div key={highlight} className="surface-card">
            <div className="mb-3 flex items-center gap-2 text-primary">
              <ShieldCheck className="size-4" />
              <span className="text-xs uppercase tracking-[0.18em]">
                Contract
              </span>
            </div>
            <p className="text-sm leading-6 text-slate-300">{highlight}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ParametersTable({ section }: { section: ApiDocsSection }) {
  return (
    <section className="section-surface">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Parameters table</p>
          <h2 className="text-lg font-semibold text-white">Request schema</h2>
        </div>
        <Braces className="size-5 text-primary" />
      </div>

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="min-w-[680px] w-full border-collapse text-left">
          <thead className="bg-white/[0.045]">
            <tr className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Required</th>
              <th className="px-4 py-3 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {section.parameters.map((parameter) => (
              <tr
                key={`${section.id}-${parameter.name}`}
                className="border-t border-white/10 transition hover:bg-white/[0.035]"
              >
                <td className="px-4 py-4 font-mono text-sm text-cyan-100">
                  {parameter.name}
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 font-mono text-xs text-primary">
                    {parameter.type}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "rounded-md border px-2 py-1 text-xs font-medium",
                      parameter.required
                        ? "border-rose-300/25 bg-rose-300/10 text-rose-200"
                        : "border-slate-300/15 bg-slate-300/10 text-slate-300"
                    )}
                  >
                    {parameter.required ? "Required" : "Optional"}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm leading-6 text-slate-300">
                  {parameter.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatusCodes({ section }: { section: ApiDocsSection }) {
  return (
    <section className="section-surface">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Status codes</p>
          <h2 className="text-lg font-semibold text-white">Response states</h2>
        </div>
        <Code2 className="size-5 text-primary" />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {section.statusCodes.map((status) => (
          <article key={`${section.id}-${status.code}`} className="interactive-row group">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 font-mono text-sm font-semibold text-cyan-100">
                  {status.code}
                </span>
                <h3 className="font-medium text-white">{status.label}</h3>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-primary" />
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              {status.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RightPanel({
  section,
  copiedKey,
  onCopy,
}: {
  section: ApiDocsSection;
  copiedKey: string | null;
  onCopy: (copyKey: string, value: string) => Promise<void>;
}) {
  return (
    <aside className="section-surface h-fit xl:sticky xl:top-24">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">Sandbox console</p>
          <h2 className="text-lg font-semibold text-white">Live examples</h2>
        </div>
        <Terminal className="size-5 text-primary" />
      </div>

      <div className="mb-4 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.18em] text-cyan-100">
            Mock only
          </span>
          <span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(125,211,252,0.95)]" />
        </div>
        <p className="mt-2 text-xs leading-5 text-cyan-100/75">
          These examples are static contracts for UI development. No real
          backend, database, or live keys are connected.
        </p>
      </div>

      <div className="space-y-4">
        <CompactCodeCard
          title="Example Request"
          code={section.requestExample}
          copyKey={`${section.id}-request-side`}
          copiedKey={copiedKey}
          onCopy={onCopy}
        />
        <CompactCodeCard
          title="Example Response"
          code={section.responseExample}
          copyKey={`${section.id}-response-side`}
          copiedKey={copiedKey}
          onCopy={onCopy}
        />
      </div>
    </aside>
  );
}

function CodeBlock({
  title,
  label,
  code,
  copyKey,
  copiedKey,
  onCopy,
}: {
  title: string;
  label: string;
  code: string;
  copyKey: string;
  copiedKey: string | null;
  onCopy: (copyKey: string, value: string) => Promise<void>;
}) {
  return (
    <section className="section-surface overflow-hidden p-0">
      <CodeHeader
        title={title}
        label={label}
        code={code}
        copyKey={copyKey}
        copiedKey={copiedKey}
        onCopy={onCopy}
      />
      <CodeLines code={code} maxHeight="max-h-[440px]" />
    </section>
  );
}

function CompactCodeCard({
  title,
  code,
  copyKey,
  copiedKey,
  onCopy,
}: {
  title: string;
  code: string;
  copyKey: string;
  copiedKey: string | null;
  onCopy: (copyKey: string, value: string) => Promise<void>;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-black/25">
      <CodeHeader
        title={title}
        label="Mock"
        code={code}
        copyKey={copyKey}
        copiedKey={copiedKey}
        onCopy={onCopy}
        compact
      />
      <CodeLines code={code} maxHeight="max-h-[260px]" compact />
    </div>
  );
}

function CodeHeader({
  title,
  label,
  code,
  copyKey,
  copiedKey,
  onCopy,
  compact,
}: {
  title: string;
  label: string;
  code: string;
  copyKey: string;
  copiedKey: string | null;
  onCopy: (copyKey: string, value: string) => Promise<void>;
  compact?: boolean;
}) {
  const isCopied = copiedKey === copyKey;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.035]",
        compact ? "px-3 py-2.5" : "px-4 py-3"
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="hidden items-center gap-1.5 sm:flex">
          <span className="size-2.5 rounded-full bg-rose-300/80" />
          <span className="size-2.5 rounded-full bg-amber-300/80" />
          <span className="size-2.5 rounded-full bg-emerald-300/80" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
            {label}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => void onCopy(copyKey, code)}
        className="inline-flex shrink-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
      >
        {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {isCopied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function CodeLines({
  code,
  maxHeight,
  compact,
}: {
  code: string;
  maxHeight: string;
  compact?: boolean;
}) {
  const lines = code.trim().split("\n");

  return (
    <pre
      className={cn(
        "overflow-x-auto bg-[radial-gradient(circle_at_top_right,rgba(124,140,255,0.12),transparent_28rem)]",
        maxHeight
      )}
    >
      <code
        className={cn(
          "block min-w-max py-3 font-mono leading-6 text-slate-300",
          compact ? "text-[0.72rem]" : "text-xs sm:text-sm"
        )}
      >
        {lines.map((line, index) => (
          <span
            key={`${index}-${line}`}
            className={cn(
              "grid grid-cols-[2.75rem_1fr] gap-4 px-4 transition hover:bg-white/[0.035]",
              compact && "grid-cols-[2.25rem_1fr] px-3"
            )}
          >
            <span className="select-none text-right text-slate-600">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="whitespace-pre text-slate-300">{line || " "}</span>
          </span>
        ))}
      </code>
    </pre>
  );
}

function MethodBadge({ method }: { method: ApiMethod }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border px-2.5 py-1 font-mono text-xs font-semibold",
        methodStyles[method]
      )}
    >
      {method}
    </span>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
