import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

import { auth } from './firebase-config.js';

// ---------- LOGIN COM GOOGLE ----------
document.querySelector('#google-login').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Usuário logado:", result.user);
            window.location.href = 'cliente-dashboard.html';
        })
        .catch((error) => {
            console.error("Erro na autenticação com Google:", error);
            if (error.code === 'auth/popup-closed-by-user') {
                return;
            }
            alert("Não foi possível conectar com o Google. Tente novamente em instantes.");
        });
});

// ---------- LOGIN COM EMAIL E SENHA ----------
const formLogin = document.querySelector('#form-login');
formLogin.addEventListener('submit', (e) => {
    e.preventDefault(); // ESSENCIAL: sem isso a página recarrega

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Login realizado:", userCredential.user.uid);
            window.location.href = 'cliente-dashboard.html';
        })
        .catch((error) => {
            console.error("Erro no login:", error.code);
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                alert("E-mail ou senha inválidos.");
            } else {
                alert("Erro ao entrar: " + error.message);
            }
        });
});

// ---------- ESQUECI MINHA SENHA ----------
document.querySelector('#forgot-password').addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value.trim();

    if (!email) {
        alert("Digite seu e-mail no campo acima antes de clicar em 'Esqueci minha senha'.");
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert(`Enviamos um link de redefinição de senha para ${email}. Verifique sua caixa de entrada (e o spam).`);
        })
        .catch((error) => {
            console.error("Erro ao enviar redefinição:", error.code);
            if (error.code === 'auth/user-not-found') {
                alert("Não encontramos uma conta com esse e-mail.");
            } else if (error.code === 'auth/invalid-email') {
                alert("Digite um e-mail válido.");
            } else {
                alert("Erro ao enviar e-mail de redefinição: " + error.message);
            }
        });
});

// ---------- CADASTRO ----------
const formCadastro = document.querySelector('#form-cadastro');
formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#register-name').value.trim();
    const email = document.querySelector('#register-email').value.trim();
    const password = document.querySelector('#register-password').value;
    const confirmPassword = document.querySelector('#register-confirm-password').value;

    if (password !== confirmPassword) {
        alert("As senhas devem ser iguais!");
        return;
    }

    if (password.length < 6) {
        alert("A senha deve conter no mínimo 6 caracteres!");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            console.log("Conta criada com sucesso:", user.uid);
            formCadastro.reset();
            window.location.href = 'cliente-dashboard.html';
        })
        .catch((error) => {
            console.error("Erro técnico no cadastro:", error.code);
            if (error.code === 'auth/email-already-in-use') {
                alert("Este e-mail já está cadastrado.");
            } else if (error.code === 'auth/invalid-email') {
                alert("O formato do e-mail é inválido.");
            } else {
                alert("Erro ao criar conta: " + error.message);
            }
        });
});

// ---------- MOSTRAR/ESCONDER SENHA ----------
const checkLoginPass = document.querySelector('#show-login-pass');
const inputLoginPass = document.querySelector('#password');

checkLoginPass.addEventListener('change', () => {
    inputLoginPass.type = checkLoginPass.checked ? 'text' : 'password';
});

const checkRegisterPass = document.querySelector('#show-register-pass');
const inputRegisterPass = document.querySelector('#register-password');
const inputRegisterConfirm = document.querySelector('#register-confirm-password');

checkRegisterPass.addEventListener('change', () => {
    const tipo = checkRegisterPass.checked ? 'text' : 'password';
    inputRegisterPass.type = tipo;
    inputRegisterConfirm.type = tipo;
});