const form = document.getElementById('formulario');
const userList = document.getElementById('userList');
const addButton = document.getElementById('botao-adicionar');
const clearButton = document.getElementById('botao-limpar');
const deleteAllButton = document.getElementById('botao-deletar');
const search = document.getElementById('pesquisa');

function addUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (name === "" || email === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    const timestamp = new Date().toLocaleDateString();
    const userData = { name, email, timestamp };
    const listItem = document.createElement('li');
    listItem.textContent = `${timestamp} - Nome: ${name}, E-mail: ${email}`;
    userList.appendChild(listItem);
    localStorage.setItem(email, JSON.stringify(userData));
    form.reset();
}

function limparForm() {
    form.reset();
}

function deleteAllUsers() {
    userList.innerHTML = '';
    localStorage.clear();
}

addButton.addEventListener('click', addUser);
clearButton.addEventListener('click', limparForm);
deleteAllButton.addEventListener('click', deleteAllUsers);