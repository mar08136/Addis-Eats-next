import { NextResponse } from "next/server"
import { validateOrder } from "../../lib/orderValidation"
import { getSession } from "../../../lib/session"
import { orders } from "../../lib/orders"

export async function POST(request) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json(
        { error: "You must sign in first" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, phone } = body

    const fieldErrors = {}

    if (typeof name !== "string" || !name.trim()) {
      fieldErrors.name = "Name is required"
    }

    if (typeof phone !== "string" || !phone.trim()) {
      fieldErrors.phone = "Phone is required"
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        { fieldErrors },
        { status: 400 }
      )
    }

    const error = validateOrder(name, phone)

    if (error) {
      return NextResponse.json(
        { fieldErrors: { form: error } },
        { status: 400 }
      )
    }

    const order = {
      id: `order-${Date.now()}`,
      userId: session.id,
      name,
      phone,
      status: "confirmed",
    }

    orders.push(order)

    return NextResponse.json(order, { status: 201 })
  } catch {
    return NextResponse.json(
      { fieldErrors: { form: "Invalid request body" } },
      { status: 400 }
    )
  }
}