import { combineReducers } from '@reduxjs/toolkit'
import settingModule from './setting/settingModule'
import weeklyReportsModule from './components/weeklyReportsModule'
import weeklyReportDetailModule from './components/weeklyReportDetailModule'
 
const rootReducer = combineReducers({
    settings: settingModule.reducer,
    weeklyReports: weeklyReportsModule.reducer,
    weeklyReportDetail: weeklyReportDetailModule.reducer
})
 
export type RootState = ReturnType<typeof rootReducer>
 
export default rootReducer