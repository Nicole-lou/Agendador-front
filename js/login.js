// autenticação do login JS google - Firebase
// O jeito moderno (Modular - Versão 10+)
// O que está dentro das chaves { } são as funções específicas que você "puxa" da biblioteca
import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

// Importamos a configuração que vem do outro arquivo
import { auth } from './firebase-config.js';


document.querySelector('#google-login').addEventListener('click', () => {
    const provider = new GoogleAuthProvider(); // Criamos o "configurador" do Google

    // Chamamos a função passando a nossa 'auth' e o 'provider'
    signInWithPopup(auth, provider)
        .then((result) => {
            // O que acontece quando o usuário termina de logar na janelinha
            console.log("Usuário logado:", result.user);
            alert(`Bem-vindo, ${result.user.displayName}!`);
        })
        .catch((error) => {
    // Manter isso para  conseguir debugar no F12 se a internet cair ou o Google falhar
    console.error("Erro na autenticação com Google:", error);

    // Se o usuário simplesmente fechou a janelinha do Google sem escolher um e-mail
    if (error.code === 'auth/popup-closed-by-user') {
        return; // Não faz nada, o usuário só desistiu de logar
    }

    // Para qualquer outro erro real (ex: queda de conexão)
    alert("Não foi possível conectar com o Google. Tente novamente em instantes.");
});
});

// autenticação do login JS email e senha - Firebase

const btnCriarConta = document.querySelector('.btn-cadastro');
// Valores dos inputs na hora do clique de cadastro
btnCriarConta.addEventListener('click', () => {
    const name = document.querySelector('#register-name').value;
    const email = document.querySelector('#register-email').value;
    const senha = document.querySelector('#register-password').value;
    const confirmPassword = document.querySelector('#register-confirm-password').value;

    // Validação simples: verificar se as senhas coincidem
    if (password !== confirmPassword) {
        alert("As senhas devem ser iguais!");
        return; // Para a execução se as senhas não coincidirem
    }
    // Validação de caracteres de senha
    if(password.length < 6) {
        alert("A senha deve conter no mínimo 6 caracteres!");
        return; // Para a execução se a senha for muito curta
    }

    // chamada do firebase para criar a conta, usando os valores dos inputs
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    console.log("Conta criada com sucesso:", user.uid);
    alert(`Conta criada com sucesso! Bem-vinda, ${name}!`);

    document.querySelector('#register-name').value = '';
    document.querySelector('#register-email').value = '';
    document.querySelector('#register-password').value = '';
    document.querySelector('#register-confirm-password').value = '';
})

.catch((error) => {
    console.error("Erro ao cadastrar:", error.code);
});

// Tratamento de erros específicos para melhorar a experiência do usuário
if(error.code === 'auth/email-already-in-use') {
    alert("Este e-mail já está em uso.")
    } else if (error.code === 'auth/invalid-email') {
        alert("O e-mail fornecido é inválido.");
    } else {
        alert("Erro ao criar a conta: " + error.message);
    }
});

// validação para mostrar ou esconder a senha no formulário de cadastro
const checkLoginPass = document.querySelector('#show-login-pass');
const inputLoginPass = document.querySelector('#register-password');

checkLoginPass.addEventListener('change', () => {
    inputLogin.Pas.type = checkLoginPass.checked ? 'text' : 'password';
});

const checkRegisterPass = document.querySelector('#show-register-pass');
const inputRegisterPass = document.querySelector('#register-password');
const inputRegisterConfirm = document.querySelector('#register-confirm-password');

checkRegisterPass.addEventListener('change', () => {
    const tipo = checkRegisterPass.checked ? 'text' : 'password';
    inputRegisterPass.type = tipo;
    inputRegisterConfirm.type = tipo;
});









