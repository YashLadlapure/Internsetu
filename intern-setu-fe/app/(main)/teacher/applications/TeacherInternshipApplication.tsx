"use client"

import Button from "@/components/ui/Button";
import { CalendarDays, Clock3, Banknote, User, FileText, CheckCircle, XCircle, Clock, ThumbsUp, ThumbsDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { callBackend } from "@/actions/backend-proxy";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import { StudentProfile } from "@/lib/features/profile/types";
import { TpoInternshipsProps } from "../../tpo/internships/TpoInternships";

export interface TeacherInternshipApplicationProps {
        id: number | string;
        internship: TpoInternshipsProps;
        student: StudentProfile;
        appliedAt: string | null;
        status: string | null;
        coverLetter: string | null;
        studentEmail: string;
        appliedWithResumeUrl: string | null;
        questionResponses: Record<string, string>;
        isApproved: boolean;
        reviewNote: string | null;
        reviewedAt: string | null;
}

const TeacherInternshipApplication = () => {

    const [statusFilter, setStatusFilter] = useState("ALL");
    const [approvalFilter, setApprovalFilter] = useState("ALL");
    const [applications, setApplications] = useState<TeacherInternshipApplicationProps[]>([]);
    const [selectedApplication, setSelectedApplication] = useState<number | string | null>(null);
    const [reviewNote, setReviewNote] = useState("");
    const [isApproving, setIsApproving] = useState(false);
    const [selectedApplicationForDisapproval, setSelectedApplicationForDisapproval] = useState<number | string | null>(null);
    const [disapprovalReason, setDisapprovalReason] = useState("");
    const [isDisapproving, setIsDisapproving] = useState(false);

    const filteredApplications = useMemo(
        () => {
            return applications.filter(app => {
                const statusMatch = statusFilter === "ALL" || app.status === statusFilter;
                const approvalMatch = approvalFilter === "ALL" || 
                    (approvalFilter === "APPROVED" && app.isApproved) ||
                    (approvalFilter === "NOT_APPROVED" && !app.isApproved);
                return statusMatch && approvalMatch;
            });
        }, [applications, statusFilter, approvalFilter]
    )

    const fetchApplications = async () => {
        try {
            const res = await callBackend("/teacher/application");
            if(!res.success) throw new Error("Failed to fetch applications");
            setApplications(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchApplications();
    }, [])

    const handleApprove = async (applicationId: number | string) => {
        setIsApproving(true);
        try {
            const res = await callBackend(`/teacher/application/${applicationId}/approve?reviewNote=${encodeURIComponent(reviewNote)}`, "PUT");
            if(!res.success) throw new Error("Failed to approve application");
            
            // Update local state
            setApplications(prev => prev.map(app => 
                app.id === applicationId 
                    ? { ...app, isApproved: true, reviewNote, reviewedAt: new Date().toISOString() }
                    : app
            ));
            
            setSelectedApplication(null);
            setReviewNote("");
        } catch (error) {
            console.log(error);
        } finally {
            setIsApproving(false);
        }
    }

    const handleDisapprove = async (applicationId: number | string) => {
        setIsDisapproving(true);
        try {
            const res = await callBackend(`/teacher/application/${applicationId}/disapprove?reason=${encodeURIComponent(disapprovalReason)}`, "PUT");
            if(!res.success) throw new Error("Failed to disapprove application");
            
            // Update local state
            setApplications(prev => prev.map(app => 
                app.id === applicationId 
                    ? { ...app, isApproved: false, reviewNote: disapprovalReason, reviewedAt: new Date().toISOString() }
                    : app
            ));
            
            setSelectedApplicationForDisapproval(null);
            setDisapprovalReason("");
        } catch (error) {
            console.log(error);
        } finally {
            setIsDisapproving(false);
        }
    }

    const getStatusIcon = (status: string | null) => {
        switch(status) {
            case "APPLIED":
                return <Clock3 className="w-4 h-4 text-yellow-500" />;
            case "REJECTED":
                return <XCircle className="w-4 h-4 text-red-500" />;
            case "SHORTLISTED":
                return <CheckCircle className="w-4 h-4 text-blue-500" />;
            case "INTERVIEWING":
                return <Clock className="w-4 h-4 text-blue-500" />;
            case "SELECTED":
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            default:
                return <Clock className="w-4 h-4 text-neutral-500" />;
        }
    }

    const getStatusColor = (status: string | null) => {
        switch(status) {
            case "APPLIED":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
            case "REJECTED":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
            case "SHORTLISTED":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
            case "INTERVIEWING":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
            case "SELECTED":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
            default:
                return "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100";
        }
    }

    
    return (
            <div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <h1 className="text-xl font-bold">Student Applications</h1>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                    <div className="flex gap-2 items-center flex-wrap">
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Status:</span>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {["ALL", "APPLIED", "REJECTED", "SHORTLISTED", "INTERVIEWING", "SELECTED"].map((f) => (
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
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Approval:</span>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {["ALL", "APPROVED", "NOT_APPROVED"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setApprovalFilter(f)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                                        approvalFilter === f 
                                        ? "bg-black text-white dark:bg-white dark:text-black" 
                                        : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                    }`}
                                >
                                    {f === "NOT_APPROVED" ? "NOT APPROVED" : f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredApplications.map((application) => (
                            <Card key={application.id} className="flex flex-col group h-full border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-all">
                                <div className="p-5 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h2 className="text-lg font-bold">{application.internship.title}</h2>
                                                <Tag size="sm">
                                                    {application.internship.location.replace("_", " ")}
                                                </Tag>
                                            </div>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2">                                                
                                              <User className="w-4 h-4" /> {application.studentEmail}
                                            </p>
                                        </div>
                                    
                                    </div>

                                    <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                                        <div className="flex items-center gap-2">
                                            <Banknote className="w-4 h-4 text-neutral-500" />
                                            <span className="font-medium">Salary:</span>
                                            <span className="text-neutral-600 dark:text-neutral-400">Rs. {typeof application.internship.salary === "number" ? application.internship.salary.toLocaleString() : application.internship.salary}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock3 className="w-4 h-4 text-neutral-500" />
                                            <span className="font-medium">Duration:</span>
                                            <span className="text-neutral-600 dark:text-neutral-400">{application.internship.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(application.status)}
                                            <span className="font-medium">Status:</span>
                                            <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(application.status)}`}>
                                                {application.status || "PENDING"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className=" pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-900 flex flex-wrap gap-3 text-xs text-neutral-600 dark:text-neutral-400">
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="w-4 h-4" />
                                            Applied: {application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : "N/A"}
                                        </span>
                                        {application.appliedWithResumeUrl && (
                                            <a 
                                                href={application.appliedWithResumeUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Resume
                                            </a>
                                        )}
                                    </div>

                                    {application.coverLetter && (
                                        <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-900">
                                            <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3">
                                                <span className="font-medium">Cover Letter:</span> {application.coverLetter}
                                            </p>
                                        </div>
                                    )}

                                    {application.isApproved ? (
                                        <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-900 space-y-2">
                                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
                                                <CheckCircle className="w-4 h-4" />
                                                Approved
                                            </div>
                                            {application.reviewNote && (
                                                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                                                    <span className="font-medium">Review Note:</span> {application.reviewNote}
                                                </p>
                                            )}
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => setSelectedApplicationForDisapproval(application.id)}
                                                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
                                                    variant="primary"
                                                >
                                                    <ThumbsDown className="w-4 h-4" />
                                                    Disapprove Application
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-900 space-y-2">
                                            <Button 
                                                onClick={() => setSelectedApplication(application.id)}
                                                className="w-full flex items-center justify-center gap-2"
                                                variant="primary"
                                            >
                                                <ThumbsUp className="w-4 h-4" />
                                                Approve Application
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredApplications.length === 0 && (
                        <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
                            No applications found
                        </div>
                    )}
                </div>

                {/* Approve Modal */}
                {selectedApplication && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-neutral-900 rounded-lg max-w-md w-full p-6">
                            <h2 className="text-xl font-bold mb-4">Approve Application</h2>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                Add a review note for this application (optional):
                            </p>
                            <textarea
                                value={reviewNote}
                                onChange={(e) => setReviewNote(e.target.value)}
                                placeholder="Enter your review note here..."
                                className="w-full min-h-[120px] p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
                            />
                            <div className="flex gap-3 mt-6">
                                <Button
                                    onClick={() => {
                                        setSelectedApplication(null);
                                        setReviewNote("");
                                    }}
                                    variant="secondary"
                                    className="flex-1"
                                    disabled={isApproving}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => handleApprove(selectedApplication)}
                                    variant="primary"
                                    className="flex-1"
                                    disabled={isApproving}
                                >
                                    {isApproving ? "Approving..." : "Approve"}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Disapprove Modal */}
                {selectedApplicationForDisapproval && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-neutral-900 rounded-lg max-w-md w-full p-6">
                            <h2 className="text-xl font-bold mb-4">Disapprove Application</h2>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                Add a reason for disapproving this application:
                            </p>
                            <textarea
                                value={disapprovalReason}
                                onChange={(e) => setDisapprovalReason(e.target.value)}
                                placeholder="Enter your reason here..."
                                className="w-full min-h-[120px] p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
                            />
                            <div className="flex gap-3 mt-6">
                                <Button
                                    onClick={() => {
                                        setSelectedApplicationForDisapproval(null);
                                        setDisapprovalReason("");
                                    }}
                                    variant="secondary"
                                    className="flex-1"
                                    disabled={isDisapproving}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => handleDisapprove(selectedApplicationForDisapproval)}
                                    variant="primary"
                                    className="flex-1 bg-red-600 hover:bg-red-700"
                                    disabled={isDisapproving}
                                >
                                    {isDisapproving ? "Disapproving..." : "Disapprove"}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default TeacherInternshipApplication