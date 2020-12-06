import React, { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Setting from '../setting/Setting'
import { RootState } from '../rootReducer'
import weeklyReportDetailModule, {WeeklyReport } from './weeklyReportDetailModule'
import { generateWeeklyReportTitle } from './weeklyReportsAbstracts'


function DetailTemplate(report: WeeklyReport) {
    const dispatch = useDispatch()
    const removeReport = (report: WeeklyReport) => {
        dispatch(weeklyReportDetailModule.actions.removeReport(report))
    }
    if (report.author==""){
        return <div className="text-black">
                <div id="detail">Welcome</div>
               </div>    
    }else {
        return  <React.Fragment key={report.id}>
                <div className="report">
                    <div className="flex justify-end">
                        <button type="button" onClick={(e)=>removeReport(report)} className="close-button hover:bg-gray-400 ">&times;</button>
                    </div>
                    <div className="report-author">{ report.author }</div>
                    <div className="report-content">{ report.date }</div>
                    <div className="report-content">{ generateWeeklyReportTitle(report.companyName,report.title,report.attendedSAs) }</div>
                    <div className="report-content">{ report.content }</div>
                </div>
                </React.Fragment>
    }
}

function generateWeeklyReportsDetailTemplate(reports: WeeklyReport[]) {
    if (reports.length==0) {
        return <div className="text-black">
                <div id="detail">Welcome</div>
               </div>
    } else {
        const weeklyReportsDetailTemplate = reports.map(
        (weeklyReport) => 
            DetailTemplate(weeklyReport)
        )
            
        return <div>{ weeklyReportsDetailTemplate }</div>
    }
}
const WeeklyReportDetail: React.FC = () => {
    const { weeklyReportDetail } = useSelector((state: RootState) => state)
    const weeklyReportDetailTemplate = generateWeeklyReportsDetailTemplate(weeklyReportDetail)
    return (
      <div>
            <div className="w-full pb-2">
                <h1 className="text-black">Weekly reports(detail)</h1>
                { weeklyReportDetailTemplate }
            </div>
      </div>

    )
}
 
export default WeeklyReportDetail