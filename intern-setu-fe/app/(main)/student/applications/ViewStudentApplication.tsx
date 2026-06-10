"use client"

import Button from "@/components/ui/Button"
import Tag from "@/components/ui/Tag"
import { selectStudentInternshipApplicationById } from "@/lib/features/student/studentSlice"
import { useAppSelector } from "@/lib/hooks"

const ViewStudentApplication = ({ applicationId, onClose, onEdit }: { applicationId: number | string, onClose: () => void, onEdit?: () => void }) => {
    const application = useAppSelector(selectStudentInternshipApplicationById(applicationId));

    const formatDate = (dateString?: string | null) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const hasResponses = application?.questionResponses && Object.keys(application.questionResponses).length > 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-4xl rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden">
                <div className="flex items-start justify-between border-b border-neutral-200 dark:border-neutral-800 p-4">
                    <div>
                        <h2 className="text-lg font-semibold">{application?.internshipPosting.title ?? "Application Details"}</h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            {application?.internshipPosting.company.name ?? ""}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {onEdit && (
                            <Button variant="secondary" size="sm" onClick={onEdit}>
                                Edit
                            </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>

                {!application ? (
                    <div className="p-6">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Application not found.
                        </p>
                    </div>
                ) : (
                    <div className="p-6 space-y-6">
                        <div className="flex flex-wrap gap-2 items-center">
                            <Tag size="sm" className="text-xs">
                                {application.status}
                            </Tag>
                            <Tag size="sm" className="text-xs">
                                {application.internshipPosting.location.replace("_", " ")}
                            </Tag>
                            <Tag size="sm" className="text-xs">
                                {application.internshipPosting.duration}
                            </Tag>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Applied on</p>
                                <p className="font-medium">{formatDate(application.appliedAt)}</p>
                            </div>
                            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Reviewed on</p>
                                <p className="font-medium">{formatDate(application.reviewedAt)}</p>
                            </div>
                            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Salary</p>
                                <p className="font-medium">
                                    Rs. {typeof application.internshipPosting.salary === "number"
                                        ? application.internshipPosting.salary.toLocaleString()
                                        : application.internshipPosting.salary}
                                </p>
                            </div>
                            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Start date</p>
                                <p className="font-medium">{formatDate(application.internshipPosting.startDate)}</p>
                            </div>
                            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Deadline</p>
                                <p className="font-medium">{formatDate(application.internshipPosting.deadline)}</p>
                            </div>
                        </div>

                        {application.internshipPosting.requiredSkills.length > 0 && (
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Required Skills</p>
                                <div className="flex flex-wrap gap-2">
                                    {application.internshipPosting.requiredSkills.map((skill) => (
                                        <Tag key={skill.id} size="sm" className="text-xs">
                                            {skill.name}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                        )}

                        {application.coverLetter && (
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Cover Letter</p>
                                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                                    {application.coverLetter}
                                </div>
                            </div>
                        )}

                        {hasResponses && (
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Question Responses</p>
                                <div className="space-y-3">
                                    {Object.entries(application.questionResponses).map(([question, response]) => (
                                        <div key={question} className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">{question}</p>
                                            <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                                                {response}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {application.isApproved !== null && (
                            <div>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Teacher Review</p>
                                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
                                    <p className={`text-sm font-medium ${application.isApproved ? "text-green-600" : "text-red-600"}`}>
                                        {application.isApproved ? "✓ Approved" : "✗ Not Approved"}
                                    </p>
                                    {application.reviewNote && (
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 whitespace-pre-wrap">
                                            {application.reviewNote}
                                        </p>
                                    )}
                                    {application.approvedByTeacherEmail && (
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                                            Reviewed by {application.approvedByTeacherEmail}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}

                        {application.appliedWithResumeUrl && (
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => window.open(application.appliedWithResumeUrl, "_blank", "noopener,noreferrer")}
                                >
                                    View Resume
                                </Button>
                                <a
                                    className="rounded-full text-neutral-100 bg-neutral-900 hover:bg-neutral-800 dark:text-neutral-900 dark:bg-neutral-100 dark:hover:bg-neutral-200 p-1 text-sm"
                                    href={application.appliedWithResumeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    download
                                >
                                    Download Resume
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewStudentApplication