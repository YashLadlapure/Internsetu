import { configureStore } from '@reduxjs/toolkit'
import studentProfileReducer from './features/profile/studentProfileSlice'
import tpoProfileReducer from './features/profile/tpoProfileSlice'
import teacherProfileReducer from './features/profile/teacherProfileSlice'
import employerProfileReducer from './features/profile/employerProfileSlice'
import sidebarReducer from './features/uiState/sidebarSlice'
import employerReducer from './features/employer/employerSlice'
import studentReducer from './features/student/studentSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      studentProfile: studentProfileReducer,
      tpoProfile: tpoProfileReducer,
      teacherProfile: teacherProfileReducer,
      employerProfile: employerProfileReducer,
      sidebar: sidebarReducer,
      employer: employerReducer,
      student: studentReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']