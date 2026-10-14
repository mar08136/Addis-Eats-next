
import { notFound, redirect } from "next/navigation"
import { orders } from "../../lib/orders"
import { getSession } from "../../../lib/session"
import OrderStatus from "./OrderStatus"

export default async function OrderPage({ params }) {
  const session = await getSession()

  if (!session) {
    redirect("/signin")
  }

  const { id } = await params

  const order = orders.find(
    (order) =>
      order.id === id &&
      order.userId === session.id
  )

  if (!order) {
    notFound()
  }

  return (
    <main>
      <OrderStatus
        orderId={id}
        initialOrder={{
          id: order.id,
          status: order.status,
        }}
      />
    </main>
  )
}
