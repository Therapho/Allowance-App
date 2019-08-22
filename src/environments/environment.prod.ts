export const environment = {
  production: true,
  authority: 'https://sts.windows.net/d40657b0-e2d2-431e-b401-c036ba8a425b/',
  dataApiUrl: 'https://allowance-functions.azurewebsites.net/api/',
  appPath: 'https://allowancestorage.z9.web.core.windows.net/',
  appTitle: 'Allowance',
  clientId: '88bd734d-2378-4e04-a900-1bf83b88a43f',
  cacheLocation: 'localStorage',
  contentScopes: [
    'user.read',
    // 'api://1663b9c6-436f-49e9-84b1-684638c20921/Child.Write',
    'api://1663b9c6-436f-49e9-84b1-684638c20921/Allowance.Access'
  ]
};
