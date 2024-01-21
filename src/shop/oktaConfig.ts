export const oktaConfig = {

    clientId: '0oaekqco79gTfXQbC5d7',
    issuer: 'https://dev-75207326.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpCheck: true,
}