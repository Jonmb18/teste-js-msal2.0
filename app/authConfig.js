const msalConfig = {
  auth: {
    clientId: "af02e1df-063b-4f2a-8b3b-ef9368ab2bf9",
    authority: "https://login.microsoftonline.com/consumers",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // Isso configura onde seu cache será guardado
    storeAuthStateInCookie: false, // Sete isso para "true" se você está tendo dificuldades com o IE11 ou Edge
  }
};

// Adicione escopos aqui para que o ID token seja utilizado nas plataformas de identificação da Microsoft.
const loginRequest = {
 scopes: ["openid", "profile", "User.Read"]
};

// Adicione escopos aqui para acessar o token que será utilizado na API Microsoft Graph.
const tokenRequest = {
 scopes: ["User.Read", "Mail.Read"]
};