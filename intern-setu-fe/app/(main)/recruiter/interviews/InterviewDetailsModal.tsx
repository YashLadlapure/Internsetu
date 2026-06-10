"use client";

import { CalendarDays, Copy, Link2, MessageSquareText, UserRound } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { EmployerInterviewScheduleResponse } from "./types";

interface InterviewDetailsModalProps {
    interview: EmployerInterviewScheduleResponse | null;
    onClose: () => void;
}

const typeLabels: Record<string, string> = {
    TECHNICAL: "Technical",
    HR: "HR",
    MANAGERIAL: "Managerial",
    PRE_PLACEMENT: "Pre Placement",
    ONLINE_TEST: "Online Test",
};

const formatDateTime = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat("en-IN", {
        dateStyle: "full",
        timeStyle: "short",
    }).format(date);
};

const InterviewDetailsModal = ({ interview, onClose }: InterviewDetailsModalProps) => {
    if (!interview) {
        return null;
    }

    const applicantName = interview.application.studentName || interview.application.student?.name || "Applicant";
    const applicantEmail = interview.application.studentEmail || interview.application.student?.email || "No email available";
    const internshipTitle = interview.application.internshipTitle || interview.application.internship?.title || "Application";

    const copyMeetingLink = async () => {
        if (!interview.meetingLink) {
            return;
        }

        try {
            await navigator.clipboard.writeText(interview.meetingLink);
        } catch {
            window.open(interview.meetingLink, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Interview Details" className="max-w-3xl">
            <div className="space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold">{interview.title}</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{internshipTitle}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <Tag>{typeLabels[interview.interviewType] ?? interview.interviewType}</Tag>
                        <Tag>{interview.scheduleStatus}</Tag>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 p-4">
                        <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">Applicant</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <UserRound className="w-4 h-4 text-neutral-500" />
                                <span>{applicantName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link2 className="w-4 h-4 text-neutral-500" />
                                <span className="truncate">{applicantEmail}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4 text-neutral-500" />
                                <span>Application ID: {interview.application.id ?? "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 p-4">
                        <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">Schedule</p>
                        <div className="space-y-2 text-sm">
                            <div>
                                <span className="text-neutral-500">Start: </span>
                                <span>{formatDateTime(interview.startTime)}</span>
                            </div>
                            <div>
                                <span className="text-neutral-500">End: </span>
                                <span>{formatDateTime(interview.endTime)}</span>
                            </div>
                            <div>
                                <span className="text-neutral-500">Created: </span>
                                <span>{formatDateTime(interview.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {interview.meetingNotes && (
                    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <MessageSquareText className="w-4 h-4 text-neutral-500" />
                            <h4 className="font-semibold">Meeting Notes</h4>
                        </div>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">{interview.meetingNotes}</p>
                    </div>
                )}

                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-3">
                    <h4 className="font-semibold">Meeting Link</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 break-all">{interview.meetingLink || "No meeting link available"}</p>
                    {interview.meetingLink && (
                        <div className="flex flex-wrap gap-2">
                            <Button onClick={copyMeetingLink} variant="secondary" size="md" className="flex items-center gap-2">
                                <Copy className="w-4 h-4" />
                                Copy Link
                            </Button>
                            <Button onClick={() => window.open(interview.meetingLink, "_blank", "noopener,noreferrer")} size="md" className="flex items-center gap-2">
                                <Link2 className="w-4 h-4" />
                                Open Link
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default InterviewDetailsModal;