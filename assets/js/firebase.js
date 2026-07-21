import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBmdqhWE2ig3hVBKlSwgrhzL_jjugzSsZ0",
    authDomain: "got-interactive-map.firebaseapp.com",
    projectId: "got-interactive-map",
    storageBucket: "got-interactive-map.firebasestorage.app",
    messagingSenderId: "58309078925",
    appId: "1:583090078925:web:8d6425ec41bbf4361f1584",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Log Firebase initialization
console.log('Firebase initialized with config:', firebaseConfig);
console.log('Firebase App:', app);
console.log('Firebase Auth:', auth);
console.log('Google Provider:', googleProvider);
console.log('Current domain:', window.location.origin);

// Authentication state management
let currentTab = 'signin'; // 'signin' or 'signup'
let isForgotPasswordMode = false;

// DOM Elements
const authModal = document.getElementById('authModal');
const authModalBackdrop = document.getElementById('authModalBackdrop');
const authModalClose = document.getElementById('authModalClose');
const authModalTitle = document.getElementById('authModalTitle');
const authTabSignIn = document.getElementById('authTabSignIn');
const authTabSignUp = document.getElementById('authTabSignUp');
const authModalForm = document.getElementById('authModalForm');
const authModalNameGroup = document.getElementById('authModalNameGroup');
const authModalName = document.getElementById('authModalName');
const authModalEmail = document.getElementById('authModalEmail');
const authModalPassword = document.getElementById('authModalPassword');
const authModalConfirmPasswordGroup = document.getElementById('authModalConfirmPasswordGroup');
const authModalConfirmPassword = document.getElementById('authModalConfirmPassword');
const authModalPasswordToggle = document.getElementById('authModalPasswordToggle');
const authModalMessage = document.getElementById('authModalMessage');
const authModalSubmit = document.getElementById('authModalSubmit');
const authModalForgot = document.getElementById('authModalForgot');
const googleSignInBtn = document.getElementById('googleSignInBtn');
const appleSignInBtn = document.getElementById('appleSignInBtn');
const emailModalBtn = document.getElementById('emailModalBtn');
const authCardsContainer = document.getElementById('authCardsContainer');
const welcomePanel = document.getElementById('welcomePanel');
const welcomeUserName = document.getElementById('welcomeUserName');
const welcomeUserEmail = document.getElementById('welcomeUserEmail');
const welcomeProfileImage = document.getElementById('welcomeProfileImage');
const welcomeProfileAvatar = document.getElementById('welcomeProfileAvatar');
const welcomeDisplayName = document.getElementById('welcomeDisplayName');
const welcomeEmail = document.getElementById('welcomeEmail');
const signOutBtn = document.getElementById('signOutBtn');
const toastContainer = document.getElementById('toastContainer');
const gateNotification = document.getElementById('gateNotification');
const joinRealmSection = document.getElementById('joinRealm');

// Utility functions
function showAuthModalMessage(message, type = 'error') {
    authModalMessage.textContent = message;
    authModalMessage.className = `auth-modal-message show ${type}`;
    setTimeout(() => {
        authModalMessage.className = 'auth-modal-message';
    }, 5000);
}

function clearAuthModalMessage() {
    authModalMessage.className = 'auth-modal-message';
    authModalMessage.textContent = '';
}

function openAuthModal() {
    authModal.classList.add('show');
    authModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    authModal.classList.remove('show');
    authModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    clearAuthModalMessage();
    resetAuthModalForm();
}

function resetAuthModalForm() {
    authModalForm.reset();
    currentTab = 'signin';
    isForgotPasswordMode = false;
    updateAuthModalUI();
}

function updateAuthModalUI() {
    if (isForgotPasswordMode) {
        authModalTitle.textContent = 'Reset Password';
        authModalNameGroup.style.display = 'none';
        authModalConfirmPasswordGroup.style.display = 'none';
        authModalSubmit.textContent = 'Send Reset Link';
        authModalForgot.style.display = 'none';
        document.querySelectorAll('.auth-tab').forEach(tab => tab.style.display = 'none');
    } else {
        document.querySelectorAll('.auth-tab').forEach(tab => tab.style.display = 'block');
        
        if (currentTab === 'signin') {
            authModalTitle.textContent = 'Sign In';
            authModalNameGroup.style.display = 'none';
            authModalConfirmPasswordGroup.style.display = 'none';
            authModalSubmit.textContent = 'Sign In';
            authModalForgot.style.display = 'block';
            authTabSignIn.classList.add('auth-tab-active');
            authTabSignUp.classList.remove('auth-tab-active');
        } else {
            authModalTitle.textContent = 'Create Account';
            authModalNameGroup.style.display = 'flex';
            authModalConfirmPasswordGroup.style.display = 'flex';
            authModalSubmit.textContent = 'Create Account';
            authModalForgot.style.display = 'none';
            authTabSignIn.classList.remove('auth-tab-active');
            authTabSignUp.classList.add('auth-tab-active');
        }
    }
}

function switchTab(tab) {
    currentTab = tab;
    isForgotPasswordMode = false;
    clearAuthModalMessage();
    updateAuthModalUI();
}

function toggleModalPasswordVisibility() {
    const type = authModalPassword.type === 'password' ? 'text' : 'password';
    authModalPassword.type = type;
    authModalPasswordToggle.innerHTML = type === 'text' 
        ? '<svg class="auth-modal-password-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>'
        : '<svg class="auth-modal-password-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>';
}

function setModalLoading(isLoading) {
    authModalSubmit.disabled = isLoading;
    authModalSubmit.textContent = isLoading ? 'Processing...' : (isForgotPasswordMode ? 'Send Reset Link' : (currentTab === 'signup' ? 'Create Account' : 'Sign In'));
}

function updateAuthUI() {
    const user = auth.currentUser;
    if (user) {
        // Show welcome panel, hide auth cards
        authCardsContainer.style.display = 'none';
        welcomePanel.style.display = 'block';
        
        // Update welcome panel with user info
        const displayName = user.displayName || 'Traveler';
        welcomeUserName.textContent = displayName;
        welcomeUserEmail.textContent = user.email;
        welcomeDisplayName.textContent = displayName;
        welcomeEmail.textContent = user.email;
        
        if (user.photoURL) {
            welcomeProfileImage.src = user.photoURL;
            welcomeProfileImage.style.display = 'block';
            welcomeProfileAvatar.style.display = 'none';
        } else {
            welcomeProfileImage.style.display = 'none';
            welcomeProfileAvatar.style.display = 'grid';
        }
    } else {
        // Show auth cards, hide welcome panel
        authCardsContainer.style.display = 'block';
        welcomePanel.style.display = 'none';
    }
}

function showToast(title, message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-header">${title}</div>
        <p class="toast-message">${message}</p>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}

function showGateNotification() {
    gateNotification.classList.add('show');
    joinRealmSection.classList.add('gate-highlight');
    
    // Scroll to Join the Realm section
    joinRealmSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Focus Google Sign-In button
    setTimeout(() => {
        if (googleSignInBtn) {
            googleSignInBtn.focus();
        }
    }, 500);
    
    // Hide notification and remove glow after 3 seconds
    setTimeout(() => {
        gateNotification.classList.remove('show');
    }, 3000);
    
    setTimeout(() => {
        joinRealmSection.classList.remove('gate-highlight');
    }, 2500);
}

function handleProtectedNavigation(e) {
    const user = auth.currentUser;
    if (!user) {
        e.preventDefault();
        showGateNotification();
        return false;
    }
    return true;
}

// Authentication functions
async function handleGoogleSignIn() {
    try {
        console.log('Starting Google Sign-In...');
        console.log('Firebase Auth:', auth);
        console.log('Google Provider:', googleProvider);
        
        googleSignInBtn.disabled = true;
        googleSignInBtn.textContent = 'Signing in...';
        
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google sign in successful:', result.user);
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Full error object:', JSON.stringify(error, null, 2));
        
        alert(`Google Sign-In Error:\nCode: ${error.code}\nMessage: ${error.message}`);
    } finally {
        googleSignInBtn.disabled = false;
        googleSignInBtn.textContent = 'Continue with Google';
    }
}

async function handleModalEmailAuth(e) {
    e.preventDefault();
    
    const email = authModalEmail.value.trim();
    const password = authModalPassword.value;
    const name = authModalName.value.trim();
    
    console.log('Starting Email Authentication...');
    console.log('Mode:', currentTab);
    console.log('Forgot Password:', isForgotPasswordMode);
    console.log('Email:', email);
    
    if (!email || !password) {
        showAuthModalMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    if (currentTab === 'signup') {
        if (!name) {
            showAuthModalMessage('Please enter your name.', 'error');
            return;
        }
        const confirmPassword = authModalConfirmPassword.value;
        if (password !== confirmPassword) {
            showAuthModalMessage('Passwords do not match.', 'error');
            return;
        }
        if (password.length < 6) {
            showAuthModalMessage('Password must be at least 6 characters.', 'error');
            return;
        }
    }
    
    try {
        setModalLoading(true);
        clearAuthModalMessage();
        
        if (isForgotPasswordMode) {
            console.log('Sending password reset email to:', email);
            await sendPasswordResetEmail(auth, email);
            showAuthModalMessage('Password reset email sent! Check your inbox.', 'success');
            setTimeout(() => {
                closeAuthModal();
            }, 2000);
        } else if (currentTab === 'signup') {
            console.log('Creating account for:', email);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Account created:', userCredential.user);
            await updateProfile(userCredential.user, { displayName: name });
            showAuthModalMessage('Account created successfully!', 'success');
            setTimeout(() => {
                closeAuthModal();
            }, 1500);
        } else {
            console.log('Signing in user:', email);
            await signInWithEmailAndPassword(auth, email, password);
            showAuthModalMessage('Signed in successfully!', 'success');
            setTimeout(() => {
                closeAuthModal();
            }, 1000);
        }
    } catch (error) {
        console.error('Email Authentication Error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Full error object:', JSON.stringify(error, null, 2));
        
        showAuthModalMessage(`Error: ${error.code} - ${error.message}`, 'error');
    } finally {
        setModalLoading(false);
    }
}

function handleForgotPassword() {
    isForgotPasswordMode = true;
    clearAuthModalMessage();
    updateAuthModalUI();
}

async function handleSignOut() {
    try {
        await signOut(auth);
        console.log('User signed out');
    } catch (error) {
        console.error('Sign out error:', error);
    }
}

function getErrorMessage(code) {
    const errorMessages = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/weak-password': 'Password is too weak. Please use a stronger password.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/too-many-requests': 'Too many attempts. Please try again later.',
        'auth/popup-closed-by-user': 'Sign in cancelled.',
        'auth/invalid-credential': 'Invalid credentials.',
        'auth/missing-password': 'Please enter your password.',
        'auth/invalid-password': 'Invalid password format.',
        'auth/internal-error': 'An internal error occurred. Please try again.'
    };
    return errorMessages[code] || 'An error occurred. Please try again.';
}

// Event listeners
if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', handleGoogleSignIn);
}

if (appleSignInBtn) {
    appleSignInBtn.addEventListener('click', () => {
        showToast('🍎 Apple Sign-In', 'Apple Sign-In is coming soon. Google and Email Sign-In are available now.');
    });
}

if (emailModalBtn) {
    emailModalBtn.addEventListener('click', () => {
        resetAuthModalForm();
        openAuthModal();
    });
}

if (authModalBackdrop) {
    authModalBackdrop.addEventListener('click', closeAuthModal);
}

if (authModalClose) {
    authModalClose.addEventListener('click', closeAuthModal);
}

if (authTabSignIn) {
    authTabSignIn.addEventListener('click', () => switchTab('signin'));
}

if (authTabSignUp) {
    authTabSignUp.addEventListener('click', () => switchTab('signup'));
}

if (authModalForm) {
    authModalForm.addEventListener('submit', handleModalEmailAuth);
}

if (authModalPasswordToggle) {
    authModalPasswordToggle.addEventListener('click', toggleModalPasswordVisibility);
}

if (authModalForgot) {
    authModalForgot.addEventListener('click', handleForgotPassword);
}

if (signOutBtn) {
    signOutBtn.addEventListener('click', handleSignOut);
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && authModal.classList.contains('show')) {
        closeAuthModal();
    }
});

// Authentication gate - protect navigation items
function setupAuthenticationGate() {
    // Navigation links
    const protectedNavLinks = document.querySelectorAll('nav a[href="map.html"], nav a[href="timeline.html"], nav a[href="houses.html"], nav a[href="characters.html"], nav a[href="dragons.html"], nav a[href="battles.html"], nav a[href="castles.html"], nav a[href="search.html"]');
    
    protectedNavLinks.forEach(link => {
        link.addEventListener('click', handleProtectedNavigation);
    });
    
    // Hero buttons
    const enterMapBtn = document.querySelector('a[href="map.html"].btn.primary');
    const readTimelineBtn = document.querySelector('a[href="timeline.html"].btn.ghost');
    
    if (enterMapBtn) {
        enterMapBtn.addEventListener('click', handleProtectedNavigation);
    }
    
    if (readTimelineBtn) {
        readTimelineBtn.addEventListener('click', handleProtectedNavigation);
    }
}

// Setup authentication gate on page load
document.addEventListener('DOMContentLoaded', setupAuthenticationGate);

// Auth state observer
onAuthStateChanged(auth, (user) => {
    updateAuthUI();
    if (user) {
        console.log('User is signed in:', user);
    } else {
        console.log('User is signed out');
    }
});