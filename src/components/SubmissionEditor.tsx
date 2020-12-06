import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { ValueType } from 'react-select/src/types'
import { RootState } from '../rootReducer'
import userinfoConfiguration from '../userinfoConfiguration'
import { teamConfig } from '../config/teamConfig'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/Input';

import { API, graphqlOperation } from "aws-amplify"
import { addReport } from '../graphql/mutations'
import { GraphQLResult } from "@aws-amplify/api";
import { AddReportMutationVariables, AddReportMutation } from '../API'
 
const SubmissionEditor: React.FC = () => {
    type ReactSelectOptionsType = {[label:string]: string; value:string}
    const { settings } = useSelector((state: RootState) => state)
    const EditorConfig = teamConfig[settings.team]
    
    const categoryForState:ReactSelectOptionsType = {label:"",value:""}
    const [category,setCategory] = useState("")
    const [inputCategory, setInputCategory] = useState<ValueType<ReactSelectOptionsType>>(categoryForState)
    const handleCategoryChange = (option: ValueType<ReactSelectOptionsType>) => {
        if(option) {
            const target:string = (option as ReactSelectOptionsType).value
            setCategory(target)
            setInputCategory(option)
        }

    }
    
    const [attendedSA,setAttendedSA] = useState("")
    const handleAttendedSAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAttendedSA(e.target.value)
    }
    
    const [company,setCompany] = useState("")
    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompany(e.target.value)
    }

    const [title,setTitle] = useState("")
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    
    const [content,setContent] = useState("")
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
    }
 
    const [reports, setReports] = useState<AddReportMutationVariables[]>([])
    const addOneReport = () => {
        const now = new Date()
        const year = now.getFullYear()
        const month = (now.getMonth() + 1).toString().padStart(2, '0')
        const day = now.getDate().toString().padStart(2, '0')
        const date = `${year}-${month}-${day}`
        const submission:AddReportMutationVariables = {
            category: category,
            author: settings.name,
            attendedSAs: [attendedSA],
            industry: settings.team,
            companyName: company,
            title: title,
            content: content,
            date:date
        }
        setReports([...reports,submission])
    }
    
    const handleSubmit = async () => {
        for (const report of reports) {
            const addedReport = await API.graphql(graphqlOperation(addReport, report)) as GraphQLResult<AddReportMutation>;
            console.log("add report in SubmissionEditor.ts")
            console.log(addedReport.data?.addReport)
        }
    }
    
    const optionsCategory = EditorConfig["titles"].map(
        (category) => ({value:category,label:category})
    )
    
    const draftReports = reports.map(
        (report) => <div>
                     {report.category}<br />
                     {`[${report.companyName}] ${report.title} w/ ${report.attendedSAs}`}<br />
                     { report.content}<br />
                   </div>    
    )
 
    return (
            <div className="pb-2 text-channel-sidebar-font">
            <form name="settingForm" className="w-screen flex items-center justify-center">
                <Select className="w-2/12" value={inputCategory} options={optionsCategory} placeholder="Select category" onChange={option => handleCategoryChange(option)} />
                <TextField className="w-2/12" value={attendedSA} placeholder="attended SA" onChange={handleAttendedSAChange} />
                <TextField className="w-2/12" required={true} value={company} placeholder="company" onChange={handleCompanyChange} />
                <TextField className="w-2/12" required={true} value={title} placeholder="title" onChange={handleTitleChange} />
                <TextField className="w-3/12" required={true} value={content} placeholder="content" onChange={handleContentChange} />
                <Button type="button" className="w-1/12" onClick={addOneReport} color="primary">Add</Button>
            </form>
            <div className="block items-center justify-center">
                { draftReports }
            </div>
            <div className="block">
                <Button onClick={handleSubmit} color="primary">Submit Weekly Report</Button>
            </div>
            <div id="messageAfterChangeSetting"></div>
        </div>
        
    )
}
 
export default SubmissionEditor