// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const apiScope = 'https://allowance.onmicrosoft.com/allowanceapi/user_impersonation';
const dataApiUrl = 'https://allowanceapi.azurewebsites.net/api';

const graphScope = 'user.read';
const graphUrl = 'https://graph.microsoft.com/v1.0/me';

export const environment = {
  production: false,
  authority:
    'https://allowance.b2clogin.com/allowance.onmicrosoft.com/B2C_1_SignUpSignIn',
  dataApiUrl,
  appPath: 'http://localhost:4200',
  redirectUri: 'http://localhost:4200',
  appTitle: 'Allowance - HYBRID',
  clientId: '45ef1ae1-c126-4314-b819-c6adb6c0fb42',
  cacheLocation: 'localStorage',
  validateAthority: false,
  apiScope,
  contentScopes: [apiScope],
  protectedResourceMap: new Map( [[dataApiUrl, [apiScope]]]),
  secureApi:  true,
  storeAuthStateInCookie: true
};
