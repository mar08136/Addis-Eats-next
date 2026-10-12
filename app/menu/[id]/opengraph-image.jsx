import { ImageResponse } from "next/og";
import { getDish } from "../../../lib/seo-dishes";

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

  // Use the env variable, but fall back gracefully to your main production domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addis-eats-next-4wqn.vercel.app";
  
  const hasValidImage = dish.image && (dish.image.startsWith("http") || dish.image.startsWith("/"));
  const imageUrl = hasValidImage 
    ? (dish.image.startsWith("http") ? dish.image : `${baseUrl}${dish.image}`)
    : null;

  return new ImageResponse(
    (
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={dish.name}
              width="1200"
              height="630"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : (
            <div
              style={{
                fontSize: "32px",
                color: "#e7a15b",
                fontWeight: "bold",
              }}
            >
              {dish.name}
            </div>
          )}
        </div>
      </div>
    ),
    size
  );
}