import { RootState } from '@/lib/store'
import { TpoProfileState, StudentProfileState, TeacherProfileState, EmployerProfileState } from './types'

const pickActiveProfile = (
  state: RootState,
): StudentProfileState | TpoProfileState | TeacherProfileState | EmployerProfileState => {
  if (state.studentProfile?.email) return state.studentProfile
  if (state.tpoProfile?.email) return state.tpoProfile
  if (state.teacherProfile?.email) return state.teacherProfile
  if (state.employerProfile?.email) return state.employerProfile
  return state.studentProfile
}

export const selectActiveProfile = (state: RootState) => pickActiveProfile(state)

export const selectActiveFirstLetterOfEmail = (state: RootState) => {
  const activeProfile = pickActiveProfile(state)
  return activeProfile.email ? activeProfile.email.charAt(0).toUpperCase() : ''
}
