// Bind the analysis function to your UI button and file input
// 🔥 ONE-TIME DATABASE CLEAR STATEMENT (Run once, then remove)
import { getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
    
async function clearAllRecords() {
    const querySnapshot = await getDocs(collection(db, "hazards"));
    querySnapshot.forEach(async (documentSnapshot) => {
        await deleteDoc(doc(db, "hazards", documentSnapshot.id));
    });
    console.log("All previous Firestore records cleared successfully!");
}
clearAllRecords();
document.addEventListener("DOMContentLoaded", () => {
  // "Analyze via YOLOv8" button aur file input ko select karein
  const analyzeBtn = document.querySelector("#analyzeBtn") || document.querySelector("button"); 
  const fileInput = document.querySelector("input[type='file']");

  if (analyzeBtn && fileInput) {
      analyzeBtn.addEventListener("click", async () => {
          const file = fileInput.files[0];
          if (!file) {
              alert("Please choose an image file first.");
              return;
          }

          // Function ko call karein jo humne banaya hai
          const result = await analyzeRoadImage(file);
          
          if (result && result.is_defect) {
              console.info("Valid defect found, proceeding to save...");
              // Yahan aap apna Firestore save logic call kar sakte hain
              alert("Defect identified successfully!");
          }
      });
  }
});
