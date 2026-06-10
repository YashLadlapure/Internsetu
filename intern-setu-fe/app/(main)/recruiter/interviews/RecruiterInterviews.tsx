"use client";

import { useEffect, useMemo, useState } from "react";
import { callBackend } from "@/actions/backend-proxy";
import Card from "@/components/ui/Card";
import { CalendarClock, CheckCircle2, CircleSlash2, ClipboardList } from "lucide-react";
import InterviewFilters from "./InterviewFilters";
import InterviewCard from "./InterviewCard";
import InterviewDetailsModal from "./InterviewDetailsModal";
import { EmployerInterviewScheduleResponse } from "./types";

const RecruiterInterviews = () => {
    const [interviews, setInterviews] = useState<EmployerInterviewScheduleResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [searchValue, setSearchValue] = useState("");
    const [selectedInterview, setSelectedInterview] = useState<EmployerInterviewScheduleResponse | null>(null);

    const fetchInterviews = async () => {
        try {
            setLoading(true);
            const res = await callBackend("/employer/interview");
            console.log(res);
            
            if (!res.success) {
                throw new Error(res.data || "Failed to fetch interviews");
            }
            console.log(res);
            

            const data = Array.isArray(res.data) ? res.data : [];
            setInterviews(data);
        } catch (error) {
            console.error("Error fetching interviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviews();
    }, []);

    const filteredInterviews = useMemo(() => {
        const query = searchValue.trim().toLowerCase();

        const sortedInterviews = [...interviews].sort((left, right) => {
            const leftTime = new Date(left.startTime).getTime();
            const rightTime = new Date(right.startTime).getTime();
            return rightTime - leftTime;
        });

        return sortedInterviews.filter((interview) => {
            const typeMatch = typeFilter === "ALL" || interview.interviewType === typeFilter;
            const statusMatch = statusFilter === "ALL" || interview.scheduleStatus === statusFilter;
            if (!query) {
                return typeMatch && statusMatch;
            }

            const applicantName = interview.application.studentName || interview.application.student?.name || "";
            const applicantEmail = interview.application.studentEmail || interview.application.student?.email || "";
            const internshipTitle = interview.application.internshipTitle || interview.application.internship?.title || "";
            const searchableText = [
                interview.title,
                interview.meetingLink,
                interview.meetingNotes,
                interview.interviewType,
                interview.scheduleStatus,
                applicantName,
                applicantEmail,
                internshipTitle,
            ]
                .join(" ")
                .toLowerCase();

            return typeMatch && statusMatch && searchableText.includes(query);
        });
    }, [interviews, searchValue, statusFilter, typeFilter]);

    const stats = useMemo(() => {
        return {
            total: interviews.length,
            scheduled: interviews.filter((interview) => interview.scheduleStatus === "SCHEDULED").length,
            completed: interviews.filter((interview) => interview.scheduleStatus === "COMPLETED").length,
            cancelled: interviews.filter((interview) => interview.scheduleStatus === "CANCELLED").length,
        };
    }, [interviews]);

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-xl font-bold">Interviews</h1>
                </div>
            </div>

            <InterviewFilters
                typeFilter={typeFilter}
                statusFilter={statusFilter}
                searchValue={searchValue}
                onTypeChange={setTypeFilter}
                onStatusChange={setStatusFilter}
                onSearchChange={setSearchValue}
            />

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <p className="text-neutral-500">Loading interviews...</p>
                </div>
            ) : filteredInterviews.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                    <p className="text-neutral-500">No interviews found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredInterviews.map((interview) => (
                        <InterviewCard
                            key={interview.id}
                            interview={interview}
                            onViewDetails={setSelectedInterview}
                        />
                    ))}
                </div>
            )}

            <InterviewDetailsModal
                interview={selectedInterview}
                onClose={() => setSelectedInterview(null)}
            />
        </div>
    );
};

export default RecruiterInterviews;