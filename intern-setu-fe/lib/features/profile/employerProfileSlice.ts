import { RootState } from '@/lib/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EmployerProfile, EmployerProfileState } from './types'

const initialState: EmployerProfileState = {
  id: 0,
  email: "",
  isActive: false,
  role: "HR",
  profile: null,
}

export const employerProfileSlice = createSlice({
  name: 'employerProfile',
  initialState,
  reducers: {
    setEmployerProfile: (_state, action: PayloadAction<EmployerProfileState>) => {
      return action.payload
    },
    updateLinkedinProfile: (state, action: PayloadAction<EmployerProfile['linkedinProfile']>) => {
      if (state.profile) {
        state.profile.linkedinProfile = action.payload
      }
    },
    setRole: (state, action: PayloadAction<EmployerProfileState['role']>) => {
      state.role = action.payload
    },
  },
})

export const { setEmployerProfile, updateLinkedinProfile, setRole } = employerProfileSlice.actions

export const selectEmployerProfile = (state: RootState) => state.employerProfile
export const selectEmployerFirstLetterOfEmail = (state: RootState) => {
  return state.employerProfile.email ? state.employerProfile.email.charAt(0).toUpperCase() : ''
}

export default employerProfileSlice.reducer
