// autenticação do login JS - Firebase
document.querySelector('#google-login').addEventListener('click', function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
});
