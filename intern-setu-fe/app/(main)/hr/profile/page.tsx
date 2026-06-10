"use client"

import HeaderSection from "@/app/(main)/student/profile/HeaderSection"
import EmployerDetails from "@/app/(main)/recruiter/profile/EmployerDetails"
import { useAppSelector } from "@/lib/hooks"
import { selectEmployerProfile } from "@/lib/features/profile/employerProfileSlice"

const Page = () => {
  const profileData = useAppSelector(selectEmployerProfile)

  if (!profileData || !profileData.profile) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-gray-500 animate-pulse font-medium text-lg">Loading HR Profile...</p>
      </div>
    )
  }

  const { profile, email, role, id } = profileData

  return (
    <div className="w-full mx-auto px-4 lg:px-8 py-10 ">
      <div className="pb-4">
        <HeaderSection email={email} role={role} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <EmployerDetails
            id={Number(id)}
            email={email}
            role={role as "HR" | "RECRUITER"}
            linkedinProfile={profile.linkedinProfile}
          />
        </div>

        <div className="lg:col-span-3 space-y-4">{/** Reserved for future HR widgets */}</div>
      </div>
    </div>
  )
}

export default Page