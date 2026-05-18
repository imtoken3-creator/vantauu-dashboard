"use client";

import { memo, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { intelligenceSeries } from "@/data/mock";
import {
  chartAnimationProps,
  chartGridStroke,
  chartTickStyle,
  chartTooltipStyle,
} from "@/lib/chart-style";

function IntelligenceChartClientComponent() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!isReady) {
    return <div className="h-full w-full" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
      <AreaChart
        data={intelligenceSeries}
        margin={{ top: 12, right: 12, left: -12, bottom: 0 }}
      >
        <defs>
          <linearGradient id="smartMoney" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#7c8cff" stopOpacity={0.45} />
            <stop offset="95%" stopColor="#7c8cff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="liquidity" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.34} />
            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={chartGridStroke} vertical={false} />
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={chartTickStyle}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={chartTickStyle}
        />
        <Tooltip contentStyle={chartTooltipStyle} />
        <Area
          {...chartAnimationProps}
          type="monotone"
          dataKey="smartMoney"
          stroke="#7c8cff"
          strokeWidth={2}
          strokeLinecap="round"
          fill="url(#smartMoney)"
        />
        <Area
          {...chartAnimationProps}
          type="monotone"
          dataKey="liquidity"
          stroke="#a855f7"
          strokeWidth={2}
          strokeLinecap="round"
          fill="url(#liquidity)"
        />
        <Area
          {...chartAnimationProps}
          type="monotone"
          dataKey="sentiment"
          stroke="#38bdf8"
          strokeWidth={2}
          strokeLinecap="round"
          fill="transparent"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export const IntelligenceChartClient = memo(IntelligenceChartClientComponent);
