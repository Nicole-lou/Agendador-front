// autenticação do login JS - Firebase
// O jeito moderno (Modular - Versão 10+)
// O que está dentro das chaves { } são as funções específicas que você "puxa" da biblioteca
import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
            // O que acontece se o usuário fechar a janela ou der erro
            console.error("Erro ao logar com o Google:", error.code);
        });
});