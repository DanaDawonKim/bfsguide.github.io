import { db, auth } from "./firebase-config.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Toggle function
window.toggleReviewForm = function(courseId) {
  const form = document.getElementById(`review-form-${courseId}`);
  form.classList.toggle("hidden");
};

window.submitReview = async function(type, itemId) {
  const user = auth.currentUser;
  if (!user) {
    alert("Login required");
    return;
  }

  const comment = document.getElementById(`comment-${itemId}`).value;
  const rating = parseInt(document.getElementById(`rating-${itemId}`).value);

  if (!comment || !rating) {
    alert("Please fill in both a rating and a comment.");
    return;
  }

  await addDoc(
    collection(db, type, itemId, "reviews"),
    {
      userId: user.uid,
      comment: comment,
      rating: rating,
      created: new Date()
    }
  );

  document.getElementById(`comment-${itemId}`).value = "";
  document.getElementById(`rating-${itemId}`).selectedIndex = 0;
  await loadReviews(type, itemId); // ← this was missing
};


window.loadReviews = async function(type, itemId) {
  const container = document.getElementById(`reviews-${itemId}`);
  if (!container) return;

  container.innerHTML = "";

  const querySnapshot = await getDocs(
    collection(db, type, itemId, "reviews")
  );

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const div = document.createElement("div");
    div.className = "review"; 

    div.innerHTML = `
      <strong>Anonymous</strong><br>
      ${"★".repeat(data.rating)}<br>
      <p>${data.comment}</p>
    `;

    if (auth.currentUser?.uid === data.userId) {
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";

      delBtn.onclick = async () => {
        await deleteDoc(doc(db, type, itemId, "reviews", docSnap.id));
        window.loadReviews(type, itemId);
      };

      div.appendChild(delBtn);
    }

    container.appendChild(div);
  });
};

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

document.addEventListener("DOMContentLoaded", () => {

  // courses
  loadReviews("courses","cshs");
  loadReviews("courses","litcomp");
  loadReviews("courses","langcomp");
  loadReviews("courses","calcab");
  loadReviews("courses","calcbc");
  loadReviews("courses","stats");
  loadReviews("courses","worldhist");
  loadReviews("courses","ushist");
  loadReviews("courses","macro");
  loadReviews("courses","micro");
  loadReviews("courses","psych");
  loadReviews("courses","chem");
  loadReviews("courses","physics2");
  loadReviews("courses","bio");
  loadReviews("courses","csa");
  loadReviews("courses","csp");
  loadReviews("courses","2dart");
  loadReviews("courses","drawing");
  loadReviews("courses","research");
  loadReviews("courses","seminar");
  loadReviews("courses","spanish");

  // clubs
  loadReviews("ecs","nhs");
  loadReviews("ecs","cshs");
  loadReviews("ecs","stuco");
  loadReviews("ecs","forgirls");
  loadReviews("ecs","service");
  loadReviews("ecs","gam");
  loadReviews("ecs","robotics");
  loadReviews("ecs","hackclub");
  loadReviews("ecs","yearbook");
  loadReviews("ecs","artclub");
  loadReviews("ecs","saa");
  loadReviews("ecs","seed");
  loadReviews("ecs","wave");
  loadReviews("ecs","mun");
  loadReviews("ecs","mathup");
  loadReviews("ecs","unity");
  loadReviews("ecs","dance");
  loadReviews("ecs","yes");

  // sports
  loadReviews("ecs","volley");
  loadReviews("ecs","basket");
  loadReviews("ecs","soccer");
  loadReviews("ecs","badminton");

});