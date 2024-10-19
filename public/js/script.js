
const toggleButtons = document.querySelectorAll(".angle-down"); 
const lectureDivs = document.querySelectorAll(".lecture");
const notesButtons = document.querySelectorAll("#notes-btn"); 
const notesDivs = document.querySelectorAll(".notes");

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

const navLinks = document.querySelectorAll('.nav-link');

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