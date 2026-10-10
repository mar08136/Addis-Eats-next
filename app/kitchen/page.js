import { redirect } from "next/navigation"
import { getSession } from "../../lib/session"
import SignOutButton from "../signin/SignOutButton"

export default async function KitchenPage() {
  const session = await getSession()

  if (!session) {
    redirect("/signin?next=/kitchen")
  }

  if (session.role !== "staff") {
    return (
      <main>
        <h1>Access Denied</h1>
        <p>This page is only available to staff.</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Kitchen Dashboard</h1>
      <p>Welcome, {session.name}.</p>
      <p>Staff access confirmed.</p>

      <SignOutButton />
    </main>
  )
}
