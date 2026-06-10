"use client"

import { callBackend } from "@/actions/backend-proxy"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const AcceptInvitePage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      setError("Invalid invite link. Token is missing.")
    }
  }, [token])

  const validatePassword = () => {
    if (!password) {
      setError("Password is required")
      return false
    }
    if (password.length < 6 || password.length > 20) {
      setError("Password must be between 6 and 20 characters")
      return false
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    setError(null)

    if (!validatePassword()) {
      return
    }

    try {
      setIsLoading(true)
      const result = await callBackend("/auth/accept-invite", "POST", {
        token,
        password,
      })

      if (!result.success) {
        throw new Error(result.data || "Failed to accept invite")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      console.error("Error accepting invite:", err)
      setError(err instanceof Error ? err.message : "Failed to accept invite. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8 border border-neutral-300 dark:border-neutral-600">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Invalid Invite</h1>
            <p className="text-gray-600 dark:text-gray-400">
              The invite link is invalid or expired. Please contact your administrator.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8 border border-neutral-300 dark:border-neutral-600 bg-green-50 dark:bg-green-900/20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 text-green-700 dark:text-green-300">Success!</h1>
            <p className="text-green-600 dark:text-green-400 mb-4">
              Your account has been created successfully.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Redirecting to login page...
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md p-8 border border-neutral-300 dark:border-neutral-600">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Complete Your Registration</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Set your password to activate your account
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password (6-20 characters)"
          />

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />

          <div className="text-xs text-gray-500 dark:text-gray-400 bg-neutral-100 dark:bg-neutral-800 p-3 rounded">
            <p className="font-semibold mb-1">Password requirements:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Between 6 and 20 characters</li>
              <li>Passwords must match</li>
            </ul>
          </div>

          <Button
            variant="primary"
            className="w-full"
            onClick={handleSubmit}
          >
            {isLoading ? "Setting up account..." : "Complete Registration"}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default AcceptInvitePage
