import { NextResponse } from "next/server"
import { orders } from "../../../lib/orders"
import { getSession } from "../../../../lib/session"

export async function GET(request, { params }) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json(
      { error: "You must sign in first" },
      { status: 401 }
    )
  }

  const { id } = await params

  const order = orders.find(
    (currentOrder) =>
      currentOrder.id === id &&
      currentOrder.userId === session.id
  )

  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(order)
}