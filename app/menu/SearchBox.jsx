"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import fetcher from "@/lib/fetcher"

export default function SearchBox() {
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  const { data, error, isLoading } = useSWR(
    debouncedSearch
      ? `/api/menu?search=${encodeURIComponent(debouncedSearch)}`
      : null,
    fetcher,
    {
      keepPreviousData: true,
    }
  )

  return (
    <div>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search dishes..."
      />

      {error && <p>Failed to load dishes.</p>}

      {isLoading && !data && <p>Searching...</p>}

      {data && (
        <div>
          {data.map((dish) => (
            <p key={dish.id}>{dish.name}</p>
          ))}
        </div>
      )}
    </div>
  )
}