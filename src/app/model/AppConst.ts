export namespace AppConst {
  export const CLIENT_ID = 'c1d8102e-37fe-4ca6-8d03-79bd63c20243';
  export const MSAL_AUTHORITY = 'https://b2crprogram001.b2clogin.com/b2crprogram001.onmicrosoft.com/B2C_1_signin';
  export const MSAL_LOGIN_REDIRECT_URI = 'https://calm-plant-0f2d52200.1.azurestaticapps.net';
  export const MSAL_LOGOUT_REDIRECT_URI = 'https://calm-plant-0f2d52200.1.azurestaticapps.net';
  export const MSAL_KNOWN_AUTHORITIES = ['b2crprogram001.b2clogin.com'];

  export const API_SCOPE = 'https://b2crprogram001.onmicrosoft.com/0856c814-50bc-4587-a75e-7b9495c5a19d/All';
  export const MSAL_PROTECTED_RESOURCE_MAP = new Map([
    ['https://b2c-maltitenant-001.azurewebsites.net/B2C-maltitenant-001/HttpTrigger1', [API_SCOPE]],
  ])
}
