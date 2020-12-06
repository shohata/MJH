import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import awsConfiguration from '../awsConfiguration'
import { searchReports } from '../graphql/queries'
import { API, graphqlOperation } from "aws-amplify"
import { GraphQLResult } from "@aws-amplify/api";
import {SearchReportsQuery,SearchReportsQueryVariables } from '../API'
import  { WeeklyReport } from './weeklyReportDetailModule'

const initialReports: WeeklyReport[] = 
    [    {
        id:"",
        author: "",
        attendedSAs: [""],
        industry: "",
        companyName: "",
        title:"",
        content: "",
        date: "",
        tags: [""]
    }]


export const callSearchReports = async (searchParams: SearchReportsQueryVariables) => {
          const posts = await API.graphql(graphqlOperation(searchReports, searchParams)) as GraphQLResult<SearchReportsQuery>;
          console.log('posts: ', posts)
          const hitWeeklyReports = posts.data?.searchReports
          return hitWeeklyReports as WeeklyReport[]
        
}


 
const weeklyReportsModule = createSlice({
    name: 'weeklyReports',
    initialState: initialReports,
    reducers: {
        updateReports(state: WeeklyReport[], action: PayloadAction<WeeklyReport[]>) {
            state = action.payload
            return state
        }
    }
})
 
export default weeklyReportsModule