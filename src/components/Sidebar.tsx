import React, { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Setting from '../setting/Setting'
import Submission from './Submission'
import { RootState } from '../rootReducer'
import weeklyReportsModule, { callSearchReports } from './weeklyReportsModule'

import { API, graphqlOperation } from "aws-amplify"

const Keywords: React.FC = () => {
    const { settings } = useSelector((state: RootState) => state)
    const dispatch = useDispatch()
    const { weeklyReports } = useSelector((state: RootState) => state)
    const searchKeyword = async (keyword:string) => {
        const hitKeywordRelatedReports = await callSearchReports({content:keyword})
        dispatch(weeklyReportsModule.actions.updateReports(hitKeywordRelatedReports))
    }
    const subscriptionKeywords = settings.subscriptionKeywords.map(
      (keyword) =><React.Fragment key={keyword}>
                   <div  className="catalog-content hover:bg-channel-sidebar-hover">
                    <button onClick={(e)=>searchKeyword(keyword)}>{ "# "+keyword }</button>
                   </div>
                  </React.Fragment>
    )
    return (
      <div>
            <section className="w-full pb-2">
                <div className="catalog-title flex justify-between">
                    Subscription Keywords
                </div>
                { subscriptionKeywords }
            </section>
      </div>

    )
}

const TeamMembers: React.FC = () => {
    const { settings } = useSelector((state: RootState) => state)
    if (settings.isMgr) {
        return (
            <div>
                <section className="w-full pb-2">
                    <div className="catalog-title flex justify-between">
                        { settings.team+" team members" }
                    </div>
                </section>
            </div>
        )
    } else {
        return (
            <div></div>    
        )
    }

}

const MySubmissions: React.FC = () => {
    const { settings } = useSelector((state: RootState) => state)
    return (
        <div>
            <section className="w-full pb-2">
                <div className="catalog-title flex justify-between">
                    Your submissions
                </div>
                <div className="catalog-content">{ "# "+settings.name }</div>  
            </section>
        </div>
    )
}

const Sidebar: React.FC = () => {
    return (
            <div className="w-full pb-2 bg-channel-sidebar text-channel-sidebar-font">
                <Setting />
                <Submission />
                <Keywords />
                <TeamMembers />
                <MySubmissions />
            </div>

    )
}
 
export default Sidebar