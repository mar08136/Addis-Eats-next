import { readFile } from "fs/promises"
import path from "path"

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const search = searchParams.get("search")?.toLowerCase() || ""
  const category = searchParams.get("category")?.toLowerCase() || ""
  const page = Number(searchParams.get("page")) || 1
  const pageSize = 6

  const filePath = path.join(
    process.cwd(),
    "public",
    "menu-data.json"
  )

  const file = await readFile(filePath, "utf8")
  const dishes = JSON.parse(file)

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(search)

    const matchesCategory =
      !category ||
      dish.category.toLowerCase() === category

    return matchesSearch && matchesCategory
  })

  const total = filteredDishes.length
  const totalPages = Math.ceil(total / pageSize)

  const start = (page - 1) * pageSize
  const paginatedDishes = filteredDishes.slice(
    start,
    start + pageSize
  )

  return Response.json({
    dishes: paginatedDishes,
    page,
    pageSize,
    total,
    totalPages,
  })
}