import { readFile } from "node:fs/promises";
import path from "node:path";

export function createDishSlug(name) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getDishes() {
  const filePath = path.join(process.cwd(), "public", "menu-data.json");
  const file = await readFile(filePath, "utf8");

  return JSON.parse(file);
}

export async function getDish(slug) {
  const dishes = await getDishes();

  return (
    dishes.find((dish) => createDishSlug(dish.name) === slug) ?? null
  );
}