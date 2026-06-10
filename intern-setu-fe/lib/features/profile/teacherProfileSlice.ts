import { RootState } from '@/lib/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TeacherProfile, TeacherProfileState } from './types'

const initialState: TeacherProfileState = {
  id: 0,
  email: "",
  isActive: false,
  role: "TEACHER",
  profile: null,
}

export const teacherProfileSlice = createSlice({
  name: 'teacherProfile',
  initialState,
  reducers: {
    setTeacherProfile: (_state, action: PayloadAction<TeacherProfileState>) => {
      return action.payload
    },
    updateEmployeeId: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.employeeId = action.payload
      }
    },
    updateDesignation: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.designation = action.payload
      }
    },
    updateDepartment: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.department = action.payload
      }
    },
    updateQualification: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.qualification = action.payload
      }
    },
    updateSpecialization: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.specialization = action.payload
      }
    },
    updatePhoneNumber: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.phoneNumber = action.payload
      }
    },
    updateCabinLocation: (state, action: PayloadAction<string | null>) => {
      if (state.profile) {
        state.profile.cabinLocation = action.payload
      }
    },
  },
})

export const {
  setTeacherProfile,
  updateEmployeeId,
  updateDesignation,
  updateDepartment,
  updateQualification,
  updateSpecialization,
  updatePhoneNumber,
  updateCabinLocation,
} = teacherProfileSlice.actions

export const selectTeacherProfile = (state: RootState) => state.teacherProfile
export const selectTeacherFirstLetterOfEmail = (state: RootState) => {
  return state.teacherProfile.email ? state.teacherProfile.email.charAt(0).toUpperCase() : ''
}

export default teacherProfileSlice.reducer
