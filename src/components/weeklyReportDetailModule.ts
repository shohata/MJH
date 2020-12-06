import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import awsConfiguration from '../awsConfiguration'

export interface WeeklyReport {
    id:string
    author: string
    attendedSAs: string[]
    industry: string
    companyName: string
    title: string
    content: string
    date: string
    tags: string[]
}

const initialReport: WeeklyReport[] = []

 
const weeklyReportDetailModule = createSlice({
    name: 'weeklyReportDetail',
    initialState: initialReport,
    reducers: {
        addReport(state: WeeklyReport[], action: PayloadAction<WeeklyReport>) {
            state = Array.from(new Set([...state, action.payload]))
            return state
        },
        removeReport(state: WeeklyReport[],action: PayloadAction<WeeklyReport>) {
            state = state.filter((v) => (v.id !== action.payload.id));
            return state
        }
    }
})
 
export default weeklyReportDetailModule