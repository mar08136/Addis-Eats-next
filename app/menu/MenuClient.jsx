
"use client"

import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import AddToCartButton from "./AddToCartButton"
import fetcher from "../../lib/fetcher"

const categories = [
  "all",
  "fast-food",
  "chicken-fish",
  "sweets",
  "breakfast",
  "drinks",
  "traditional-food",
]

const PAGE_SIZE = 6

export default function MenuClient({ dishes }) {
  const searchParams = useSearchParams()

  const selectedCategory = searchParams.get("category") || "all"
  const search = searchParams.get("q") || ""
  const page = Math.max(1, Number(searchParams.get("page")) || 1)

  const [debouncedSearch, setDebouncedSearch] = useState(search)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const firstPageData = useMemo(
    () => ({
      dishes: dishes.slice(0, PAGE_SIZE),
      page: 1,
      pageSize: PAGE_SIZE,
      total: dishes.length,
      totalPages: Math.ceil(dishes.length / PAGE_SIZE),
    }),
    [dishes]
  )

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams()

    if (debouncedSearch) {
      params.set("search", debouncedSearch)
    }

    if (selectedCategory !== "all") {
      params.set("category", selectedCategory)
    }

    params.set("page", String(page))

    return `/api/dishes?${params.toString()}`
  }, [debouncedSearch, selectedCategory, page])

  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    fallbackData:
      !search && selectedCategory === "all" && page === 1
        ? firstPageData
        : undefined,
    keepPreviousData: true,
  })

  const filteredDishes = data?.dishes || []
  const totalPages = data?.totalPages || 1

  function createPageUrl(nextPage) {
    const params = new URLSearchParams()

    if (selectedCategory !== "all") {
      params.set("category", selectedCategory)
    }

    if (search) {
      params.set("q", search)
    }

    if (nextPage > 1) {
      params.set("page", String(nextPage))
    }

    const query = params.toString()

    return query ? `/menu?${query}` : "/menu"
  }

  return (
    <>
      <div className="menu-controls">
        <form className="menu-search" action="/menu">
          <input
            type="text"
            name="q"
            placeholder="Search for your favorite food..."
            defaultValue={search}
          />

          {selectedCategory !== "all" && (
            <input
              type="hidden"
              name="category"
              value={selectedCategory}
            />
          )}

          <button type="submit">Search</button>
        </form>

        <div className="menu-filters">
          {categories.map((category) => {
            const params = new URLSearchParams()

            if (category !== "all") {
              params.set("category", category)
            }

            if (search) {
              params.set("q", search)
            }

            const query = params.toString()
            const href = query ? `/menu?${query}` : "/menu"

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
            )
          })}
        </div>
      </div>

      <div className="filter-shell">
        {error ? (
          <div className="empty-state">
            <h2>Something went wrong</h2>
            <p>Could not load dishes.</p>
          </div>
        ) : isLoading && !data ? (
          <div className="empty-state">
            <p>Loading dishes...</p>
          </div>
        ) : filteredDishes.length === 0 ? (
          <div className="empty-state">
            <h2>No dishes found</h2>
            <p>Try searching for something else.</p>
          </div>
        ) : (
          <>
            <div className="dishes-grid">
              {filteredDishes.map((dish) => (
                <article key={dish.id} className="dish-card">
                  <Link
                    href={`/menu/${dish.id}`}
                    className="dish-link"
                  >
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      width={400}
                      height={300}
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="dish-image"
                    />

                    <div className="dish-content">
                      <div className="dish-top">
                        <span className="dish-category">
                          {dish.category}
                        </span>

                        <span className="dish-rating">
                          ★ {dish.rating}
                        </span>
                      </div>

                      <h3>{dish.name}</h3>
                      <p>{dish.description}</p>

                      <div className="dish-footer">
                        <strong>{dish.price} ETB</strong>
                      </div>
                    </div>
                  </Link>

                  <div className="dish-cart-action">
                    <AddToCartButton dish={dish} />
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                {page > 1 ? (
                  <Link
                    href={createPageUrl(page - 1)}
                    className="filter-btn"
                  >
                    Previous
                  </Link>
                ) : (
                  <span className="filter-btn disabled">Previous</span>
                )}

                <span>
                  Page {page} of {totalPages}
                </span>

                {page < totalPages ? (
                  <Link
                    href={createPageUrl(page + 1)}
                    className="filter-btn"
                  >
                    Next
                  </Link>
                ) : (
                  <span className="filter-btn disabled">Next</span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
