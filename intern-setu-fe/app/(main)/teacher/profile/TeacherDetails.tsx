"use client"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import { updateEmployeeId, updateDesignation, updateDepartment, updateQualification, updateSpecialization, updatePhoneNumber, updateCabinLocation } from "@/lib/features/profile/teacherProfileSlice"
import { useAppDispatch } from "@/lib/hooks"
import { Edit, X } from "lucide-react"
import { useState } from "react"
import { callBackend } from "@/actions/backend-proxy"

interface TeacherDetailsProps {
  employeeId: string | null
  designation: string | null
  department: string | null
  qualification: string | null
  specialization: string | null
  phoneNumber: string | null
  cabinLocation: string | null
}

const TeacherDetails = ({ employeeId, designation, department, qualification, specialization, phoneNumber, cabinLocation }: TeacherDetailsProps) => {
  const [edit, setEdit] = useState(false)
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    employeeId: employeeId || "",
    designation: designation || "",
    department: department || "",
    qualification: qualification || "",
    specialization: specialization || "",
    phoneNumber: phoneNumber || "",
    cabinLocation: cabinLocation || "",
  })

  const handleSave = async () => {
    try {
      const res = await callBackend("/teacher/profile/identity", "PUT", formData)
      if (!res.success) {
        throw new Error(res.data || "Failed to update profile")
      }
      dispatch(updateEmployeeId(formData.employeeId || null))
      dispatch(updateDesignation(formData.designation || null))
      dispatch(updateDepartment(formData.department || null))
      dispatch(updateQualification(formData.qualification || null))
      dispatch(updateSpecialization(formData.specialization || null))
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
      department: department || "",
      qualification: qualification || "",
      specialization: specialization || "",
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
            label="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            placeholder="Enter department"
          />
          <Input
            label="Qualification"
            value={formData.qualification}
            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
            placeholder="Enter qualification"
          />
          <Input
            label="Specialization"
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            placeholder="Enter specialization"
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
              Department
            </p>
            <p className="text-lg font-medium mt-1">{department || "Not provided"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Qualification
            </p>
            <p className="text-lg font-medium mt-1">{qualification || "Not provided"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Specialization
            </p>
            <p className="text-lg font-medium mt-1">{specialization || "Not provided"}</p>
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

export default TeacherDetails
