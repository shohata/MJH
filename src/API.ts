/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type AddReportMutationVariables = {
  category?: string | null,
  author?: string | null,
  attendedSAs?: Array< string | null > | null,
  industry?: string | null,
  companyName?: string | null,
  title?: string | null,
  content?: string | null,
  date?: string | null,
  tags?: Array< string | null > | null,
};

export type AddReportMutation = {
  addReport:  {
    __typename: "Report",
    category: string | null,
    id: string | null,
    author: string,
    attendedSAs: Array< string | null > | null,
    industry: string | null,
    companyName: string | null,
    title: string,
    content: string,
    date: string,
    tags: Array< string | null > | null,
    readByManager: boolean,
    readNumber: number,
  } | null,
};

export type AddUserinfoMutationVariables = {
  uuid: string,
  name?: string | null,
  team?: string | null,
  isMgr?: boolean | null,
  subscriptionKeywords?: Array< string | null > | null,
};

export type AddUserinfoMutation = {
  addUserinfo:  {
    __typename: "Userinfo",
    uuid: string,
    name: string | null,
    team: string | null,
    isMgr: boolean | null,
    subscriptionKeywords: Array< string | null > | null,
  } | null,
};

export type UpdateUserinfoMutationVariables = {
  uuid: string,
  name?: string | null,
  team?: string | null,
  isMgr?: boolean | null,
  subscriptionKeywords?: Array< string | null > | null,
};

export type UpdateUserinfoMutation = {
  updateUserinfo:  {
    __typename: "Userinfo",
    uuid: string,
    name: string | null,
    team: string | null,
    isMgr: boolean | null,
    subscriptionKeywords: Array< string | null > | null,
  } | null,
};

export type GetUserinfoMutationVariables = {
  uuid: string,
};

export type GetUserinfoMutation = {
  getUserinfo:  {
    __typename: "Userinfo",
    uuid: string,
    name: string | null,
    team: string | null,
    isMgr: boolean | null,
    subscriptionKeywords: Array< string | null > | null,
  } | null,
};

export type AllReportsQuery = {
  allReports:  Array< {
    __typename: "Report",
    category: string | null,
    id: string | null,
    author: string,
    attendedSAs: Array< string | null > | null,
    industry: string | null,
    companyName: string | null,
    title: string,
    content: string,
    date: string,
    tags: Array< string | null > | null,
    readByManager: boolean,
    readNumber: number,
  } | null > | null,
};

export type SearchReportsQueryVariables = {
  author?: string | null,
  attendedSA?: string | null,
  industry?: string | null,
  companyName?: string | null,
  title?: string | null,
  content?: string | null,
  from?: string | null,
  by?: string | null,
  tag?: string | null,
};

export type SearchReportsQuery = {
  searchReports:  Array< {
    __typename: "Report",
    category: string | null,
    id: string | null,
    author: string,
    attendedSAs: Array< string | null > | null,
    industry: string | null,
    companyName: string | null,
    title: string,
    content: string,
    date: string,
    tags: Array< string | null > | null,
    readByManager: boolean,
    readNumber: number,
  } | null > | null,
};
