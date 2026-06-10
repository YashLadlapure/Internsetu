import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface EmployerCompanyVerification {
  college: {
    address: string | null,
    emailDomain: string | null,
    id: number,
    name: string,
    website: string | null,
  },
  docs: string | null,
  status: "APPROVED" | "PENDING" | "REJECTED" | "BLACKLISTED",
  text: string | null,
}

export interface EmployerInternshipsProps {
    id: number | string;
    college: {
        id: number | string;
        name: string;
        logoUrl: string;
        websiteUrl: string;
        location: string;
    };
    title: string;
    description: string;
    salary: number;
    location: "REMOTE" | "ON_SITE" | "HYBRID";
    duration: string;
    startDate: string;
    deadline: string;
    status: "LIVE" | "PENDING" | "CLOSED";
}



interface EmployerState {
    companyVerifications: EmployerCompanyVerification[];
    employerInternships: EmployerInternshipsProps[];
}

const initialState: EmployerState = {
    companyVerifications: [],
    employerInternships: [],
}

const employerSlice = createSlice({
    name: "employer",
    initialState: initialState,
    reducers: {
        setCompanyVerifications(state, action: PayloadAction<EmployerCompanyVerification[]>) {
            state.companyVerifications = action.payload;
        },
        addCompanyVerification(state, action: PayloadAction<EmployerCompanyVerification>) {
            state.companyVerifications.push(action.payload);
        },
        setEmployerInternships(state, action: PayloadAction<EmployerInternshipsProps[]>) {
            state.employerInternships = action.payload;
        },
        addEmployerInternship(state, action: PayloadAction<EmployerInternshipsProps>) {
            state.employerInternships.push(action.payload);
        }
    },
})

export const selectEmployer = (state: RootState ) => state.employer;
export const selectCompanyVerifications = (state: RootState) => state.employer.companyVerifications;
export const selectEmployerInternships = (state: RootState) => state.employer.employerInternships;


export const { 
    setCompanyVerifications,
    addCompanyVerification,
    setEmployerInternships,
    addEmployerInternship
} = employerSlice.actions;

export default employerSlice.reducer;