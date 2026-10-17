import { readFile, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { getSession } from "../../../lib/session";

const filePath = path.join(process.cwd(), "public", "menu-data.json");

async function readDishes() {
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content);
}

async function saveDishes(dishes) {
  await writeFile(filePath, JSON.stringify(dishes, null, 2), "utf8");
  revalidatePath("/menu");
  revalidatePath("/dashboard/menu");
}

async function isStaff() {
  const session = await getSession();
  return session?.role === "staff";
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = (searchParams.get("search") || "").toLowerCase();
    const category = (searchParams.get("category") || "").toLowerCase();
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const pageSize = searchParams.get("all") === "true" ? 10000 : 6;

    const dishes = await readDishes();

    const filtered = dishes.filter((dish) => {
      const matchesSearch = (dish.name || "").toLowerCase().includes(search);
      const matchesCategory =
        !category || (dish.category || "").toLowerCase() === category;

      return matchesSearch && matchesCategory;
    });

    const total = filtered.length;

    return Response.json({
      dishes: filtered.slice((page - 1) * pageSize, page * pageSize),
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("GET DISHES ERROR:", error);
    return Response.json({ error: "Could not load dishes." }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await isStaff())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const name = body.name?.trim();
    const category = body.category?.trim();
    const image = body.image?.trim();
    const description = body.description?.trim();
    const price = Number(body.price);

    if (!name || !category || !image || !description ||
        !Number.isFinite(price) || price <= 0) {
      return Response.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const dishes = await readDishes();

    if (dishes.some((dish) => dish.name.toLowerCase() === name.toLowerCase())) {
      return Response.json({ error: "A dish with this name already exists." }, { status: 409 });
    }

    const nextId = Math.max(0, ...dishes.map((dish) => Number(dish.id) || 0)) + 1;
    const dish = {
      id: nextId,
      name,
      category,
      image,
      description,
      price,
      rating: Number(body.rating) || 0,
    };

    dishes.push(dish);
    await saveDishes(dishes);

    return Response.json({ dish }, { status: 201 });
  } catch (error) {
    console.error("ADD DISH ERROR:", error);
    return Response.json({ error: "Could not add the dish." }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!(await isStaff())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const dishes = await readDishes();
    const index = dishes.findIndex(
      (dish) => String(dish.id) === String(body.id)
    );

    if (index === -1) {
      return Response.json({ error: "Dish not found." }, { status: 404 });
    }

    const updated = { ...dishes[index] };

    for (const field of ["name", "category", "image", "description"]) {
      if (typeof body[field] === "string" && body[field].trim()) {
        updated[field] = body[field].trim();
      }
    }

    if (body.price !== undefined) {
      const price = Number(body.price);

      if (!Number.isFinite(price) || price <= 0) {
        return Response.json({ error: "Enter a valid price." }, { status: 400 });
      }

      updated.price = price;
    }

    if (body.rating !== undefined) {
      const rating = Number(body.rating);

      if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
        return Response.json({ error: "Rating must be between 0 and 5." }, { status: 400 });
      }

      updated.rating = rating;
    }

    if (dishes.some((dish, i) =>
      i !== index && dish.name.toLowerCase() === updated.name.toLowerCase()
    )) {
      return Response.json({ error: "Another dish already uses this name." }, { status: 409 });
    }

    dishes[index] = updated;
    await saveDishes(dishes);

    return Response.json({ dish: updated });
  } catch (error) {
    console.error("UPDATE DISH ERROR:", error);
    return Response.json({ error: "Could not update the dish." }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await isStaff())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const dishes = await readDishes();
    const remaining = dishes.filter(
      (dish) => String(dish.id) !== String(body.id)
    );

    if (remaining.length === dishes.length) {
      return Response.json({ error: "Dish not found." }, { status: 404 });
    }

    await saveDishes(remaining);

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE DISH ERROR:", error);
    return Response.json({ error: "Could not remove the dish." }, { status: 500 });
  }
}