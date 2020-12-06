import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../rootReducer'

const SettingPresentor: React.FC = () => {
    // type RootState is defined in settingModule.ts (type State)
    const { settings } = useSelector((state: RootState) => state)

    return (
        <div className="inner">
            <div>Your name is {settings.name} and isMgr flag is {settings.isMgr.toString()}</div>
            <div>Your team is {settings.team} and your subscription keywords are {settings.subscriptionKeywords} </div>
            <div>IdentityId is {settings.uuid} </div>
        </div>
    )
}
 
export default SettingPresentor
