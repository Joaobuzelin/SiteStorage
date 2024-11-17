const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");
const telefone = document.getElementById("telefone");
const cpf = document.getElementById("cpf");
const modal = document.getElementById("modal");
const loginBtn = document.querySelector(".login-btn");
const closeModalBtn = document.querySelector(".close-btn");
const userData = JSON.parse(localStorage.getItem("userData"));

loginBtn.addEventListener("click", () => {
    resetForm();
    openModal();
});

closeModalBtn.addEventListener("click", closeModal);

window.onclick = function(event) {
    if (event.target === modal) {
        return;
    }
};


function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

function resetForm() {
    form.reset();
    const formItems = form.querySelectorAll(".form-content");
    formItems.forEach(item => item.classList.remove("error"));
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkForm();
});

username.addEventListener("blur", checkInputUsername);
email.addEventListener("blur", checkInputEmail);
password.addEventListener("blur", checkInputPassword);
passwordConfirmation.addEventListener("blur", checkInputPasswordConfirmation);
telefone.addEventListener("blur", checkInputTelefone);
cpf.addEventListener("blur", checkInputCpf);

function checkInputUsername() {
    const usernameValue = username.value;
    if (usernameValue === "") {
        errorInput(username, "Preencha um username!");
    } else {
        removeError(username);
    }
}

function checkInputEmail() {
    const emailValue = email.value;
    if (emailValue === "") {
        errorInput(email, "O email é obrigatório!");
    } else {
        removeError(email);
    }
}

function checkInputPassword() {
    const passwordValue = password.value;
    if (passwordValue === "") {
        errorInput(password, "A senha é obrigatória.");
    } else if (passwordValue.length < 8) {
        errorInput(password, "A senha precisa ter no mínimo 8 caracteres.");
    } else {
        removeError(password);
    }
}

function checkInputPasswordConfirmation() {
    const passwordValue = password.value;
    const confirmationPasswordValue = passwordConfirmation.value;
    if (confirmationPasswordValue === "") {
        errorInput(passwordConfirmation, "A confirmação de senha é obrigatória!");
    } else if (confirmationPasswordValue !== passwordValue) {
        errorInput(passwordConfirmation, "As senhas são diferentes.");
    } else {
        removeError(passwordConfirmation);
    }
}

function checkInputCpf() {
    const cpfValue = cpf.value;
    if (cpfValue === "") {
        errorInput(cpf, "O CPF é obrigatório!");
    } else {
        removeError(cpf);
    }
}

cpf.addEventListener('keypress', () => {
    let cpflength = cpf.value.length;
    if (cpflength === 3 || cpflength === 7) {
        cpf.value += '.';
    } else if (cpflength === 11) {
        cpf.value += '-';
    }
});

function checkInputTelefone() {
    const telefoneValue = telefone.value;
    if (telefoneValue === "") {
        errorInput(telefone, "O telefone é obrigatório!");
    } else {
        removeError(telefone);
    }
}

telefone.addEventListener('keypress', () => {
    let telefonelength = telefone.value.length;
    if (telefonelength === 0) {
        telefone.value += '(';
    } else if (telefonelength === 3) {
        telefone.value += ') ';
    } else if (telefonelength === 10) {
        telefone.value += '-';
    }
});

function checkForm() {
    checkInputUsername();
    checkInputEmail();
    checkInputPassword();
    checkInputPasswordConfirmation();
    checkInputTelefone();
    checkInputCpf();

    const formItems = form.querySelectorAll(".form-content");
    const isValid = Array.from(formItems).every((item) => !item.classList.contains("error"));

    if (isValid) {
        saveUserData();
        alert("Cadastrado com sucesso!");
        console.log("Redirecionando para o perfil...");
        window.location.href = "perfil.html";
    }
}


function saveUserData() {
    const userData = {
        username: username.value,
        email: email.value,
        telefone: telefone.value,
        cpf: cpf.value,
        password: password.value,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
}

function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");
    textMessage.innerText = message;
    formItem.classList.add("error");
}

function removeError(input) {
    const formItem = input.parentElement;
    formItem.classList.remove("error");
}

function loadUserProfile() {

    console.log("Dados carregados do localStorage:", userData);

    if (userData) {

        document.getElementById("usernamePerfil").innerText = userData.username || "Não informado";
        document.getElementById("emailPerfil").innerText = userData.email || "Não informado";
        document.getElementById("telefonePerfil").innerText = userData.telefone || "Não informado";
        document.getElementById("cpfPerfil").innerText = userData.cpf || "Não informado";
    } else {

        alert("Nenhum dado de usuário encontrado!");
        window.location.href = "index.html";
    }
}

if (window.location.pathname.includes("perfil.html")) {
    loadUserProfile();
}