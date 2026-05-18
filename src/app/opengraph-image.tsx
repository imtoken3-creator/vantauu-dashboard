import { ImageResponse } from "next/og";

export const alt = "Vantauu AI on-chain intelligence terminal";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(circle at 18% 12%, rgba(56,189,248,0.32), transparent 30%), radial-gradient(circle at 82% 18%, rgba(124,140,255,0.38), transparent 34%), linear-gradient(135deg, #070a16 0%, #111832 52%, #080b18 100%)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
          padding: 64,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            opacity: 0.42,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 64,
            right: 64,
            top: 70,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(125,211,252,0.85), transparent)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 18,
            padding: 44,
            background: "rgba(255,255,255,0.045)",
            boxShadow: "0 28px 90px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                border: "1px solid rgba(124,140,255,0.55)",
                background: "rgba(124,140,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9fb3ff",
                fontSize: 28,
              }}
            >
              V
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 22,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Vantauu
              </span>
              <span style={{ marginTop: 6, color: "#9aa7c7", fontSize: 18 }}>
                AI On-chain Intelligence
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                width: 420,
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid rgba(125,211,252,0.25)",
                background: "rgba(56,189,248,0.10)",
                color: "#b9e8ff",
                fontSize: 18,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Real-time AI intelligence terminal
            </div>
            <h1
              style={{
                margin: 0,
                maxWidth: 900,
                fontSize: 76,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 700,
              }}
            >
              Detect capital intent before markets move.
            </h1>
            <p
              style={{
                margin: 0,
                maxWidth: 760,
                color: "#cbd5e1",
                fontSize: 26,
                lineHeight: 1.35,
              }}
            >
              Smart money, capital flow, narratives, wallets, and AI-ranked
              market signals in one command layer.
            </p>
          </div>
        </div>
      </div>
    ),
    size
  );
}
