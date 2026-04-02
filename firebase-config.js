// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZ8B63RWVF_DZbthfyqKW8D0x8xbXufpk",
  authDomain: "bfsguide-815e8.firebaseapp.com",
  projectId: "bfsguide-815e8",
  storageBucket: "bfsguide-815e8.firebasestorage.app",
  messagingSenderId: "996926107842",
  appId: "1:996926107842:web:326c97532a97879fae0b5b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);


