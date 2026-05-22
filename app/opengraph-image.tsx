import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tranquilo Vacation Rentals — Playa del Carmen, Mexico";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1B5E4B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#F7F5EF",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Tranquilo Vacation Rentals
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#C9953A",
              fontWeight: 500,
            }}
          >
            Playa del Carmen, Mexico
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#EAF2EE",
              textAlign: "center",
              maxWidth: 600,
            }}
          >
            Hand-picked villas, lofts &amp; condos. Direct booking, no fees.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
