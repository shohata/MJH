/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addReport = /* GraphQL */ `
  mutation AddReport(
    $category: String
    $author: String
    $attendedSAs: [String]
    $industry: String
    $companyName: String
    $title: String
    $content: String
    $date: AWSDate
    $tags: [String]
  ) {
    addReport(
      category: $category
      author: $author
      attendedSAs: $attendedSAs
      industry: $industry
      companyName: $companyName
      title: $title
      content: $content
      date: $date
      tags: $tags
    ) {
      category
      id
      author
      attendedSAs
      industry
      companyName
      title
      content
      date
      tags
      readByManager
      readNumber
    }
  }
`;
export const addUserinfo = /* GraphQL */ `
  mutation AddUserinfo(
    $uuid: String!
    $name: String
    $team: String
    $isMgr: Boolean
    $subscriptionKeywords: [String]
  ) {
    addUserinfo(
      uuid: $uuid
      name: $name
      team: $team
      isMgr: $isMgr
      subscriptionKeywords: $subscriptionKeywords
    ) {
      uuid
      name
      team
      isMgr
      subscriptionKeywords
    }
  }
`;
export const updateUserinfo = /* GraphQL */ `
  mutation UpdateUserinfo(
    $uuid: String!
    $name: String
    $team: String
    $isMgr: Boolean
    $subscriptionKeywords: [String]
  ) {
    updateUserinfo(
      uuid: $uuid
      name: $name
      team: $team
      isMgr: $isMgr
      subscriptionKeywords: $subscriptionKeywords
    ) {
      uuid
      name
      team
      isMgr
      subscriptionKeywords
    }
  }
`;
export const getUserinfo = /* GraphQL */ `
  mutation GetUserinfo($uuid: String!) {
    getUserinfo(uuid: $uuid) {
      uuid
      name
      team
      isMgr
      subscriptionKeywords
    }
  }
`;
