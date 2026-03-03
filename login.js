import { auth } from "./firebase-config.js";
import { 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

function isValidOrgEmail(email) {
  return email.endsWith("@bfs.or.kr");
}

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!isValidOrgEmail(email)) {
    alert("Must use BFS organization email.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

document.querySelector('.remember-forgot a').addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  if (!email) return alert("Enter your email first.");
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent! Check your inbox.");
  } catch (err) {
    alert(err.message);
  }
});