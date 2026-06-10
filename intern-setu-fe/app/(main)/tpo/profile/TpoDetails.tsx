"use client"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import { updateEmployeeId, updateDesignation, updatePhoneNumber, updateCabinLocation } from "@/lib/features/profile/tpoProfileSlice"
import { useAppDispatch } from "@/lib/hooks"
import { Edit, X } from "lucide-react"
import { useState } from "react"
import { callBackend } from "@/actions/backend-proxy"

interface TpoDetailsProps {
  employeeId: string | null
  designation: string | null
  phoneNumber: string | null
  cabinLocation: string | null
}

const TpoDetails = ({ employeeId, designation, phoneNumber, cabinLocation }: TpoDetailsProps) => {
  const [edit, setEdit] = useState(false)
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    employeeId: employeeId || "",
    designation: designation || "",
    phoneNumber: phoneNumber || "",
    cabinLocation: cabinLocation || "",
  })

  const handleSave = async () => {
    try {
      const res = await callBackend("/tpo/profile/identity", "PUT", formData)
      if (!res.success) {
        throw new Error(res.data || "Failed to update profile")
      }
      dispatch(updateEmployeeId(formData.employeeId || null))
      dispatch(updateDesignation(formData.designation || null))
      dispatch(updatePhoneNumber(formData.phoneNumber || null))
      dispatch(updateCabinLocation(formData.cabinLocation || null))
      setEdit(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const handleCancel = () => {
    setEdit(false)
    setFormData({
      employeeId: employeeId || "",
      designation: designation || "",
      phoneNumber: phoneNumber || "",
      cabinLocation: cabinLocation || "",
    })
  }

  return (
    <Card className="p-6 border border-neutral-300 dark:border-neutral-600">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-extrabold uppercase tracking-wider">
          Profile Details
        </h3>
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
            label="Employee ID"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            placeholder="Enter employee ID"
          />
          <Input
            label="Designation"
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            placeholder="Enter designation"
          />
          <Input
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            placeholder="Enter phone number"
          />
          <Input
            label="Cabin Location"
            value={formData.cabinLocation}
            onChange={(e) => setFormData({ ...formData, cabinLocation: e.target.value })}
            placeholder="Enter cabin location"
          />
          <div className="flex gap-2">
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Employee ID
            </p>
            <p className="text-lg font-medium mt-1">{employeeId || "Not provided"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Designation
            </p>
            <p className="text-lg font-medium mt-1">{designation || "Not provided"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Phone Number
            </p>
            <p className="text-lg font-medium mt-1">{phoneNumber || "Not provided"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Cabin Location
            </p>
            <p className="text-lg font-medium mt-1">{cabinLocation || "Not provided"}</p>
          </div>
        </div>
      )}
    </Card>
  )
}

export default TpoDetails
