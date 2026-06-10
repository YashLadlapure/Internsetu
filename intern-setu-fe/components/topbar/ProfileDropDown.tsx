"use client"
import { LogOut, MessageCircleMore } from "lucide-react"
import Card from "../ui/Card"
import ToggleTheme from "../theme/ToggleTheme"
import { useAppSelector } from "@/lib/hooks"
import { selectActiveProfile } from "@/lib/features/profile/selectors"
import Link from "next/link"
import { logoutAction } from "@/actions/auth"

const ProfileDropDown = ({profileDropDownOpen, profileDropDownRef}: {profileDropDownOpen: boolean, profileDropDownRef: React.RefObject<HTMLDivElement | null>}) => {

    const profile = useAppSelector(selectActiveProfile);

    
    return (
        <Card 
            ref={profileDropDownRef}
            className={`
                absolute right-0 mt-2 min-w-50
                bg-neutral-200 
                dark:bg-neutral-800
                ${profileDropDownOpen ? 'block' : 'hidden'}
            `}
        >
            <Link href={`/${profile.role.toLowerCase()}/profile`}>
                <div className="flex gap-4 items-center p-4 cursor-pointer">
                    <div className="bg-sky-700 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
                        {profile.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="">
                        <div className="font-semibold w-max">{profile.email.split("@")[0]}</div>
                        <div className="text-sm text-neutral-500 w-max">{profile.role.toLowerCase()}</div>
                    </div>
                </div>
            </Link>
            <div className="w-full border-t border-neutral-400 dark:border-neutral-500"></div>
            <div className="flex flex-col gap-2">
                <div 
                    className="flex gap-2 px-4 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-2"
                    onClick={logoutAction}
                >
                    <LogOut />
                    <div>Logout</div>
                </div>
            </div>
            <div className="w-full border-t border-neutral-400 dark:border-neutral-500"></div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 px-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700">
                    <ToggleTheme /> 
                </div>            
            </div>
            <div className="w-full border-t border-neutral-400 dark:border-neutral-500"></div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2 px-4 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 py-2">
                    <MessageCircleMore />
                    Feedback
                </div>
            </div>
        </Card>
    )
}

export default ProfileDropDown