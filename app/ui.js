// Selecione elementos DOM para se trabalhar com
const welcomeDiv = document.getElementById("WelcomeMessage");
const signInButton = document.getElementById("SignIn");
const cardDiv = document.getElementById("card-div");
const mailButton = document.getElementById("readMail");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");

function showWelcomeMessage(account) {
    // Reconfigurando elementos DOM
    cardDiv.style.display = 'initial';
    welcomeDiv.innerHTML = `Bem vindo ${account.username}`;
    signInButton.setAttribute("onclick", "signOut();");
    signInButton.setAttribute('class', "btn btn-success")
    signInButton.innerHTML = "Sair";
}

function updateUI(data, endpoint) {
    console.log('Graph API responded at: ' + new Date().toString());

    if (endpoint === graphConfig.graphMeEndpoint) {
        const title = document.createElement('p');
        title.innerHTML = "<strong>Título: Software Developer</strong>";
        const email = document.createElement('p');
        email.innerHTML = "<strong>E-mail: jonathanbaiao@hotmail.com</strong>";
        const phone = document.createElement('p');
        phone.innerHTML = "<strong>Telefone: +55 (81) 9 9883-6457</strong>";
        const address = document.createElement('p');
        address.innerHTML = "<strong>Localização: Seu Coração</strong>";
        profileDiv.appendChild(title);
        profileDiv.appendChild(email);
        profileDiv.appendChild(phone);
        profileDiv.appendChild(address);

    } else if (endpoint === graphConfig.graphMailEndpoint) {
        if (data.value.length < 1) {
            alert("Sua caixa de emails está vazia!!")
        } else {
            const tabList = document.getElementById("list-tab");
            tabList.innerHTML = ''; // limpa a tabList a cada chamada do readMail
            const tabContent = document.getElementById("nav-tabContent");

            data.value.map((d, i) => {
                // Mantendo simples
                if (i < 10) {
                    const listItem = document.createElement("a");
                    listItem.setAttribute("class", "list-group-item list-group-item-action")
                    listItem.setAttribute("id", "list" + i + "list")
                    listItem.setAttribute("data-toggle", "list")
                    listItem.setAttribute("href", "#list" + i)
                    listItem.setAttribute("role", "tab")
                    listItem.setAttribute("aria-controls", i)
                    listItem.innerHTML = d.subject;
                    tabList.appendChild(listItem)

                    const contentItem = document.createElement("div");
                    contentItem.setAttribute("class", "tab-pane fade")
                    contentItem.setAttribute("id", "list" + i)
                    contentItem.setAttribute("role", "tabpanel")
                    contentItem.setAttribute("aria-labelledby", "list" + i + "list")
                    contentItem.innerHTML = "<strong> from: " + d.from.emailAddress.address + "</strong><br><br>" + d.bodyPreview + "...";
                    tabContent.appendChild(contentItem);
                }
            });
        }
    }
}