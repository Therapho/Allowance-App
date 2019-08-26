// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const apiScope = '';
const dataApiUrl = 'http://localhost:7071/api/';

const graphScope = 'user.read';
const graphUrl = 'https://graph.microsoft.com/v1.0/me';

export const environment = {
  production: false,
  authority:
    'https://allowance.b2clogin.com/allowance.onmicrosoft.com/B2C_1_SignUpSignIn',
  dataApiUrl,
  appPath: 'http://localhost:4200',
  appTitle: 'Allowance - LOCAL',
  clientId: '45ef1ae1-c126-4314-b819-c6adb6c0fb42',
  cacheLocation: 'localStorage',
  validateAthority: false,
  apiScope,
  contentScopes: null,
  protectedResourceMap: null,
  secureApi:  false
};