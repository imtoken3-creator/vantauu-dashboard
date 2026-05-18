import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          background:
            "radial-gradient(circle at 24% 18%, rgba(56,189,248,0.85), transparent 38%), linear-gradient(135deg, #111832, #6d7cff 52%, #38bdf8)",
          color: "white",
          fontSize: 96,
          fontWeight: 800,
          fontFamily: "Inter, Arial, sans-serif",
          letterSpacing: "-0.08em",
        }}
      >
        V
      </div>
    ),
    size
  );
}
