let lista = document.getElementById("li");

const pesqbot = document.getElementById("botao-pesquisar")
const form = document.getElementById('formulario');
const userList = document.getElementById('userList');
const addButton = document.getElementById('botao-adicionar');
const clearButton = document.getElementById('botao-limpar');
const deleteAllButton = document.getElementById('botao-deletar');
const search = document.getElementById('pesquisa');
let userCount = 1;
let cadastrados = [];

function renderUserList() {
    userList.innerHTML = '';
    cadastrados.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.timestamp} - Nome: ${user.name}, E-mail: ${user.email}`;
        userList.appendChild(listItem);
    });
}

function addUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (name === "" || email === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    const timestamp = new Date().toLocaleDateString();
    const userData = { id: userCount++, name, email, timestamp };
    cadastrados.push(userData);
    const listItem = document.createElement('li');
    listItem.textContent = `${timestamp} - Nome: ${name}, E-mail: ${email}`;
    userList.appendChild(listItem);
    localStorage.setItem('user', JSON.stringify(cadastrados));
    renderUserList();
    form.reset();
}

function limparForm() {
    form.reset();
}

function deleteAllUsers() {
    userList.innerHTML = '';
    cadastrados = [];
    localStorage.clear();
    renderUserList();
}

function pesquisa(){
    const dados = JSON.parse(localStorage.getItem('user'))
    let pesq = search.value + '';
    for(let i=0; i<cadastrados.length;i++){
        let nome = dados[i].name + '';
        let email = dados[i].email + '';

        if(nome.includes(pesq) || email.includes(pesq)){
            limparForm();
            const listItem = document.createElement('li');
            listItem.textContent = `${dados[i].timestamp} - Nome: ${dados[i].name}, E-mail: ${dados[i].email}`;
            userList.appendChild(listItem);
        }
        
    }
}

function remover(mail){
    localStorage.removeItem(mail);
}


pesqbot.addEventListener('click', pesquisa);
renderUserList();
addButton.addEventListener('click', addUser);
clearButton.addEventListener('click', limparForm);
deleteAllButton.addEventListener('click', deleteAllUsers);
