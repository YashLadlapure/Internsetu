import { createSlice } from "@reduxjs/toolkit";

export interface StudentInternshipsProps {
    id: number | string;
    company: {
      id: number | string;
      name: string;
      logoUrl: string;
      websiteUrl: string;
      location: string;
      description: string;
      industryType: string;
      isVerified: boolean;
      hrEmail: string;
      linkedinProfile: string;
    }
    title: string;
    description: string;
    salary: number;
    location: "REMOTE" | "ON_SITE" | "HYBRID";
    duration: string;
    startDate: string;
    deadline: string;
    requiredSkills: {
        id: number | string;
        name: string;
    }[];
    applicationQuestions: string[];
    hasApplied: boolean;
}

export interface StudentInternshipApplicationProps {
    id: number | string;
    internshipPosting: StudentInternshipsProps;
    appliedAt: string;
    status: "APPLIED" | "SHORTLISTED" | "INTERVIEWING" | "SELECTED" | "REJECTED";
    coverLetter: string;
    appliedWithResumeUrl: string;
    questionResponses: { [key: string]: string };
    
    isApproved: boolean | null;
    approvedByTeacherId: number | string | null;
    approvedByTeacherEmail: string | null;
    reviewNote: string | null;
    reviewedAt: string | null;
}

export interface StudentState {
    studentInternships: StudentInternshipsProps[];
    studentInternshipApplications: StudentInternshipApplicationProps[];
}

const initialState: StudentState = {
    studentInternships: [],
    studentInternshipApplications: [],
}

const studentSlice = createSlice({
    name: "student",
    initialState: initialState,
    reducers: {
        setStudentInternships(state, action) {
            state.studentInternships = action.payload;
        },
        setStudentApplications(state, action) {
            state.studentInternshipApplications = action.payload;
        },
        setApplidToInternship(state, action) {
            const internshipId = action.payload;
            const internship = state.studentInternships.find(i => i.id === internshipId);
            if (internship) {
                internship.hasApplied = true;
            }
        },
        updateApplication(state, action) {
            const updatedApplication = action.payload;
            const index = state.studentInternshipApplications.findIndex(app => app.id === updatedApplication.id);
            if (index !== -1) {
                state.studentInternshipApplications[index] = updatedApplication;
            }
        },
    },
})

export const { setStudentInternships, setStudentApplications, setApplidToInternship, updateApplication } = studentSlice.actions;
export default studentSlice.reducer;


// internship selectors
export const selectStudentInternships = (state: { student: StudentState }) => state.student.studentInternships;
export const selectStudentInternshipById = (internshipId: number | string) => (state: { student: StudentState }) => {
    return state.student.studentInternships.find(internship => internship.id === internshipId);
};


// application selectors
export const selectStudentInternshipApplications = (state: { student: StudentState }) => state.student.studentInternshipApplications;
export const selectStudentInternshipApplicationById = (applicationId: number | string) => (state: { student: StudentState }) => {
    return state.student.studentInternshipApplications.find(application => application.id === applicationId);
};