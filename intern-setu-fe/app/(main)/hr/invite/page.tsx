"use client"

import { callBackend } from "@/actions/backend-proxy"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import { useState } from "react"

const page = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<{ msg: string; error: boolean } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInvite = async () => {
    const trimmedEmail = email.trim()
    if (!trimmedEmail || isSubmitting) return

    setStatus(null)
    setIsSubmitting(true)

    try {
      const result = await callBackend(`/company/invite/recruiter?email=${encodeURIComponent(trimmedEmail)}`, "GET")

      if (!result.success) {
        throw new Error(result.data || "Failed to send invite")
      }

      setStatus({ msg: `Invitation sent successfully to ${trimmedEmail}`, error: false })
      setEmail("")
    } catch (error) {
      console.error("Error sending recruiter invite:", error)
      setStatus({ msg: `Failed to send invitation to ${trimmedEmail}`, error: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full mx-auto px-4 lg:px-8 py-10 max-w-3xl">
      <div className="pb-4 mb-6">
        <h1 className="text-2xl font-bold">Invite Recruiter</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Send an invitation to a recruiter to join your company workspace.</p>
      </div>

      {status && (
        <Card
          className={`p-4 mb-6 border-l-4 ${
            status.error
              ? "bg-red-50 dark:bg-red-900/20 border-red-500"
              : "bg-green-50 dark:bg-green-900/20 border-green-500"
          }`}
        >
          <p className={status.error ? "text-red-700 dark:text-red-300" : "text-green-700 dark:text-green-300"}>{status.msg}</p>
        </Card>
      )}

      <Card className="p-6 border border-neutral-300 dark:border-neutral-600">
        <h2 className="text-lg font-bold mb-4">Recruiter Invitation</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Enter the recruiter&apos;s email to send them an invitation.</p>

        <div className="space-y-4">
          <Input
            label="Recruiter Email"
            type="email"
            placeholder="recruiter@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="primary"
            className="w-full"
            onClick={handleInvite}
          >
            {isSubmitting ? "Sending..." : "Send Invitation"}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default page