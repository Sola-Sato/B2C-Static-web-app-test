export namespace AppConst {
  export const CLIENT_ID = 'c1d8102e-37fe-4ca6-8d03-79bd63c20243';
  export const MSAL_AUTHORITY = 'https://miyagawabtoc1.b2clogin.com/miyagawabtoc1.onmicrosoft.com/B2C_1_signin';
  export const MSAL_LOGIN_REDIRECT_URI = 'https://jolly-mud-045cf3600.1.azurestaticapps.net';
  export const MSAL_LOGOUT_REDIRECT_URI = 'https://jolly-mud-045cf3600.1.azurestaticapps.net';
  export const MSAL_KNOWN_AUTHORITIES = ['miyagawabtoc1.b2clogin.com'];

  export const API_SCOPE = 'https://miyagawabtoc1.onmicrosoft.com/9e058683-6b6e-4cef-bc58-704d0175ef60/All';
  export const MSAL_PROTECTED_RESOURCE_MAP = new Map([
    ['https://apimkita.azure-api.net/miyagawa-b2c/test', [API_SCOPE]],
  ])
}