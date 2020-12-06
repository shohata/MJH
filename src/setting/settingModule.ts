import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import awsConfiguration from '../awsConfiguration'
import * as AWS from 'aws-sdk'

import { API, graphqlOperation } from "aws-amplify"
import { getUserinfo, updateUserinfo } from '../graphql/mutations'
import { GraphQLResult } from "@aws-amplify/api";
import { GetUserinfoMutation,GetUserinfoMutationVariables, UpdateUserinfoMutationVariables, UpdateUserinfoMutation } from '../API'
 
export type State = {
    isMgr: boolean,
    name: string,
    team: string,
    subscriptionKeywords: string[],
    uuid?: string
}
 
const initialState: State = {
    isMgr: false,
    name: 'John Doe',
    team: 'GAME',
    subscriptionKeywords: ['piyo'],
    uuid: 'tempId'
}
export const getDynamo = async (uuid: string) => {
    // call appsync
    const paramsGetUserinfo: GetUserinfoMutationVariables = {
        uuid: uuid
    }
    console.log("getDynamo at settingModule.ts")
    const userinfo = await API.graphql(graphqlOperation(getUserinfo, paramsGetUserinfo)) as GraphQLResult<GetUserinfoMutation>;
    console.log("userinfo in settingModule.ts")
    console.log(userinfo.data?.getUserinfo)
    return userinfo.data?.getUserinfo as State
}

export const updateDynamo = async (settings: State) => {
    console.log("updateDynamo at settingModule.ts")
    const paramsUpdateUserinfo: UpdateUserinfoMutationVariables = {
        uuid: settings.uuid as string,
        name: settings.name,
        team: settings.team,
        isMgr: settings.isMgr,
        subscriptionKeywords: settings.subscriptionKeywords
    }
    const updatedUserinfo = await API.graphql(graphqlOperation(updateUserinfo, paramsUpdateUserinfo)) as GraphQLResult<UpdateUserinfoMutation>;
    console.log("updated userinfo in settingModule.ts")
    console.log(updatedUserinfo.data?.updateUserinfo)
    return updatedUserinfo.data?.updateUserinfo as State
  }
 
 
const settingModule = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeSetting (state: State, action: PayloadAction<State>) {
            state = action.payload
            // return state to redraw
            return state
        },
        addUUID (state: State, action: PayloadAction<string>) {
            state.uuid = action.payload
        }
    }
})
 
export default settingModule