import { auth } from "./firebase-config.js";
import { 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

function isValidOrgEmail(email) {
  return email.endsWith("@bfs.or.kr");
}

const registerForm = document.getElementById("registerForm");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

function showError(message) {
  errorMsg.textContent = message;
  successMsg.textContent = "";
}

function showSuccess(message) {
  successMsg.textContent = message;
  errorMsg.textContent = "";
}

function getAuthErrorMessage(code) {
  const errors = {
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
    "auth/popup-closed-by-user": "Sign-in was cancelled.",
    "auth/cancelled-popup-request": null,
  };
  return errors[code] ?? "Something went wrong. Please try again.";
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  showError("");

  if (!isValidOrgEmail(email)) {
    showError("Must use a BFS organization email (@bfs.or.kr).");
    return;
  }

  if (password !== confirmPassword) {
    showError("Passwords do not match.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    showSuccess("Account created! Redirecting to login...");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  } catch (error) {
    const msg = getAuthErrorMessage(error.code);
    if (msg) showError(msg);
  }
});

// Google Sign Up
const googleBtn = document.getElementById("googleSignIn");
const provider = new GoogleAuthProvider();

googleBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    showSuccess("Signed in! Redirecting...");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  } catch (error) {
    const msg = getAuthErrorMessage(error.code);
    if (msg) showError(msg);
  }
});