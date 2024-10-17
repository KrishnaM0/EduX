// const toggleButton = document.querySelector(".angle-down");
// const lectureDiv = document.querySelector(".lecture");
// const notesBtn = document.getElementById("notes-btn");
// const notes = document.querySelector(".notes");

// toggleButton.addEventListener("click", function() {
//      if (lectureDiv.style.display === "none") {
//          lectureDiv.style.display = "block"; 
//          toggleButton.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
//      } else {
//          lectureDiv.style.display = "none";
//          toggleButton.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
//      }
//  });

// lectureDiv.style.display = "none";

// notesBtn.addEventListener("click", ()=>{
//     if(notes.style.display === "none"){
//         notes.style.display = "block";
//     }else{
//         notes.style.display = "none";

//     }
// });
// notes.style.display = "none";


const toggleButtons = document.querySelectorAll(".angle-down"); // Select all toggle buttons
const lectureDivs = document.querySelectorAll(".lecture"); // Select all lecture divs
const notesButtons = document.querySelectorAll("#notes-btn"); // Select all notes buttons
const notesDivs = document.querySelectorAll(".notes"); // Select all notes divs

// Set initial state for all lecture and notes divs
lectureDivs.forEach(div => div.style.display = "none");
notesDivs.forEach(div => div.style.display = "none");

// Add toggle functionality for each chapter
toggleButtons.forEach((toggleButton, index) => {
    toggleButton.addEventListener("click", function() {
        if (lectureDivs[index].style.display === "none") {
            lectureDivs[index].style.display = "block"; 
            toggleButton.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
        } else {
            lectureDivs[index].style.display = "none";
            toggleButton.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
        }
    });
});

// Add toggle functionality for each notes section
notesButtons.forEach((notesButton, index) => {
    notesButton.addEventListener("click", () => {
        if (notesDivs[index].style.display === "none") {
            notesDivs[index].style.display = "block";
        } else {
            notesDivs[index].style.display = "none";
        }
    });
});
