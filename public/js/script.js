document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const loginLink = document.querySelector('.fa-user');
    const getUser = document.querySelector(".getUser");
    const userAccess = document.querySelector(".userAccess");

    getUser.addEventListener("click", ()=>{
        if(userAccess.style.display === "none"){
            userAccess.style.display = "block";
            
        }
        else{
            userAccess.style.display = "none";
        }
    });
    userAccess.style.display = "none";

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
});