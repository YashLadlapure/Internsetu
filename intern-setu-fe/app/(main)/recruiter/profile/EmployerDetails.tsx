"use client"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import { callBackend } from "@/actions/backend-proxy"
import { updateLinkedinProfile } from "@/lib/features/profile/employerProfileSlice"
import { useAppDispatch } from "@/lib/hooks"
import { Edit, X } from "lucide-react"
import { useState } from "react"

interface EmployerDetailsProps {
  id: number
  email: string
  role: "HR" | "RECRUITER"
  linkedinProfile: string | null
}

const EmployerDetails = ({ id, email, role, linkedinProfile }: EmployerDetailsProps) => {
  const [edit, setEdit] = useState(false)
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    linkedinProfile: linkedinProfile || "",
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (saving) return
    setSaving(true)
    try {
      const res = await callBackend("/company/profile", "PUT", { linkedinProfile: formData.linkedinProfile || null })
      if (!res.success) {
        throw new Error(res.data || "Failed to update profile")
      }
      dispatch(updateLinkedinProfile(formData.linkedinProfile || null))
      setEdit(false)
    } catch (error) {
      console.error("Failed to update employer profile:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEdit(false)
    setFormData({ linkedinProfile: linkedinProfile || "" })
  }

  return (
    <Card className="p-6 border border-neutral-300 dark:border-neutral-600">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-extrabold uppercase tracking-wider">Profile Details</h3>
        <Button
          variant="ghost"
          className="px-4"
          onClick={() => {
            if (edit) {
              handleCancel()
            } else {
              setEdit(true)
            }
          }}
        >
          {edit ? <X className="size-4" /> : <Edit className="size-4" />}
        </Button>
      </div>

      {edit ? (
        <div className="space-y-4">
          <Input
            label="LinkedIn Profile"
            value={formData.linkedinProfile}
            onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
            placeholder="https://www.linkedin.com/in/example"
          />
          <div className="flex gap-2">
            <Button variant="primary" onClick={handleSave}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Role</p>
            <p className="text-lg font-medium mt-1">{role}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-lg font-medium mt-1">{email || "Not provided"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">LinkedIn Profile</p>
            <p className="text-lg font-medium mt-1">{linkedinProfile || "Not provided"}</p>
          </div>
        </div>
      )}
    </Card>
  )
}

export default EmployerDetails
