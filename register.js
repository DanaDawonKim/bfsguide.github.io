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

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  errorMsg.textContent = "";

  if (!isValidOrgEmail(email)) {
    errorMsg.textContent = "Must use BFS organization email.";
    return;
  }

  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "index.html";
  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("ERROR CODE:", error.code);
    console.log("ERROR MESSAGE:", error.message);
    errorMsg.textContent = error.message;
}
});


// Google Sign Up
const googleBtn = document.getElementById("googleSignIn");
const provider = new GoogleAuthProvider();

googleBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "index.html";
  } catch (error) {
    errorMsg.textContent = error.message;
  }
});