"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectTpoProfile } from "@/lib/features/profile/tpoProfileSlice";
import HeaderSection from "@/app/(main)/student/profile/HeaderSection";
import TpoDetails from "@/app/(main)/tpo/profile/TpoDetails";

const Page = () => {

	const profileData = useAppSelector(selectTpoProfile);
 
	if (!profileData || !profileData.profile) {
		return (
			<div className="flex items-center justify-center min-h-[80vh]">
				<p className="text-gray-500 animate-pulse font-medium text-lg">
					Loading TPO Profile...
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
								<TpoDetails 
									employeeId={profile.employeeId}
									designation={profile.designation}
									phoneNumber={profile.phoneNumber}
									cabinLocation={profile.cabinLocation}
								/>
						</div> 

						<div className="lg:col-span-3 space-y-4">
								{/* Additional sections can be added here for future features */}
						</div>
				</div>
		</div>
		);
};

export default Page
