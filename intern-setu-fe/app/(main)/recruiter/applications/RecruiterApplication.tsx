"use client"

import { FileText, Mail, CalendarDays, User, Download, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { callBackend } from "@/actions/backend-proxy";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import Modal from "@/components/ui/Modal";
import { EmployerInternshipsProps } from "@/lib/features/employer/employerSlice"
import { StudentProfile } from "@/lib/features/profile/types"
import Button from "@/components/ui/Button";
import StatusChangeModal from "./StatusChangeModal";
import ScheduleInterviewModal from "./ScheduleInterviewModal";
import SendEmailModal from "./SendEmailModal";

export interface RecruiterInternshipApplication {
    id: number,
    internship: EmployerInternshipsProps,
    student: StudentProfile,
    studentEmail: string,
    appliedAt: string,
    status: "APPLIED" | "SHORTLISTED" | "INTERVIEWING" | "SELECTED" | "REJECTED", 
    coverLetter: string,
    appliedWithResumeUrl: string,
    questionResponses: Record<string, string>,
    reviewNote: string,
    reviewedAt: string
}

const RecruiterApplications = () => {
    const [applications, setApplications] = useState<RecruiterInternshipApplication[]>([]);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [loading, setLoading] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<RecruiterInternshipApplication | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Action Modal States
    const [actionModal, setActionModal] = useState<number | null>(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showInterviewModal, setShowInterviewModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    
    const [newStatus, setNewStatus] = useState<string>('');
    const [interviewTitle, setInterviewTitle] = useState<string>('');
    const [interviewType, setInterviewType] = useState<string>('');
    const [interviewDate, setInterviewDate] = useState<string>('');
    const [interviewTime, setInterviewTime] = useState<string>('');
    const [interviewEndTime, setInterviewEndTime] = useState<string>('');
    const [interviewMeetingLink, setInterviewMeetingLink] = useState<string>('');
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [isActionLoading, setIsActionLoading] = useState(false);

    const filteredApplications = useMemo(
        () => {
            return applications.filter(app => {
                const statusMatch = statusFilter === "ALL" || app.status === statusFilter;
                return statusMatch;
            });
        }, [applications, statusFilter]
    )

    const handleViewDetails = (application: RecruiterInternshipApplication) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedApplication(null);
    }

    const closeAllActionModals = () => {
        setActionModal(null);
        setShowStatusModal(false);
        setShowInterviewModal(false);
        setShowEmailModal(false);
        setNewStatus('');
        setInterviewTitle('');
        setInterviewType('');
        setInterviewDate('');
        setInterviewTime('');
        setInterviewEndTime('');
        setInterviewMeetingLink('');
        setEmailMessage('');
    }

    const openActionMenu = (applicationId: number, status: string) => {
        setActionModal(applicationId);
        setNewStatus(status);
        setShowStatusModal(false);
        setShowInterviewModal(false);
        setShowEmailModal(false);
    }

    const handleStatusChange = async (applicationId: number, newApplicationStatus: string) => {
        setIsActionLoading(true);
        try {
            const res = await callBackend(
                `/employer/application/${applicationId}/status?status=${encodeURIComponent(newApplicationStatus)}`,
                "PUT"
            );
            if (!res.success) {
                throw new Error(res.data || "Failed to update status");
            }
            // Refetch applications
            await fetchApplications();
            closeAllActionModals();
        } catch (error) {
            console.error("Error updating application status:", error);
            alert("Failed to update status");
        } finally {
            setIsActionLoading(false);
        }
    }

    const handleScheduleInterview = async (applicationId: number) => {
        if (!interviewTitle || !interviewType || !interviewDate || !interviewTime || !interviewEndTime || !interviewMeetingLink) {
            alert("Please fill in all required fields");
            return;
        }
        setIsActionLoading(true);
        try {
            // Format LocalDateTime for backend (ISO 8601 format: YYYY-MM-DDTHH:mm:ss)
            const startTime = `${interviewDate}T${interviewTime}:00`;
            const endTime = `${interviewDate}T${interviewEndTime}:00`;

            const res = await callBackend(`/employer/application/${applicationId}/schedule-interview`, "POST", { 
                title: interviewTitle,
                interviewType,
                startTime,
                endTime,
                meetingLink: interviewMeetingLink
            });
            if (!res.success) {
                throw new Error(res.data || "Failed to schedule interview");
            }
            // Refetch applications
            await fetchApplications();
            closeAllActionModals();
        } catch (error) {
            console.error("Error scheduling interview:", error);
            alert("Failed to schedule interview");
        } finally {
            setIsActionLoading(false);
        }
    }

    const handleSendEmail = async (applicationId: number, email: string, message: string) => {
        setIsActionLoading(true);
        try {
            const res = await callBackend(`/employer/application/${applicationId}/send-email`, "POST", { 
                recipientEmail: email,
                subject: 'Update on Your Application',
                message: message || 'Thank you for your application. We will get back to you soon.'
            });
            if (!res.success) {
                throw new Error(res.data || "Failed to send email");
            }
            alert("Email sent successfully!");
            closeAllActionModals();
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send email");
        } finally {
            setIsActionLoading(false);
        }
    }

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const res = await callBackend("/employer/application");
            if (!res.success) throw new Error("Failed to fetch applications");           
            setApplications(res.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, [])

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h1 className="text-xl font-bold">Applications</h1>
            </div>

            <div className="flex flex-col gap-4 mb-8">
                <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Status:</span>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {["ALL", "APPLIED", "SHORTLISTED", "INTERVIEWING", "SELECTED", "REJECTED"].map((f) => (
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
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <p className="text-neutral-500">Loading applications...</p>
                </div>
            ) : filteredApplications.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                    <p className="text-neutral-500">No applications found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredApplications.map((application) => (
                        <Card key={application.id} className="flex flex-col group h-full border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-all">
                            <div className="p-5 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h2 className="text-lg font-bold flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                {application.studentEmail}
                                            </h2>
                                        </div>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                            {application.internship.title}
                                        </p>
                                    </div>
                                    <Tag>
                                        {application.status}
                                    </Tag>
                                </div>

                                <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-neutral-500" />
                                        <span className="text-neutral-600 dark:text-neutral-400 truncate">{application.studentEmail}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="w-4 h-4 text-neutral-500" />
                                        <span className="text-neutral-600 dark:text-neutral-400">Applied: {application.appliedAt}</span>
                                    </div>
                                </div>

                                <div className="pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-900">
                                    {application.coverLetter && (
                                        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                                            <span className="font-medium">Cover Letter:</span> {application.coverLetter}
                                        </p>
                                    )}
                                    <div className="flex gap-2">
                                        <Button variant="secondary" size="md" onClick={() => handleViewDetails(application)} className="flex-1 flex items-center justify-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            View
                                        </Button>
                                        <Button size="md" onClick={() => openActionMenu(application.id, application.status)} className="flex-1">
                                            Action
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {selectedApplication && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Application Details">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold">Applicant Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Email</p>
                                    <p className="font-medium">{selectedApplication.studentEmail}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Applied Date</p>
                                    <p className="font-medium">{selectedApplication.appliedAt}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Status</p>
                                    <Tag>{selectedApplication.status}</Tag>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-4">
                            <h3 className="text-lg font-semibold">Internship</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Title</p>
                                    <p className="font-medium">{selectedApplication.internship.title}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Duration</p>
                                    <p className="font-medium">{selectedApplication.internship.duration || 'N/A'}</p>
                                </div>
                            </div>
                            {selectedApplication.internship.description && (
                                <div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Description</p>
                                    <p className="text-sm font-medium">{selectedApplication.internship.description}</p>
                                </div>
                            )}
                        </div>

                        {selectedApplication.coverLetter && (
                            <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-4">
                                <h3 className="text-lg font-semibold">Cover Letter</h3>
                                <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
                            </div>
                        )}

                        {Object.keys(selectedApplication.questionResponses).length > 0 && (
                            <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-4">
                                <h3 className="text-lg font-semibold">Question Responses</h3>
                                <div className="space-y-4">
                                    {Object.entries(selectedApplication.questionResponses).map(([question, response], idx) => (
                                        <div key={idx} className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg">
                                            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">{question}</p>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">{response}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedApplication.appliedWithResumeUrl && (
                            <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-4">
                                <h3 className="text-lg font-semibold">Resume</h3>
                                <a
                                    href={selectedApplication.appliedWithResumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                                >
                                    Resume
                                </a>
                            </div>
                        )}

                        {selectedApplication.reviewNote && (
                            <div className="space-y-3 border-t border-neutral-200 dark:border-neutral-800 pt-4">
                                <h3 className="text-lg font-semibold">Review Note</h3>
                                <p className="text-sm text-neutral-700 dark:text-neutral-300 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">{selectedApplication.reviewNote}</p>
                                <p className="text-xs text-neutral-500">Reviewed at: {selectedApplication.reviewedAt}</p>
                            </div>
                        )}
                    </div>
                </Modal>
            )}

            {/* Action Menu - Choose what to do */}
            {actionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold">Application Actions</h2>
                            <button
                                onClick={closeAllActionModals}
                                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={() => setShowStatusModal(true)}
                                className="w-full justify-center"
                                size="md"
                            >
                                Change Status
                            </Button>
                            <Button
                                onClick={() => setShowInterviewModal(true)}
                                className="w-full justify-center bg-green-600 hover:bg-green-700"
                                size="md"
                            >
                                Schedule Interview
                            </Button>
                            <Button
                                onClick={() => setShowEmailModal(true)}
                                className="w-full justify-center bg-blue-600 hover:bg-blue-700"
                                size="md"
                            >
                                Send Email
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* Status Change Modal */}
            <StatusChangeModal
                isOpen={showStatusModal}
                newStatus={newStatus}
                isLoading={isActionLoading}
                onClose={() => setShowStatusModal(false)}
                onStatusSelect={setNewStatus}
                onStatusChange={(status) => handleStatusChange(actionModal!, status)}
            />

            {/* Schedule Interview Modal */}
            <ScheduleInterviewModal
                isOpen={showInterviewModal}
                title={interviewTitle}
                interviewType={interviewType}
                interviewDate={interviewDate}
                interviewTime={interviewTime}
                endTime={interviewEndTime}
                meetingLink={interviewMeetingLink}
                isLoading={isActionLoading}
                onClose={() => setShowInterviewModal(false)}
                onTitleChange={setInterviewTitle}
                onTypeChange={setInterviewType}
                onDateChange={setInterviewDate}
                onTimeChange={setInterviewTime}
                onEndTimeChange={setInterviewEndTime}
                onMeetingLinkChange={setInterviewMeetingLink}
                onSchedule={() => handleScheduleInterview(actionModal!)}
            />

            {/* Send Email Modal */}
            <SendEmailModal
                isOpen={showEmailModal}
                message={emailMessage}
                isLoading={isActionLoading}
                onClose={() => setShowEmailModal(false)}
                onMessageChange={setEmailMessage}
                onSend={() => {
                    const app = applications.find(a => a.id === actionModal);
                    if (app) handleSendEmail(actionModal!, app.studentEmail, emailMessage);
                }}
            />
        </div>
    )
}

export default RecruiterApplications