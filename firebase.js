import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "got-interactive-map.firebaseapp.com",
    projectId: "got-interactive-map",
    storageBucket: "got-interactive-map.firebasestorage.app",
    messagingSenderId: "58309078925",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.login = async function () {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
    } catch (error) {
        console.error(error);
    }
}

window.logout = async function () {
    await signOut(auth);
}

onAuthStateChanged(auth, (user) => {

    if (user) {

        document.getElementById("username").textContent = user.displayName;

        document.getElementById("email").textContent = user.email;

        document.getElementById("profile").src = user.photoURL;

        document.getElementById("loginBtn").style.display = "none";

        document.getElementById("logoutBtn").style.display = "inline-block";

    } else {

        document.getElementById("username").textContent = "";

        document.getElementById("email").textContent = "";

        document.getElementById("profile").src = "";

        document.getElementById("loginBtn").style.display = "inline-block";

        document.getElementById("logoutBtn").style.display = "none";

    }

});