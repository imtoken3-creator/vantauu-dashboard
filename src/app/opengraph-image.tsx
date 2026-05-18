import { ImageResponse } from "next/og";

export const alt = "VANTAUU AI on-chain intelligence social preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const flowBars = [48, 66, 58, 82, 72, 92, 86, 104, 96, 116];
const heatCells = [
  ["rgba(124,140,255,0.28)", "rgba(56,189,248,0.36)", "rgba(52,211,153,0.24)"],
  ["rgba(56,189,248,0.18)", "rgba(124,140,255,0.44)", "rgba(168,85,247,0.28)"],
  ["rgba(52,211,153,0.34)", "rgba(56,189,248,0.24)", "rgba(124,140,255,0.52)"],
];

function LogoMark({ size: logoSize = 56 }: { size?: number }) {
  return (
    <div
      style={{
        width: logoSize,
        height: logoSize,
        borderRadius: logoSize * 0.22,
        border: "1px solid rgba(255,255,255,0.22)",
        background:
          "radial-gradient(circle at 24% 18%, rgba(56,189,248,0.74), transparent 40%), linear-gradient(135deg, #111832 0%, #6d7cff 52%, #38bdf8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontSize: logoSize * 0.54,
        fontWeight: 900,
        boxShadow: "0 18px 54px rgba(56,189,248,0.2)",
      }}
    >
      V
    </div>
  );
}

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.1)",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.026))",
        padding: "14px 14px 13px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 34,
          height: 3,
          borderRadius: 999,
          background: accent,
        }}
      />
      <div
        style={{
          color: "#8e9bbd",
          fontSize: 12,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div style={{ color: "#ffffff", fontSize: 23, fontWeight: 750 }}>
        {value}
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div
      style={{
        position: "absolute",
        right: 54,
        top: 64,
        width: 486,
        height: 502,
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.13)",
        background:
          "linear-gradient(145deg, rgba(15,23,48,0.96), rgba(8,12,28,0.92) 54%, rgba(5,8,20,0.97))",
        boxShadow:
          "0 34px 110px rgba(0,0,0,0.48), 0 0 0 1px rgba(124,140,255,0.08)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 54,
          borderBottom: "1px solid rgba(255,255,255,0.09)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          background: "rgba(255,255,255,0.025)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#34d399",
              boxShadow: "0 0 18px rgba(52,211,153,0.55)",
            }}
          />
          <span
            style={{
              color: "#dce7ff",
              fontSize: 15,
              fontWeight: 650,
              letterSpacing: "0.03em",
            }}
          >
            AI Command Center
          </span>
        </div>
        <div
          style={{
            color: "#8fa0c7",
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Live Signal
        </div>
      </div>

      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <MetricCard
            label="Net Inflow"
            value="$2.4B"
            accent="linear-gradient(90deg, #7c8cff, #38bdf8)"
          />
          <MetricCard
            label="Smart Wallets"
            value="18.7K"
            accent="linear-gradient(90deg, #38bdf8, #34d399)"
          />
          <MetricCard
            label="AI Signals"
            value="94"
            accent="linear-gradient(90deg, #a855f7, #7c8cff)"
          />
        </div>

        <div
          style={{
            height: 152,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.095)",
            background: "rgba(0,0,0,0.18)",
            padding: "14px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#ffffff", fontSize: 15, fontWeight: 700 }}>
              Capital Flow Intelligence
            </span>
            <span style={{ color: "#7dd3fc", fontSize: 13 }}>+18.4%</span>
          </div>
          <div
            style={{
              height: 92,
              display: "flex",
              alignItems: "flex-end",
              gap: 7,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {flowBars.map((height, index) => (
              <div
                key={`${height}-${index}`}
                style={{
                  width: 31,
                  height: Math.round(height * 0.88),
                  borderRadius: "7px 7px 0 0",
                  background:
                    index > 6
                      ? "linear-gradient(180deg, #b8f3ff, #7c8cff)"
                      : "linear-gradient(180deg, rgba(125,211,252,0.75), rgba(124,140,255,0.32))",
                  opacity: 0.78 + index * 0.018,
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, flex: 1 }}>
          <div
            style={{
              flex: 1,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.095)",
              background: "rgba(255,255,255,0.035)",
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ color: "#ffffff", fontSize: 14, fontWeight: 700 }}>
              Narrative Heatmap
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {heatCells.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} style={{ display: "flex", gap: 6 }}>
                  {row.map((color, cellIndex) => (
                    <div
                      key={`${rowIndex}-${cellIndex}`}
                      style={{
                        width: 48,
                        height: 28,
                        borderRadius: 7,
                        background: color,
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              width: 208,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.095)",
              background: "rgba(255,255,255,0.035)",
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 11,
            }}
          >
            <div style={{ color: "#ffffff", fontSize: 14, fontWeight: 700 }}>
              AI Signal Feed
            </div>
            {[
              ["Whale accumulation", "High"],
              ["AI narrative spike", "Bullish"],
              ["Stablecoin inflow", "Live"],
            ].map(([signal, status]) => (
              <div
                key={signal}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                    paddingBottom: 7,
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span style={{ color: "#b9c4dd", fontSize: 12 }}>{signal}</span>
                <span
                  style={{
                    borderRadius: 999,
                    border: "1px solid rgba(125,211,252,0.25)",
                    background: "rgba(56,189,248,0.1)",
                    color: "#b9e8ff",
                    fontSize: 10,
                    padding: "4px 7px",
                  }}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(circle at 16% 12%, rgba(56,189,248,0.25), transparent 31%), radial-gradient(circle at 82% 18%, rgba(124,140,255,0.31), transparent 34%), linear-gradient(135deg, #060917 0%, #111832 48%, #070a16 100%)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.052) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.052) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            opacity: 0.36,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            top: 64,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(125,211,252,0.78), rgba(124,140,255,0.7), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -120,
            bottom: -150,
            width: 500,
            height: 500,
            borderRadius: 999,
            background: "rgba(56,189,248,0.1)",
          }}
        />
        <DashboardPreview />

        <div
          style={{
            position: "relative",
            width: 622,
            height: "100%",
            padding: "64px 0 58px 64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <LogoMark />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 24,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 800,
                }}
              >
                VANTAUU
              </div>
              <div style={{ marginTop: 6, color: "#9aa7c7", fontSize: 17 }}>
                AI On-chain Intelligence
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                width: 370,
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid rgba(125,211,252,0.24)",
                background: "rgba(56,189,248,0.09)",
                color: "#b9e8ff",
                fontSize: 15,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Institutional AI Intelligence
            </div>
            <h1
              style={{
                margin: 0,
                maxWidth: 560,
                fontSize: 72,
                lineHeight: 0.96,
                letterSpacing: "-0.045em",
                fontWeight: 780,
              }}
            >
              Detect capital intent before markets move.
            </h1>
            <p
              style={{
                margin: 0,
                maxWidth: 492,
                color: "#c6d2ea",
                fontSize: 22,
                lineHeight: 1.38,
              }}
            >
              Smart money, capital flow, narratives, wallets, and AI-ranked
              market signals in one command layer.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {["Smart Money", "Capital Flow", "Narratives", "Alerts"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.11)",
                    background: "rgba(255,255,255,0.045)",
                    color: "#aebbd6",
                    padding: "9px 13px",
                    fontSize: 13,
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    ),
    size
  );
}
