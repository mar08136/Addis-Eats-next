import { readFile } from "node:fs/promises";
import path from "node:path";

export async function getDishes() {
  const filePath = path.join(process.cwd(), "public", "menu-data.json");
  const file = await readFile(filePath, "utf8");

  return JSON.parse(file);
}

export async function getDish(id) {
  const dishes = await getDishes();

  return dishes.find((dish) => String(dish.id) === String(id)) ?? null;
}