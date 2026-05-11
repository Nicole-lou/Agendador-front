// autenticação do login JS - Firebase
// O jeito moderno (Modular - Versão 10+)
document.querySelector('#google-login').addEventListener('click', () => {
    const provider = new GoogleAuthProvider(); // Criamos o "configurador" do Google

    // Chamamos a função passando a nossa 'auth' e o 'provider'
    signInWithPopup(auth, provider)
        .then((result) => {
            // O que acontece quando o usuário termina de logar na janelinha
            console.log("Usuário logado:", result.user);
            alert(`Olá, ${result.user.displayName}!`);
        })
        .catch((error) => {
            // O que acontece se o usuário fechar a janela ou der erro
            console.error("Erro no login:", error.code);
        });
});