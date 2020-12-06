import React from 'react'
import { Route,Redirect,RouteProps } from 'react-router-dom';
import * as AWS from 'aws-sdk'

const Auth: React.FC = (props: RouteProps) => {
    // whether user is logged in is checked by AWS.config.credentials
    let isLoggedIn = (AWS.config.credentials !== null)
    return (
        isLoggedIn ? <Route children={props.children} /> : <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
    )
}
export default Auth