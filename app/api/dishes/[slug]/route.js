
import { readFile } from "fs/promises";
import path from "path";

export async function GET(request, { params }) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "public", "menu-data.json");
  const file = await readFile(filePath, "utf8");
  const dishes = JSON.parse(file);

  const dish = dishes.find(
    (item) =>
      item.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
  );

  if (!dish) {
    return Response.json({ error: "No such dish" }, { status: 404 });
  }

  return Response.json(dish);
}
