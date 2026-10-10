"use client"

import { useRouter } from "next/navigation"

export default function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    await fetch("/api/signout", {
      method: "POST",
    })

    router.push("/signin")
    router.refresh()
  }

  return (
    <button type="button" onClick={handleSignOut}>
      Sign Out
    </button>
  )
}