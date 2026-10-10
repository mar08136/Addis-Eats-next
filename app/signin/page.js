"use client"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError("")
    setLoading(true)

    const next = searchParams.get("next") || "/"

    if (!next.startsWith("/")) {
      setError("Invalid redirect destination")
      setLoading(false)
      return
    }

    const response = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error || "Invalid email or password")
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
  }

  return (
    <main className="signin-page">
      <div className="signin-card">
        <h1>Sign In</h1>

        <p>Sign in to continue to Addis Eats.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <p>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div>
          <p>Demo customer:</p>
          <p>mariam@example.com</p>
          <p>123456</p>
        </div>

        <div>
          <p>Demo staff:</p>
          <p>staff@example.com</p>
          <p>123456</p>
        </div>
      </div>
    </main>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<p>Loading sign in...</p>}>
      <SignInForm />
    </Suspense>
  )
}