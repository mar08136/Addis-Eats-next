
import { ImageResponse } from "next/og";
import { getDish } from "../../../lib/seo-dishes";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Addis Eats dish preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return new Response("Dish not found", { status: 404 });
  }

  let imageData = null;

  try {
    const imagePath = path.join(
      process.cwd(),
      "public",
      dish.image.replace(/^\/+/, "")
    );

    const imageBuffer = await readFile(imagePath);
    const base64 = imageBuffer.toString("base64");
    const extension = path.extname(imagePath).toLowerCase();

    const mimeType =
      extension === ".png"
        ? "image/png"
        : extension === ".webp"
          ? "image/webp"
          : extension === ".jpg" || extension === ".jpeg"
            ? "image/jpeg"
            : null;

    if (mimeType) {
      imageData = `data:${mimeType};base64,${base64}`;
    }
  } catch {
    imageData = null;
  }

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "1200px",
        height: "630px",
        padding: "55px",
        backgroundColor: "#211a16",
        color: "#fffaf7",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "52%",
          paddingRight: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "26px",
            color: "#e7a15b",
            marginBottom: "35px",
          }}
        >
          ADDIS EATS
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "56px",
            fontWeight: 700,
            marginBottom: "22px",
          }}
        >
          {dish.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "38px",
            color: "#e7a15b",
            marginBottom: "22px",
          }}
        >
          {dish.price} ETB
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "22px",
            color: "#e8dcd3",
          }}
        >
          Food delivery in Addis Ababa
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "48%",
          height: "520px",
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "#3b2b21",
        }}
      >
        {imageData ? (
          <img
            src={imageData}
            alt={dish.name}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              fontSize: "28px",
              color: "#e7a15b",
            }}
          >
            {dish.name}
          </div>
        )}
      </div>
    </div>,
    size
  );
}
