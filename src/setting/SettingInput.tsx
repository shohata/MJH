import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { ValueType } from 'react-select/src/types'
import settingModule, { State, updateDynamo } from './settingModule'
import { RootState } from '../rootReducer'
import userinfoConfiguration from '../userinfoConfiguration'
 
const SettingInput: React.FC = () => {
    type MultiSelectType = {[label:string]: string; value:string}
    const dispatch = useDispatch()
    const { settings } = useSelector((state: RootState) => state)
 
    const [ inputName, setInputName ] = useState(settings.name)
    const [ inputIsMgr, setInputIsMgr] = useState(settings.isMgr)
    
    const [ inputTeam, setInputTeam ] = useState(settings.team)
    const teamForState:MultiSelectType = {label:settings.team,value:settings.team}
    const [ initialTeam, setInitialTeam ] = useState<ValueType<MultiSelectType>>(teamForState)
    
    
    const [ inputKeywords, setInputKeywords] = useState(settings.subscriptionKeywords)
    const initialSubscriptionKeywords = inputKeywords.map(
        (keyword) => ({value: keyword,label:keyword})
    )
    const [initialKeywords, setInitialKeywords] = useState(initialSubscriptionKeywords)
 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputName(e.target.value)
    }
    const handleIsMgrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputIsMgr(e.target.checked)
    }
    
    
    const handleTeamChange = (option: ValueType<MultiSelectType> ) => {
        if (option) {
            // must cast type. cannot use <MultiSelectType> in JSX so use as
            const team:string = (option as MultiSelectType).value
            setInputTeam(team)
            setInitialTeam(option)
            console.log("Your Team is ",team)
        }
    }
    
    const handleKeywordsChange = (option: ValueType<MultiSelectType> ) => {
        // option is like ['0': {value:'RDS';label:'RDS'}, '1': {value: 'EC';label:'EC"'}]
        if (option) {
            const selectedKeywords = Object.entries(option).map(x => x[1]['value'])
            const selectedKeywordsForState = Object.entries(option).map(x => x[1])
            console.log("selected keywords are ",selectedKeywords)
            setInputKeywords(selectedKeywords)
            setInitialKeywords(selectedKeywordsForState)
        }
    }
 
    const handleSubmit = async () => {
        
        let changedState:State = {
            isMgr: inputIsMgr,
            name: inputName,
            team: inputTeam,
            subscriptionKeywords: inputKeywords,
            uuid: settings.uuid as string
        }
        const newSetting = await updateDynamo(changedState)
        dispatch(settingModule.actions.changeSetting(newSetting))
        let innerText = document.getElementById("messageAfterChangeSetting")
        if (innerText !== null) {
            innerText.innerText = "Setting Changed!"
        }
    }
    const optionsTeams = userinfoConfiguration.teams.map(
        (team) => ({value:team,label:team})
    )
    const optionsSubscriptionKeywords:MultiSelectType[] = userinfoConfiguration.subscriptionKeywords.map(
        (keyword) => ({value: keyword,label:keyword})
    )
 
    return (
        <div className="input-form">
            <form name="settingForm">
                <label>Manager</label>
                <input type="checkbox" name="isMgr" checked={inputIsMgr} onChange={handleIsMgrChange}></input>
                <input type="text" name="name" value={inputName} placeholder="Your Name" onChange={handleInputChange}></input>
                <Select value={initialTeam} options={optionsTeams} onChange={option => handleTeamChange(option)} />
                <Select isMulti value={initialKeywords} options={optionsSubscriptionKeywords} onChange={option => handleKeywordsChange(option)} />
            </form>
            <button onClick={handleSubmit} className="btn is-primary">Change Setting</button>
            <div id="messageAfterChangeSetting"></div>
        </div>
        
    )
}
 
export default SettingInput