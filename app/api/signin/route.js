import { NextResponse } from "next/server"
import { authenticateUser, createSession } from "../../../lib/session";

export async function POST(request) {
  try {
    const body = await request.json()

    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const user = authenticateUser(email, password)

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    await createSession(user.id)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch {
    return NextResponse.json(
      { error: "Unable to sign in" },
      { status: 500 }
    )
  }
}