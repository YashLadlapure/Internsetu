"use client"

import Button from "@/components/ui/Button"
import { Check, X, XCircle } from "lucide-react"
import { useState } from "react"

interface CompanyActionModalProps {
  isOpen: boolean
  action: 'APPROVED' | 'REJECTED' | null
  companyName: string
  onClose: () => void
  onSubmit: (reason: string) => Promise<void>
}

const CompanyActionModal = ({
  isOpen,
  action,
  companyName,
  onClose,
  onSubmit
}: CompanyActionModalProps) => {
  const [reason, setReason] = useState("")
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen || !action) return null

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      await onSubmit(reason.trim())
      setReason("")
    } catch (error) {
      console.error("Error submitting action:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setReason("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {action === 'APPROVED' ? (
              <>
                Approve Company
              </>
            ) : (
              <>
                Reject Company
              </>
            )}
          </h2>
          <button
            onClick={handleClose}
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          You are about to <span className="font-semibold">{action}</span> {" "}
          <span className="font-semibold text-black dark:text-white">{companyName}</span>. 
          Please provide a reason for this action.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={`Enter the reason for ${action === 'APPROVED' ? 'approving' : 'rejecting'} this company...`}
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
            rows={4}
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleClose}
            variant="secondary"
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            disabled={submitting || !reason.trim()}
          >
            {submitting ? 'Processing...' : `Confirm ${action === 'APPROVED' ? 'Approval' : 'Rejection'}`}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyActionModal
