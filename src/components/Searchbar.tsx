import React, { MouseEvent,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Setting from '../setting/Setting'
import { RootState } from '../rootReducer'
import weeklyReportsModule, { callSearchReports } from './weeklyReportsModule'

const Searchbar: React.FC = () => {
    const dispatch = useDispatch()
    const { weeklyReports } = useSelector((state: RootState) => state)
    
    const [ author, setAuthor ] = useState("")
    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value)
    }
 
    const [ industry, setIndustry ] = useState("")
    const handleIndustryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIndustry(e.target.value)
    }
    
    const [ company, setCompany ] = useState("")
    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompany(e.target.value)
    }
    
    const [ freeword, setFreeword ] = useState("")
    const handleFreewordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFreeword(e.target.value)
    }
    
    const [ from, setFrom ] = useState("")
    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFrom(e.target.value)
    }
    
    const [ by, setBy ] = useState("")
    const handleByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBy(e.target.value)
    }
    
    const handleSearch = async() => {
        let condition: { [key: string]: string; } = {}
        if (author != ""){
            condition["author"] = author
        }
        if (industry != "") {
            condition["industry"] = industry
        }
        if (company != "") {
            condition["companyName"] = company
        }
        if (freeword != "") {
            condition["content"] = freeword
        }
        if (from != "") {
            condition["from"] = from
        }
        if (by != "") {
            condition["by"] = by
        }
        console.log("search condition in Saerchbar.tsx")
        console.log(condition)
        if (Object.keys(condition).length == 0){
            let innerText = document.getElementById("messageIfNoSearchCondition")
            if (innerText !== null) {
                innerText.innerText = "Specify search condition"
            }
        } else if (from == "" || by == "") {
            let innerText = document.getElementById("messageIfNoSearchCondition")
            if (innerText !== null) {
                innerText.innerText = "Specify both from and by condition"
            }
        } else {
            const hitReports = await callSearchReports(condition)
            dispatch(weeklyReportsModule.actions.updateReports(hitReports))
            let innerText = document.getElementById("messageIfNoSearchCondition")
            if (innerText !== null) {
                innerText.innerText = "Sent search request"
            }
        }
    }
    
    return (
      <div>
            <div className="w-full pb-2 text-channel-sidebar-font flex items-center justify-center">
            <form name="settingForm" className="flex items-center justify-center">
                {/* space */}
                <div className="w-1/12">
                </div>
                <div className="text-channel-sidebar-font">
                    <label>author:</label>
                    <input type="text" name="author" value={author} onChange={handleAuthorChange}></input>
                </div>
                <div className="text-channel-sidebar-font">
                    <label>industry:</label>
                    <input type="text" name="industry" value={industry} onChange={handleIndustryChange}></input>
                </div>
                <div className="text-channel-sidebar-font">
                    <label>company name:</label>
                    <input type="text" name="companyName" value={company} onChange={handleCompanyChange}></input>
                </div>
                <div className="text-channel-sidebar-font">
                    <label>free word:</label>
                    <input type="text" name="freeword" value={freeword} onChange={handleFreewordChange}></input>
                </div>
                <div className="text-channel-sidebar-font">
                    <label>from:</label>
                    <input type="text" name="from" value={from} onChange={handleFromChange}></input>
                </div>
                <div className="text-channel-sidebar-font">
                    <label>by:</label>
                    <input type="text" name="by" value={by} onChange={handleByChange}></input>
                </div>
            </form>
            <div className="text-channel-sidebar-font">
                <button onClick={handleSearch} className="btn is-primary font-bold">Search</button>
                <div id="messageIfNoSearchCondition"></div>
            </div>
            </div>
      </div>

    )
}
 
export default Searchbar