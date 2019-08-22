// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authority:
    'https://login.microsoftonline.com/CarlosRocchetti.onmicrosoft.com',
  dataApiUrl: 'https://allowance-functions.azurewebsites.net/api/',
  appPath: 'http://localhost:4200',
  appTitle: 'Allowance - DEVELOPMENT',
  clientId: '88bd734d-2378-4e04-a900-1bf83b88a43f',
  cacheLocation: 'localStorage',
  contentScopes: [
    'user.read',
    // 'api://1663b9c6-436f-49e9-84b1-684638c20921/Child.Write',
    'api://1663b9c6-436f-49e9-84b1-684638c20921/User.Read'
  ],
  protectedResourceMap: [
    [
      'https://allowance-functions.azurewebsites.net/api/',
      ['api://1663b9c6-436f-49e9-84b1-684638c20921/User.Read']
    ],
    ['https://graph.microsoft.com/v1.0/me', ['user.read']]
  ]
};
