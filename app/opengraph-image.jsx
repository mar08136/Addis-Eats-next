
import { ImageResponse } from "next/og";

export const alt = "Addis Eats food delivery in Addis Ababa";
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "80px",
          background: "#25211f",
          color: "#fffaf7",
          fontFamily: "Arial",
        }}
      >
        <div style={{ fontSize: 34, color: "#e9a15b" }}>
          FOOD DELIVERY IN ADDIS ABABA
        </div>

        <div style={{ marginTop: 30, fontSize: 92, fontWeight: 700 }}>
          Addis Eats
        </div>

        <div style={{ marginTop: 25, fontSize: 36 }}>
          Delicious food, delivered with love.
        </div>
      </div>
    ),
    size
  );
}