/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const allReports = /* GraphQL */ `
  query AllReports {
    allReports {
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
export const searchReports = /* GraphQL */ `
  query SearchReports(
    $author: String
    $attendedSA: String
    $industry: String
    $companyName: String
    $title: String
    $content: String
    $from: AWSDate
    $by: AWSDate
    $tag: String
  ) {
    searchReports(
      author: $author
      attendedSA: $attendedSA
      industry: $industry
      companyName: $companyName
      title: $title
      content: $content
      from: $from
      by: $by
      tag: $tag
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
