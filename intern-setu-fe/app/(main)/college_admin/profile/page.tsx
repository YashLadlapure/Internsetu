"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectTpoProfile } from "@/lib/features/profile/tpoProfileSlice";
import HeaderSection from "@/app/(main)/student/profile/HeaderSection";
import AdminDetails from "./AdminDetails";

const Page = () => {

  const profileData = useAppSelector(selectTpoProfile);
 
  if (!profileData || !profileData.profile) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-gray-500 animate-pulse font-medium text-lg">
          Loading College Admin Profile...
        </p>
      </div>
    );
  }
  
  const { profile, email } = profileData;

  return (
    <div className="w-full mx-auto px-4 lg:px-8 py-10 ">
        
        <div className="pb-4">
            <HeaderSection email={email} role={profileData.role} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-1 space-y-4">
                <AdminDetails 
                  employeeId={profile.employeeId}
                  designation={profile.designation}
                  phoneNumber={profile.phoneNumber}
                  department={undefined}
                />
            </div> 

            <div className="lg:col-span-3 space-y-4">
            </div>
        </div>
    </div>
    );
};

export default Page;
