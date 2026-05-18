export const chartTooltipStyle = {
  background: "rgba(8, 11, 24, 0.96)",
  border: "1px solid rgba(255,255,255,0.13)",
  borderRadius: 8,
  boxShadow: "0 18px 54px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.06)",
  color: "#fff",
};

export const chartTickStyle = {
  fill: "rgba(226,232,240,0.66)",
  fontSize: 12,
};

export const chartGridStroke = "rgba(255,255,255,0.075)";

export const chartAnimationProps = {
  animationDuration: 320,
  animationEasing: "ease-out",
} as const;

export const chartPieAnimationProps = {
  animationDuration: 260,
  animationEasing: "ease-out",
} as const;
