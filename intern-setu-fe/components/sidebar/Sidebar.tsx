"use client"

import {
    Briefcase,
    Calendar,
    FileText,
    Home,
    LayoutDashboard,
    Sparkles,
    User,
    Users,
    CheckCircle,
    GraduationCap,
    ShieldCheck,
    History,
    Settings,
    HelpCircle,
    Menu,
    Building
} from "lucide-react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectActiveProfile } from "@/lib/features/profile/selectors"
import { UserRole } from "@/lib/features/profile/types"
import { RootState } from "@/lib/store"
import Button from "../ui/Button"
import { toggleSidebar } from "@/lib/features/uiState/sidebarSlice"

type NavSection = {
    label?: string;
    items: { name: string; href: string; icon: ReactNode }[];
}

const navByRole: Record<UserRole | "DEFAULT", NavSection[]> = {
    STUDENT: [
        { items: [{ name: "Home", href: "/student/dashboard", icon: <Home /> }] },
        {
            label: "Recruitment",
            items: [
                { name: "Internships", href: "/student/internships", icon: <Briefcase /> },
                { name: "Applications", href: "/student/applications", icon: <FileText /> },
                { name: "Calendar", href: "/student/calendar", icon: <Calendar /> },
            ]
        },
        {
            label: "You",
            items: [
                { name: "My Profile", href: "/student/profile", icon: <User /> },
            ]
        }
    ],
    TEACHER: [
        { items: [{ name: "Dashboard", href: "/teacher/dashboard", icon: <LayoutDashboard /> }] },
        {
            label: "Management",
            items: [
                { name: "Verify Skills", href: "/teacher/verify", icon: <CheckCircle /> },
                { name: "My Batches", href: "/teacher/batches", icon: <GraduationCap /> },
            ]
        },
        {
            label: "Drives",
            items: [
                { name: "Internships", href: "/teacher/internships", icon: <Briefcase /> },
                { name: "Placement Calendar", href: "/teacher/calendar", icon: <Calendar /> },
                { name: 'Applications', href: '/teacher/applications', icon: <FileText /> }
            ]
        },
        { items: [{ name: "Profile", href: "/teacher/profile", icon: <User /> }] }
    ],
    TPO: [
        { items: [{ name: "Dashboard", href: "/tpo/dashboard", icon: <LayoutDashboard /> }] },
        {
            label: "Verification",
            items: [
                { name: "Company Requests", href: "/tpo/companies", icon: <ShieldCheck /> },
                { name: "Student Directory", href: "/tpo/students", icon: <Users /> },
            ]
        },
        {
            label: "Drives",
            items: [
                { name: "Internships", href: "/tpo/internships", icon: <Briefcase /> },
                { name: "Placement Calendar", href: "/tpo/calendar", icon: <Calendar /> },
            ]
        }
    ],
    COLLEGE_ADMIN: [
        { items: [{ name: "Dashboard", href: "/college_admin/dashboard", icon: <LayoutDashboard /> }] },
        {
            label: "Management",
            items: [
                { name: "Invite", href: "/college_admin/invite", icon: <Users /> },
            ],
        },
        {
            label: "Verification",
            items: [
                { name: "Company Requests", href: "/college_admin/companies", icon: <ShieldCheck /> },
                { name: "Student Directory", href: "/college_admin/students", icon: <Users /> },
            ]
        },
        {
            label: "Drives",
            items: [
                { name: "Internships", href: "/college_admin/internships", icon: <Briefcase /> },
                { name: "Placement Calendar", href: "/college_admin/calendar", icon: <Calendar /> },
            ]
        },
        { items: [
            { name: "Profile", href: "/college_admin/profile", icon: <User /> }
        ] },
    ],
    HR: [
        { items: [
                { name: "Dashboard", href: "/hr/dashboard", icon: <LayoutDashboard /> },
                { name: "Colleges", href: "/hr/colleges", icon: <Building /> }
            ]
        },
        {
            label: "Team",
            items: [
                { name: "Invite Recruiters", href: "/hr/invite", icon: <Users /> }
            ],
        },
        {
            label: "Work",
            items: [
                { name: "Internships", href: "/hr/internships", icon: <Briefcase /> },
                { name: "Applications", href: "/hr/applications", icon: <FileText /> },
                { name: "Interviews", href: "/hr/interviews", icon: <Calendar /> },
            ],
        },
        { items: [{ name: "Profile", href: "/hr/profile", icon: <User /> }] },
    ],
    RECRUITER: [
        { 
            items: [
                { name: "Dashboard", href: "/recruiter/dashboard", icon: <LayoutDashboard /> },
                { name: "Colleges", href: "/recruiter/colleges", icon: <Building /> }
            ] 
        },
        
        {
            label: "Work",
            items: [
                { name: "Internships", href: "/recruiter/internships", icon: <Briefcase /> },
                { name: "Applications", href: "/recruiter/applications", icon: <FileText /> },
                { name: "Interviews", href: "/recruiter/interviews", icon: <Calendar /> },
            ],
        },
        { items: [{ name: "Profile", href: "/recruiter/profile", icon: <User /> }] },
    ],
    SUPER_ADMIN: [
        { items: [{ name: "Dashboard", href: "/", icon: <LayoutDashboard /> }] },
        {
            label: "System",
            items: [
                { name: "Audit Logs", href: "/admin/logs", icon: <History /> },
                { name: "Settings", href: "/admin/settings", icon: <Settings /> },
                { name: "Help", href: "/admin/help", icon: <HelpCircle /> },
            ],
        },

    ],
    DEFAULT: [
        { items: [{ name: "Home", href: "/", icon: <Home /> }] },
        { items: [{ name: "Explore", href: "/explore", icon: <Sparkles /> }] }
    ]
}

const Sidebar = () => {
    const pathname = usePathname()
    const activeProfile = useAppSelector(selectActiveProfile)
    const role = (activeProfile?.role as UserRole | undefined) || "DEFAULT"
    const isOpen = useAppSelector((state: RootState) => state.sidebar.isOpen)
    const dispatch = useAppDispatch()

    const sections = useMemo(() => navByRole[role] || navByRole.DEFAULT, [role])

    return (
        <>
            {/* desktop */}
            <aside
                className={`hidden md:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto ${
                    isOpen ? "w-64 px-4" :  "pl-4 px-1"
                }`}
            >
                <div className="flex flex-col gap-2 mt-2">
                    {sections.map((section, idx) => (
                        <div key={idx} className={`${!isOpen ? "" : "border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-2"} last:border-0`}>
                            {isOpen && section.label && (
                                <h3 className="px-4 mb-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                    {section.label}
                                </h3>
                            )}
                            <div className="flex flex-col gap-1">
                                {section.items.map((item) => {
                                    
                                    const active = pathname === item.href;

                                    return <Link 
                                        key={item.name} 
                                        href={item.href}
                                        className={`*
                                            flex gap-4 items-center  p-2
                                            ${active ? "font-semibold bg-neutral-100 dark:bg-neutral-800 rounded" : ""}
                                            hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg
                                            ${
                                                !isOpen ? "justify-center" : ""
                                            }
                                        `}
                                    >
                                        <div>
                                           {item.icon} 
                                        </div>
                                        { isOpen && <span>{item.name}</span>}  
                                    </Link>
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* mobile */}
            <div className={`md:hidden fixed inset-0 z-50 ${isOpen ? "visible" : "invisible"}`}>
                <div 
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => dispatch(toggleSidebar())}
                />
                <aside className={`absolute left-0 top-0 h-full w-64 px-2 lg:px-4 py-2 bg-white dark:bg-neutral-950 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex gap-2 items-center mb-4 ">
                        <Button variant="ghost" 
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <Menu />
                        </Button>
                        <img src="/internSetuLogo2.png" alt="" className="h-6" />
                    </div>
                    <div className="py-2">
                        {sections.map((section, idx) => (
                            <div key={idx} className="mb-4">
                                {section.items.map((item) => {

                                    const active = pathname === item.href;

                                    return <Link 
                                        key={item.name} 
                                        href={item.href}
                                        className={`*
                                            flex gap-4 items-center  p-2
                                            ${active ? "font-semibold bg-neutral-100 dark:bg-neutral-800 rounded" : ""}
                                            hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded
                                        `}
                                    >
                                        <div>
                                           {item.icon} 
                                        </div>
                                        <span>{item.name}</span>  
                                    </Link>
                                })}
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </>
    )
}

export default Sidebar