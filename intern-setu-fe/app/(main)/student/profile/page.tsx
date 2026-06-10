"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectStudentProfile } from "@/lib/features/profile/studentProfileSlice";
import HeaderSection from "@/app/(main)/student/profile/HeaderSection";
import Identity from "@/app/(main)/student/profile/Identity";
import Skills from "@/app/(main)/student/profile/Skills";
import Socials from "@/app/(main)/student/profile/Socials";
import About from "@/app/(main)/student/profile/About";
import Projects from "@/app/(main)/student/profile/Projects";
import Certificates from "@/app/(main)/student/profile/Certificates";
import { useState } from "react";

const Page = () => {

  const profileData = useAppSelector(selectStudentProfile);

  console.log(profileData);
  
 
  if (!profileData || !profileData.profile) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-gray-500 animate-pulse font-medium text-lg">
          Loading Student Profile...
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
                <Identity prn={profile.prn} branch={profile.branch} course={profile.course} graduationYear={profile.graduationYear} resumeLink={profile.resumeLink} panel={profile.panel} gender={profile.gender} phoneNumber={profile.phoneNumber} dateOfBirth={profile.dateOfBirth} />
                <Skills skills={profile.skills} />
                <Socials socials={profile.socials} />
            </div> 

            <div className="lg:col-span-3 space-y-4">
                <About about={profile.about}  />
                <Projects projects={profile.projects} />
                <Certificates certificates={profile.certificates}  />
            </div>
        </div>
    </div>
    );
};

export default Page;
