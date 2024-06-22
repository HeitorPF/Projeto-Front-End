let list = document.querySelector('ul');

const form = document.getElementById('formulario');
const userList = document.getElementById('userList');
const addButton = document.getElementById('botao-adicionar');
const clearButton = document.getElementById('botao-limpar');
const deleteAllButton = document.getElementById('botao-deletar');
const search = document.getElementById('pesquisa');
const deleteChecked = document.getElementById('botao-deletar-checked')
let userCount = 1;
let cadastrados = [];
let selecionados = [];

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
    selecionados = [];
    localStorage.clear();
    renderUserList();
}

function pesquisa(){
    const dados = JSON.parse(localStorage.getItem('user'))
    let pesq = search.value + '';
    selecionados = [];
    if(pesq != '') {
        userList.innerHTML = '';
        for(let i=0; i<cadastrados.length;i++){
            let nome = dados[i].name + '';
            let email = dados[i].email + '';
    
            if(nome.includes(pesq) || email.includes(pesq)){
                const listItem = document.createElement('li');
                listItem.textContent = `${dados[i].timestamp} - Nome: ${dados[i].name}, E-mail: ${dados[i].email}`;
                userList.appendChild(listItem);
            }
            
        }
    }
    else{
        allUsers();
    }
    
}

function allUsers(){
    userList.innerHTML = '';
    for(let i=0; i<cadastrados.length;i++){
        const name = cadastrados[i].name;
        const email = cadastrados[i].email;
        const timestamp = cadastrados[i].timestamp;   
        const listItem = document.createElement('li');
        listItem.textContent = `${timestamp} - Nome: ${name}, E-mail: ${email}`;
        userList.appendChild(listItem)
    }
}


function remover(){
    let tam = selecionados.length;
    for(let i=0; i<tam;i++){
        console.log(selecionados);
        let resp = confirm(`deseja realmente excluir ${selecionados[i]}?`);
        if(resp == true){
            let mail = selecionados[i];
            for(let x=0; x<cadastrados.length;x++){
                if(cadastrados[x].email == mail){
                    cadastrados.splice(i, 1);
                }
            }
            localStorage.setItem('user', JSON.stringify(cadastrados)); 
        }
        else{
            alert("exclusão cancelada!");
        }
        selecionados.shift();
    }
    allUsers();
        
    }

list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        if(ev.target.classList == 'checked'){
            for(let i=0; i<cadastrados.length;i++){
                if(`${ev.target.textContent}`.includes(cadastrados[i].email)){
                    selecionados.push(cadastrados[i].email);
                }
            }
        }
        else{
            for(let i=0; i<selecionados.length; i++){
                if(`${ev.target.textContent}`.includes(selecionados[i])){
                    selecionados.splice(i, 1);
                }
            }
        }
        console.log(selecionados);
        
    }
});



deleteChecked.addEventListener('click', remover)
search.addEventListener('input', pesquisa);
renderUserList();
addButton.addEventListener('click', addUser);
clearButton.addEventListener('click', limparForm);
deleteAllButton.addEventListener('click', deleteAllUsers);
