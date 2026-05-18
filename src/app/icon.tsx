import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          background:
            "linear-gradient(135deg, rgba(124,140,255,1), rgba(56,189,248,0.92))",
          color: "white",
          fontSize: 18,
          fontWeight: 800,
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        V
      </div>
    ),
    size
  );
}
