export type InterviewType = "TECHNICAL" | "HR" | "MANAGERIAL" | "PRE_PLACEMENT" | "ONLINE_TEST";

export type ScheduleStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED";

export interface EmployerInterviewApplicationSummary {
    id?: number | string;
    studentEmail?: string;
    studentName?: string;
    student?: {
        name?: string;
        email?: string;
    };
    internshipTitle?: string;
    internship?: {
        title?: string;
    };
    [key: string]: unknown;
}

export interface EmployerInterviewScheduleResponse {
    id: number;
    application: EmployerInterviewApplicationSummary;
    title: string;
    interviewType: InterviewType;
    startTime: string;
    endTime: string;
    meetingLink: string;
    meetingNotes: string;
    scheduleStatus: ScheduleStatus;
    createdAt: string;
}