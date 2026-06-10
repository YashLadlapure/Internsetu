import { RootState } from '@/lib/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TpoProfile, TpoProfileState } from './types'

const initialState: TpoProfileState = {
  id: 0,
  email: "",
  isActive: false,
  role: "TPO",
  profile: null,
}

export const tpoProfileSlice = createSlice({
  name: 'tpoProfile',
  initialState,
  reducers: {
    setTpoProfile: (_state, action: PayloadAction<TpoProfileState>) => {
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
  setTpoProfile,
  updateEmployeeId,
  updateDesignation,
  updatePhoneNumber,
  updateCabinLocation,
} = tpoProfileSlice.actions

export const selectTpoProfile = (state: RootState) => state.tpoProfile
export const selectTpoFirstLetterOfEmail = (state: RootState) => {
  return state.tpoProfile.email ? state.tpoProfile.email.charAt(0).toUpperCase() : ''
}

export default tpoProfileSlice.reducer