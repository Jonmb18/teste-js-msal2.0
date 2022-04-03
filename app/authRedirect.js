// Criar a instância principal myMSALObj
// configuração dos parâmetros está localizada na página authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let accessToken;
let username = "";

//  Redirect: quando o login é feito com sucesso e redireciona com tokens, ele chama a Graph API
myMSALObj.handleRedirectPromise().then(handleResponse).catch(err => {
    console.error(err);
});

function handleResponse(resp) {
    if (resp !== null) {
        username = resp.account.username;
        showWelcomeMessage(resp.account);
    } else {
        const currentAccounts = myMSALObj.getAllAccounts();
        if (currentAccounts === null) {
            return;
        } else if (currentAccounts.length > 1) {
            // Adicione um código escolhido para a conta aqui
            console.warn("Muitas contas detectadas.");
        } else if (currentAccounts.length === 1) {
            username = currentAccounts[0].username;
            showWelcomeMessage(currentAccounts[0]);
        }
    }
}

function signIn() {
    myMSALObj.loginRedirect(loginRequest);
}

function signOut() {
    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username)
    };

    myMSALObj.logout(logoutRequest);
}

function getTokenRedirect(request) {
    request.account = myMSALObj.getAccountByUsername(username);
    return myMSALObj.acquireTokenSilent(request).catch(error => {
            console.warn("aquisição de token silencioso falhou. adquirindo token utilizando redirect");
            if (error instanceof msal.InteractionRequiredAuthError) {
                // fallback para a interação quando chamadas silenciosas falham
                return myMSALObj.acquireTokenRedirect(request);
            } else {
                console.warn(error);
            }
        });
}

function seeProfile() {
    getTokenRedirect(loginRequest).then(response => {
        callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
        profileButton.classList.add('d-none');
        mailButton.classList.remove('d-none');
    }).catch(error => {
        console.error(error);
    });
}

function readMail() {
    getTokenRedirect(tokenRequest).then(response => {
        callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI);
    }).catch(error => {
        console.error(error);
    });
}