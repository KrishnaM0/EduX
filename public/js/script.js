document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".angle-down"); 
    const lectureDivs = document.querySelectorAll(".lecture");
    const notesButtons = document.querySelectorAll("#notes-btn"); 
    const notesDivs = document.querySelectorAll(".notes");
    const downloadPdfButtons = document.querySelectorAll(".download-pdf-btn");
    const notesTextareas = document.querySelectorAll(".notedown");
    const navLinks = document.querySelectorAll('.nav-link');
    const loginLink = document.querySelector('.fa-user');
    const getUser = document.querySelector(".getUser");
    const userAccess = document.querySelector(".userAccess");
    // let signin = document.querySelector(".signin");

    getUser.addEventListener("click", ()=>{
        if(userAccess.style.display === "none"){
            userAccess.style.display = "block";
            
        }
        else{
            userAccess.style.display = "none";
        }
    });
    userAccess.style.display = "none";

    // Set initial state for all lecture and notes divs
    lectureDivs.forEach(div => div.style.display = "none");
    notesDivs.forEach(div => div.style.display = "none");

    // Toggle functionality for each chapter's lecture section
    toggleButtons.forEach((toggleButton, index) => {
        toggleButton.addEventListener("click", function() {
            if (lectureDivs[index].style.display === "none") {
                lectureDivs[index].style.display = "block"; 
                toggleButton.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
                notesDivs.forEach(div => div.style.display = "none"); // Hide all notes
            } else {
                lectureDivs[index].style.display = "none";
                toggleButton.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
                notesDivs[index].style.display = "none";
            }
        });
    });

    // Toggle functionality for each notes section
    notesButtons.forEach((notesButton, index) => {
        notesButton.addEventListener("click", () => {
            notesDivs.forEach(div => div.style.display = "none"); // Hide all notes
            notesDivs[index].style.display = notesDivs[index].style.display === "none" ? "block" : "none";
        });
    });

    // Highlight the active navigation link based on current path
    function updateActiveLink() {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }
    updateActiveLink();

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle login icon color change when clicked
    loginLink.addEventListener('click', function() {
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active'); 
    });

    // Download PDF functionality for each chapter's notes
    downloadPdfButtons.forEach((button, index) => {
        button.addEventListener("click", function() {
            const notesText = notesTextareas[index].value; // Get the notes text for the specific chapter
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.setFontSize(16);
            doc.text(`Notes for Chapter ${index + 1}`, 10, 10); // Title of the PDF
            doc.setFontSize(12);
            doc.text(notesText, 10, 20);  // Notes content

            doc.save(`Chapter_${index + 1}_Notes.pdf`);
        });
    });
});