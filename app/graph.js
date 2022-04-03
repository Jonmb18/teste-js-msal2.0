// Função para ajudar a chamar a API Microsoft Graph
// utilizando esquema de token de autorização
function callMSGraph(endpoint, token, callback) {
  const headers = new Headers();
  const bearer = `Bearer ${token}`;

  headers.append("Authorization", bearer);

  const options = {
      method: "GET",
      headers: headers
  };

  console.log('Requisição feita à API Graph em: ' + new Date().toString());

  fetch(endpoint, options)
      .then(response => response.json())
      .then(response => callback(response, endpoint))
      .catch(error => console.log(error));
}