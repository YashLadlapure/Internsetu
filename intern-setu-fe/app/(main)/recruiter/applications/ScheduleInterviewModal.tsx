"use client";

import { X } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface ScheduleInterviewModalProps {
    isOpen: boolean;
    title: string;
    interviewType: string;
    interviewDate: string;
    interviewTime: string;
    endTime: string;
    meetingLink: string;
    isLoading: boolean;
    onClose: () => void;
    onSchedule: () => void;
    onTitleChange: (title: string) => void;
    onTypeChange: (type: string) => void;
    onDateChange: (date: string) => void;
    onTimeChange: (time: string) => void;
    onEndTimeChange: (time: string) => void;
    onMeetingLinkChange: (link: string) => void;
}

const ScheduleInterviewModal = ({
    isOpen,
    title,
    interviewType,
    interviewDate,
    interviewTime,
    endTime,
    meetingLink,
    isLoading,
    onClose,
    onSchedule,
    onTitleChange,
    onTypeChange,
    onDateChange,
    onTimeChange,
    onEndTimeChange,
    onMeetingLinkChange
}: ScheduleInterviewModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">Schedule Interview</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                            Interview Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            placeholder="e.g., Backend Developer Final Round"
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                            Interview Type
                        </label>
                        <select
                            value={interviewType}
                            onChange={(e) => onTypeChange(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm"
                        >
                            <option value="">Select Type</option>
                            <option value="TECHNICAL">Technical</option>
                            <option value="HR">HR</option>
                            <option value="MANAGERIAL">Managerial</option>
                            <option value="PRE_PLACEMENT">Pre-Placement</option>
                            <option value="ONLINE_TEST">Online Test</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                value={interviewDate}
                                onChange={(e) => onDateChange(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                                Start Time
                            </label>
                            <input
                                type="time"
                                value={interviewTime}
                                onChange={(e) => onTimeChange(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                            End Time
                        </label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => onEndTimeChange(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                            Meeting Link
                        </label>
                        <input
                            type="url"
                            value={meetingLink}
                            onChange={(e) => onMeetingLinkChange(e.target.value)}
                            placeholder="https://meet.google.com/..."
                            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm"
                        />
                    </div>

                    <Button
                        onClick={onSchedule}
                        disabled={!title || !interviewType || !interviewDate || !interviewTime || !endTime || !meetingLink || isLoading}
                        className="w-full text-sm bg-green-600 hover:bg-green-700"
                        size="md"
                    >
                        {isLoading ? "Scheduling..." : "Schedule Interview"}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ScheduleInterviewModal;
