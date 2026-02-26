// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBFieiCf5FIzxLzAlh22lN4I-UKzN3RYno",
  authDomain: "bfsguide-815e8.firebaseapp.com",
  projectId: "bfsguide-815e8",
  storageBucket: "bfsguide-815e8.firebasestorage.app",
  messagingSenderId: "996926107842",
  appId: "1:996926107842:web:326c97532a97879fae0b5b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Your toggle function
window.toggleReviewForm = function(courseId) {
  const form = document.getElementById(`review-form-${courseId}`);
  form.classList.toggle("hidden");
};

window.submitReview = async function(courseId) {
  console.log("Submitting review...");

  const email = document.getElementById(`email-${courseId}`).value;
  const grade = document.getElementById(`grade-${courseId}`).value;
  const rating = document.getElementById(`rating-${courseId}`).value;
  const comment = document.getElementById(`comment-${courseId}`).value;

  if (!email || !grade || !rating || !comment) {
    alert("Fill everything");
    return;
  }

  try {
    await addDoc(collection(db, "courses", courseId, "reviews"), {
      email: email,
      grade: grade,
      rating: rating,
      comment: comment,
      created: new Date()
    });

    alert("Review submitted!");
    loadReviews(courseId);
  } catch (error) {
    console.error("Error adding review:", error);
  }
};

window.loadReviews = async function(courseId) {
  const container = document.getElementById(`reviews-${courseId}`);
  container.innerHTML = "";

  const querySnapshot = await getDocs(
    collection(db, "courses", courseId, "reviews")
  );

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();

    container.innerHTML += `
      <div class="review">
        <strong>Anonymous</strong><br>
        Grade ${data.grade}<br>
        ${"★".repeat(data.rating)}<br>
        <p>${data.comment}</p>
      </div>
    `;
  });
};


loadReviews("litcomp");
loadReviews("langcomp");
loadReviews("calcab");
loadReviews("calcbc");
loadReviews("stats");
loadReviews("worldhist");
loadReviews("ushist");
loadReviews("macro");
loadReviews("micro");
loadReviews("psych");
loadReviews("chem");
loadReviews("physics2");
loadReviews("bio");
loadReviews("csa");
loadReviews("csp");
loadReviews("2dart");
loadReviews("drawing");
loadReviews("research");
loadReviews("seminar");
loadReviews("spanish");