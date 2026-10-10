import { readFile } from "fs/promises";
import path from "path";
import { Suspense } from "react";
import MenuClient from "./MenuClient";

export const revalidate = 3600;

export default async function MenuPage() {
  const filePath = path.join(process.cwd(), "public", "menu-data.json");
  const file = await readFile(filePath, "utf8");
  const dishes = JSON.parse(file);

  return (
    <main className="menu-page">
      <div className="menu-header">
        <p>EXPLORE OUR FOOD</p>
        <h1>OUR MENU</h1>
        <span>{dishes.length} dishes available</span>
      </div>

      <Suspense
        fallback={
          <div className="empty-state">
            <p>Loading menu...</p>
          </div>
        }
      >
        <MenuClient dishes={dishes} />
      </Suspense>
    </main>
  );
}