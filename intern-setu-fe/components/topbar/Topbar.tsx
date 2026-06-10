"use client"
import { Bell, Menu, User } from "lucide-react";
import Button from "../ui/Button";
import ProfileDropDown from "./ProfileDropDown";
import { useEffect, useRef, useState } from "react";
import NotificationDropDown from "./NotificationDropDown";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { callBackend } from "@/actions/backend-proxy";
import { selectActiveFirstLetterOfEmail } from "@/lib/features/profile/selectors";
import { setTpoProfile } from "@/lib/features/profile/tpoProfileSlice";
import { setStudentProfile } from "@/lib/features/profile/studentProfileSlice";
import { setTeacherProfile } from "@/lib/features/profile/teacherProfileSlice";
import { setEmployerProfile } from "@/lib/features/profile/employerProfileSlice";
import { toggleSidebar } from "@/lib/features/uiState/sidebarSlice";


const Topbar = () => {

  const [profileDropDownOpen, setProfileDropDownOpen] =  useState(false);
  const profileDropDownRef = useRef<HTMLDivElement>(null);

  const [notifyDropDownOpen, setNotifyDropDownOpen] =  useState(false);
  const notifyDropDownRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const firstLetterOfEmail = useAppSelector(selectActiveFirstLetterOfEmail);



  useEffect(()=>{
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropDownRef.current && !profileDropDownRef.current.contains(event.target as Node)) {
        setProfileDropDownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  useEffect(() => {
    const handleNotifyClickOutside = (event: MouseEvent) => {
      if (notifyDropDownRef.current && !notifyDropDownRef.current.contains(event.target as Node)) {
        setNotifyDropDownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleNotifyClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleNotifyClickOutside);
    }
  }, [])
  
  const fetchProfile = async () => {
    try {
      const res = await callBackend("/me")
      if(!res.success) throw new Error(res.data);

      if (res.data.role === "STUDENT") {
        dispatch(setStudentProfile(res.data));
      }
      else if (res.data.role === "COLLEGE_ADMIN" || res.data.role === "TPO") {        
        dispatch(setTpoProfile(res.data));
      }
      else if (res.data.role === "TEACHER") {        
        dispatch(setTeacherProfile(res.data));
      }
      else if (res.data.role === "HR" || res.data.role === "RECRUITER") {
        dispatch(setEmployerProfile(res.data));
      }

    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  useEffect(()=>{
    fetchProfile();
  }, [dispatch])


  return (
    <div className="flex justify-between items-center px-2 lg:px-4 py-2  bg-white dark:bg-black  backdrop-blur-md relative">

      <div className="flex gap-2 items-center">
        <Button variant="ghost" 
          onClick={() => dispatch(toggleSidebar())}
        >
          <Menu />
        </Button>
        <img src="/internSetuLogo2.png" alt="" className="h-6" />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Button variant="ghost" onClick={()=> setNotifyDropDownOpen(!notifyDropDownOpen)}>
           <Bell />
          </Button>
          <NotificationDropDown NotificationDropDownOpen={notifyDropDownOpen} NotificationDropDownRef={notifyDropDownRef} /> 
        </div>
        <div className="relative">
          <div 
            className="bg-sky-700 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => setProfileDropDownOpen(!profileDropDownOpen)}  
          >
            {firstLetterOfEmail ? firstLetterOfEmail : <User />}
          </div>
          {
            firstLetterOfEmail && <ProfileDropDown profileDropDownOpen={profileDropDownOpen} profileDropDownRef={profileDropDownRef} />
          }
        </div>
      </div>
    </div>
  );
};

export default Topbar;