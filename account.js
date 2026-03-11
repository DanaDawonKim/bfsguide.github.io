import { auth } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const accountView = document.getElementById("accountView");
const loggedOutView = document.getElementById("loggedOutView");
const userEmail = document.getElementById("userEmail");
const resetMsg = document.getElementById("resetMsg");

onAuthStateChanged(auth, (user) => {
  if (user) {
    accountView.style.display = "block";
    loggedOutView.style.display = "none";
    userEmail.textContent = user.email;
  } else {
    accountView.style.display = "none";
    loggedOutView.style.display = "block";
  }
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

document.getElementById("resetPasswordBtn").addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;
  try {
    await sendPasswordResetEmail(auth, user.email);
    resetMsg.textContent = "Password reset email sent! Check your inbox.";
  } catch (err) {
    resetMsg.textContent = err.message;
    resetMsg.style.color = "red";
  }
}); 