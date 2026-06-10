import { RootState } from '@/lib/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Certificate, Project, Skill, StudentProfile, StudentProfileState, StudentSocialLinks } from './types'

const initialState: StudentProfileState = {
  id: 0,
  email: "",
  isActive: false,
  role: "STUDENT",
  profile: null,
}

export const studentProfileSlice = createSlice({
  name: 'studentProfile',
  initialState,
  reducers: {
    setStudentProfile: (_state, action: PayloadAction<StudentProfileState>) => {
      return action.payload
    },
    updatePrn: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile.prn = action.payload
      }
    },
    updatePhoneNumber: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.phoneNumber = action.payload
      }
    },
    updateAbout: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.about = action.payload
      }
    },
    updateResumeLink: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.resumeLink = action.payload
      }
    },
    updateDateOfBirth: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.dateOfBirth = action.payload
      }
    },
    updateGraduationYear: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.graduationYear = action.payload
      }
    },
    updateCourse: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.course = action.payload
      }
    },
    updateBranch: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.branch = action.payload
      }
    },
    updatePanel: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.panel = action.payload
      }
    },
    updateGender: (state, action: PayloadAction<"MALE" | "FEMALE" | "OTHER" | null>) => {
      if (state.profile) {
        state.profile.gender = action.payload
      }
    },
    updateSkills: (state, action: PayloadAction<Skill[]>) => {
      if (state.profile) {
        state.profile.skills = action.payload
      }
    },
    updateProjects: (state, action: PayloadAction<Project[]>) => {
      if (state.profile) {
        state.profile.projects = action.payload
      }
    },
    addProject: (state, action: PayloadAction<Project>) => {
      if (state.profile) {
        state.profile.projects.push(action.payload)
      }
    },
    removeProject: (state, action: PayloadAction<Project['id']>) => {
      if (state.profile) {
        state.profile.projects = state.profile.projects.filter((project) => project.id !== action.payload)
      }
    },
    updateCertificates: (state, action: PayloadAction<Certificate[]>) => {
      if (state.profile) {
        state.profile.certificates = action.payload
      }
    },
    addCertificate: (state, action: PayloadAction<Certificate>) => {
      if (state.profile) {
        state.profile.certificates.push(action.payload)
      }
    },
    removeCertificate: (state, action: PayloadAction<Certificate['id']>) => {
      if (state.profile) {
        state.profile.certificates = state.profile.certificates.filter((certificate) => certificate.id !== action.payload)
      }
    },
    updateSocials: (state, action: PayloadAction<StudentSocialLinks[]>) => {
      if (state.profile) {
        state.profile.socials = action.payload
      }
    },
  },
})

export const {
  setStudentProfile,
  updatePrn,
  updatePhoneNumber,
  updateAbout,
  updateResumeLink,
  updateDateOfBirth,
  updateGraduationYear,
  updateCourse,
  updateBranch,
  updatePanel,
  updateGender,
  updateSkills,
  updateProjects,
  addProject,
  updateCertificates,
  addCertificate,
  removeProject,
  removeCertificate,
  updateSocials,
} = studentProfileSlice.actions

export const selectStudentProfile = (state: RootState) => state.studentProfile
export const selectStudentFirstLetterOfEmail = (state: RootState) => {
  return state.studentProfile.email ? state.studentProfile.email.charAt(0).toUpperCase() : ''
}

export default studentProfileSlice.reducer
