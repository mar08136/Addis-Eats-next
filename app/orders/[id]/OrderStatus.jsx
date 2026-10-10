"use client"

import useSWR from "swr"
import fetcher from "../../../lib/fetcher"

export default function OrderStatus({ orderId, initialOrder }) {
  const { data, error, isLoading } = useSWR(
    `/api/orders/${orderId}`,
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000,
    }
  )

  if (error) {
    return <p>Failed to load order.</p>
  }

  if (isLoading && !data) {
    return <p>Loading order...</p>
  }

  return (
    <div>
      <h2>Order Status</h2>
      <p>{data.status}</p>
    </div>
  )
}