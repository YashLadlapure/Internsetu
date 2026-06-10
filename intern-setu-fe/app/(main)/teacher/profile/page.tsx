"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectTeacherProfile } from "@/lib/features/profile/teacherProfileSlice";
import HeaderSection from "@/app/(main)/student/profile/HeaderSection";
import TeacherDetails from "@/app/(main)/teacher/profile/TeacherDetails";

const Page = () => {

  const profileData = useAppSelector(selectTeacherProfile);
 
  if (!profileData || !profileData.profile) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-gray-500 animate-pulse font-medium text-lg">
          Loading Teacher Profile...
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
                <TeacherDetails 
                  employeeId={profile.employeeId}
                  designation={profile.designation}
                  department={profile.department}
                  qualification={profile.qualification}
                  specialization={profile.specialization}
                  phoneNumber={profile.phoneNumber}
                  cabinLocation={profile.cabinLocation}
                />
            </div> 

            <div className="lg:col-span-3 space-y-4">
            </div>
        </div>
    </div>
    );
};

export default Page;