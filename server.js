const express = require('express');
const morgan = require('morgan');
const path = require('path');
const argv = require('yargs')
   .usage('Usage: $0 -p [PORT]')
   .alias('p', 'port')
   .describe('port', '(Optional) Port Number - default is 3000')
   .strict()
   .argv;

const DEFAULT_PORT = 3000;

// inicializando o express.
const app = express();

//  Inicializando as variáveis.
let port = DEFAULT_PORT; // -p {PORT} || 3000;
if (argv.p) {
   port = argv.p;
}

// Configure o módulo morgan para logar todos os requests.
app.use(morgan('dev'));

// Setar o folder do front-end para utilizar o assets publico.
app.use("/lib", express.static(path.join(__dirname, "../../lib/msal-browser/lib")));

// Faça o setup da pasta dos apps
app.use(express.static('app'));

// Configure a rota para index.html
app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname + '/index.html'));
});

// Inicia o server.
app.listen(port);
console.log(`Listening on port ${port}...`);