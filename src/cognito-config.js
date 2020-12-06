import awsConfiguration from './awsConfiguration'
import { Auth } from 'aws-amplify';

const cognitoConfig = {
    Auth: {
        identityPoolId: awsConfiguration.IdentityPoolId,
        region: awsConfiguration.region,
        userPoolId: awsConfiguration.UserPoolId,
        userPoolWebClientId: awsConfiguration.ClientId
      },
    API: {
        graphql_endpoint: awsConfiguration.AppSyncEndpoint,
        graphql_headers: async () => {
          const currentSession = await Auth.currentSession();
          return { Authorization: currentSession.getIdToken().getJwtToken() };
        }
  }
}

export default cognitoConfig