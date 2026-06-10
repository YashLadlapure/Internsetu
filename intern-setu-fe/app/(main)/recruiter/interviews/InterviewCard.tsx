"use client";

import { CalendarDays, Clock3, Link2, UserRound, Video } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import { EmployerInterviewScheduleResponse } from "./types";

interface InterviewCardProps {
    interview: EmployerInterviewScheduleResponse;
    onViewDetails: (interview: EmployerInterviewScheduleResponse) => void;
}

const typeLabels: Record<string, string> = {
    TECHNICAL: "Technical",
    HR: "HR",
    MANAGERIAL: "Managerial",
    PRE_PLACEMENT: "Pre Placement",
    ONLINE_TEST: "Online Test",
};

const statusStyles: Record<string, string> = {
    SCHEDULED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    COMPLETED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
};

const formatDateTime = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
};

const InterviewCard = ({ interview, onViewDetails }: InterviewCardProps) => {
    const applicantName = interview.application.studentName || interview.application.student?.name || "Applicant";
    const applicantEmail = interview.application.studentEmail || interview.application.student?.email || "No email available";
    const internshipTitle = interview.application.internshipTitle || interview.application.internship?.title || "Application";

    return (
        <Card className="flex flex-col group h-full border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-all">
            <div className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4 gap-3">
                    <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-lg font-bold line-clamp-2">{interview.title}</h2>
                            <Tag size="sm">{typeLabels[interview.interviewType] ?? interview.interviewType}</Tag>
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                            {internshipTitle}
                        </p>
                    </div>
                    <Tag className={statusStyles[interview.scheduleStatus] ?? ""}>
                        {interview.scheduleStatus}
                    </Tag>
                </div>

                <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                        <UserRound className="w-4 h-4 text-neutral-500" />
                        <span className="font-medium">Applicant:</span>
                        <span className="text-neutral-600 dark:text-neutral-400 truncate">{applicantName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-neutral-500" />
                        <span className="font-medium">Email:</span>
                        <span className="text-neutral-600 dark:text-neutral-400 truncate">{applicantEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-neutral-500" />
                        <span className="font-medium">Start:</span>
                        <span className="text-neutral-600 dark:text-neutral-400">{formatDateTime(interview.startTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock3 className="w-4 h-4 text-neutral-500" />
                        <span className="font-medium">End:</span>
                        <span className="text-neutral-600 dark:text-neutral-400">{formatDateTime(interview.endTime)}</span>
                    </div>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-900 space-y-3">
                    {interview.meetingNotes && (
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                            <span className="font-medium">Notes:</span> {interview.meetingNotes}
                        </p>
                    )}

                    <div className="flex gap-2">
                        {interview.meetingLink ? (
                            <Button
                                variant="secondary"
                                size="md"
                                onClick={() => window.open(interview.meetingLink, "_blank", "noopener,noreferrer")}
                                className="flex-1 flex items-center justify-center gap-2"
                            >
                                <Video className="w-4 h-4" />
                                Join
                            </Button>
                        ) : (
                            <Button variant="secondary" size="md" onClick={() => {}} disabled className="flex-1">
                                No Link
                            </Button>
                        )}
                        <Button size="md" onClick={() => onViewDetails(interview)} className="flex-1">
                            View Details
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default InterviewCard;