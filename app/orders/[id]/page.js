import { orders } from "../../lib/orders"
import OrderStatus from "./OrderStatus"

export default async function OrderPage({ params }) {
  const { id } = await params

  const order = orders.find((order) => order.id === id)

  if (!order) {
    return <p>Order not found.</p>
  }

  return (
    <main>
      <OrderStatus
        orderId={id}
        initialOrder={order}
      />
    </main>
  )
}