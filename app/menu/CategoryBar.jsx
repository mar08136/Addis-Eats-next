import Link from "next/link";

export default function CategoryBar({
  categories,
  selectedCategory,
  search,
}) {
  return (
    <div className="menu-filters">
      {categories.map((category) => {
        const params = new URLSearchParams();

        if (category !== "all") {
          params.set("category", category);
        }

        if (search) {
          params.set("q", search);
        }

        const href = params.toString()
          ? `/menu?${params.toString()}`
          : "/menu";

        return (
          <Link
            key={category}
            href={href}
            className={`filter-btn ${
              selectedCategory === category ? "active" : ""
            }`}
          >
            {category === "all"
              ? "All"
              : category.replace("-", " & ")}
          </Link>
        );
      })}
    </div>
  );
}