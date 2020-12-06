import React from 'react'
import { useHistory } from 'react-router';
import * as AWS from 'aws-sdk'
import { useDispatch } from 'react-redux'
import settingModule,{ State,getDynamo } from '../setting/settingModule'

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js"
import awsConfiguration from '../awsConfiguration'
import { Auth } from 'aws-amplify';

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
})

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const changedEmailHaldler = (e: any) => setEmail(e.target.value)
  const changedPasswordHandler = (e: any) => setPassword(e.target.value)
  // call Hooks in root
  // ref: https://qiita.com/tatsumin0206/items/4e1076e2deedf20a9485
  const history = useHistory();
  const dispatch = useDispatch();


  const signIn = () => {
    AWS.config.region = awsConfiguration.region
    const authenticationDetails = new AuthenticationDetails({
      Username : email,
      Password : password
    });
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });
  

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: async(result) => {
        let uuid = ""
        try {
            const user = await Auth.signIn(email, password);
            console.log("amplify auth")
            console.log(user)
            uuid = user['attributes']['sub']
        } catch (error) {
            console.log('error signing in', error);
        }
        console.log('uuid is',uuid)
        const IdentityProviderName = `cognito-idp.${awsConfiguration.region}.amazonaws.com/${awsConfiguration.UserPoolId}`
        const IdToken = result.getIdToken().getJwtToken()
        
        const params = {
            IdentityPoolId: awsConfiguration.IdentityPoolId,
            Logins: {
                [IdentityProviderName]: IdToken
            }
        };
        const cognitoidentity = new AWS.CognitoIdentity();
        const IdentityIdResponse = await cognitoidentity.getId(params).promise();
        const IdentityId = IdentityIdResponse['IdentityId'];
        AWS.config.region = awsConfiguration.region;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: awsConfiguration.IdentityPoolId,
          IdentityId: IdentityId,
          Logins: {
            [IdentityProviderName]: IdToken
          }
        });
        // add IdentityId to store and read setting from DynamoDB
        if (IdentityId != null) {
          dispatch(settingModule.actions.addUUID(uuid))
          const settingFromDynamo = await getDynamo(uuid)
          console.log("read setting from DynamoDB in SignIn.tsx")
          console.log(settingFromDynamo)
          console.log("Sign in and set setting from DynamoDB in SignIn.tsx")
          dispatch(settingModule.actions.changeSetting(settingFromDynamo))
        }
        
        
        // redirect to home 
        history.push('/');
        
        setEmail('')
        setPassword('')
      },
      onFailure: (err) => {
        console.log("cognito authentication error in SignIn.tsx")
        console.error(err)
      }
    });

  }


  return (
    <div className="SignIn">
      <h1 id="signinPhrase">SignIn</h1>
      <input type="text" placeholder='email' id="signinEmail" onChange={changedEmailHaldler}/>
      <input type="text" placeholder='password' id="signinPassword" onChange={changedPasswordHandler}/>
      <button id="signinButton" onClick={signIn}>Sign In</button>
    </div>
  )
}

export default SignIn