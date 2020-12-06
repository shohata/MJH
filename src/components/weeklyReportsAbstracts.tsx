import React, { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Setting from '../setting/Setting'
import { RootState } from '../rootReducer'
import weeklyReportDetailModule,{ WeeklyReport } from './weeklyReportDetailModule'

export function generateWeeklyReportTitle(company:string,title:string,attendedSA:string[]) {
    const isAttendedSAEmpty = attendedSA.length==0
    if (isAttendedSAEmpty){
        if(company){
            return `[${company}様] ${title}`
        }else {
            return title
        }
    }else {
        if(company) {
            const attendedSAs = attendedSA.join(" and ")
            return `[${company}様] ${title} w/ ${attendedSAs}`
        }else {
            const attendedSAs = attendedSA.join(" and ")
            return `${title} w/ ${attendedSAs}`
        }
    }
}

const WeeklyReports: React.FC<{reports:WeeklyReport[]}> = (props) => {
    const { weeklyReportDetail } = useSelector((state: RootState) => state)
    const dispatch = useDispatch()
    const  showDetailOfWeeklyReport =(report: WeeklyReport) =>{
        dispatch(weeklyReportDetailModule.actions.addReport(report))
    }
    const reports = props.reports
    if (reports.length==0) {
        return  <div className="text-black">
                <div>No reports found</div>
                </div>
    } else if (reports[0].author=="") {
        return <div className="text-black">
                <div>Welcome</div>
               </div>            
    } else {
        const weeklyReportsTemplate = reports.map(
        (weeklyReport) => 
            <React.Fragment key={weeklyReport.id}>
            <div className="report hover:bg-blue-300 " onClick={(e)=>showDetailOfWeeklyReport(weeklyReport)}>
                <div className="report-author">{ weeklyReport.author }</div>
                <div className="report-content">{ generateWeeklyReportTitle(weeklyReport.companyName,weeklyReport.title,weeklyReport.attendedSAs) }</div>
            </div>
            </React.Fragment>
        )
            
        return <div>{ weeklyReportsTemplate }</div>
    }
}

const WeeklyReportsAbstracts: React.FC = () => {
    const { weeklyReports } = useSelector((state: RootState) => state)
    return (
      <div>
            <div className="w-full pb-2">
                <h1 className="text-black">Weekly reports(abstract)</h1>
                <WeeklyReports reports={weeklyReports}/>
            </div>
      </div>

    )
}
 
export default WeeklyReportsAbstracts