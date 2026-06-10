"use client"

import Button from "@/components/ui/Button";
import { Plus, MapPin, CalendarDays, Clock3, Banknote } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AddInternshipModal from "./AddInternshipModel";
import { callBackend } from "@/actions/backend-proxy";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectEmployerInternships, setEmployerInternships } from "@/lib/features/employer/employerSlice";



const EmployerInternships = () => {

    const [showAddModal, setShowAddModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [locationFilter, setLocationFilter] = useState("ALL");

    const dispatch = useAppDispatch();
    const internships = useAppSelector(selectEmployerInternships);


    const filteredInternships = useMemo(
        () => {
            return internships.filter(i => {
                const statusMatch = statusFilter === "ALL" || i.status === statusFilter;
                const locationMatch = locationFilter === "ALL" || i.location === locationFilter;
                return statusMatch && locationMatch;
            });
        }, [internships, statusFilter, locationFilter]
    )

    const fetchInternships = async () => {
        try {
            const res = await callBackend("/employer/internship");
            if(!res.success) throw new Error("Failed to fetch internships");
            dispatch(setEmployerInternships(res.data) );
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchInternships();
    }, [dispatch])

    
    return (
            <div>
                {showAddModal && <AddInternshipModal onClose={() => setShowAddModal(false)} />}

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <h1 className="text-xl font-bold">Internships</h1>
                    <Button onClick={() => setShowAddModal(true)} className="flex gap-2">
                        <Plus /> Post Internship
                    </Button>
                    
                </div>

                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex gap-2 items-center flex-wrap">
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Status:</span>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {["ALL", "LIVE", "PENDING", "CLOSED"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setStatusFilter(f)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                        statusFilter === f 
                                        ? "bg-black text-white dark:bg-white dark:text-black" 
                                        : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                    }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex gap-2 items-center flex-wrap">
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Location:</span>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {["ALL", "REMOTE", "ON_SITE", "HYBRID"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setLocationFilter(f)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                        locationFilter === f 
                                        ? "bg-black text-white dark:bg-white dark:text-black" 
                                        : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                    }`}
                                >
                                    {f.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredInternships.map((internship) => (
                            <Card key={internship.id} className="flex flex-col group h-full border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-all">
                                <div className="p-5 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h2 className="text-lg font-bold">{internship.title}</h2>
                                                <Tag size="sm">
                                                    {internship.location.replace("_", " ")}
                                                </Tag>
                                            </div>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2">                                                <span>{internship.college.name}</span>
                                            </p>
                                        </div>
                                        <Tag>
                                            {internship.status}
                                        </Tag>
                                    </div>

                                    <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                                        <div className="flex items-center gap-2">
                                            <Banknote className="w-4 h-4 text-neutral-500" />
                                            <span className="font-medium">Salary:</span>
                                            <span className="text-neutral-600 dark:text-neutral-400">Rs. {typeof internship.salary === "number" ? internship.salary.toLocaleString() : internship.salary}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock3 className="w-4 h-4 text-neutral-500" />
                                            <span className="font-medium">Duration:</span>
                                            <span className="text-neutral-600 dark:text-neutral-400">{internship.duration}</span>
                                        </div>
                                    </div>

                                    <div className=" pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-900 flex flex-wrap gap-3 text-xs text-neutral-600 dark:text-neutral-400">
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="w-4 h-4" />
                                            Start: {internship.startDate}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="w-4 h-4" />
                                            Deadline: {internship.deadline}
                                        </span>
                                    </div>

                                </div>
                            </Card>
                        ))}
                    </div>

                    

                </div>
        </div>
    )
}

export default EmployerInternships