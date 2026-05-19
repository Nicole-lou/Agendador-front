// autenticação do login JS - Firebase
// O jeito moderno (Modular - Versão 10+)
// O que está dentro das chaves { } são as funções específicas que você "puxa" da biblioteca
import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword 
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

createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
        alert("Conta criada com sucesso! Bem-vinda!");
    })
    .catch((error) => {
        console.error("Erro ao cadastrar:", error.code);
    });