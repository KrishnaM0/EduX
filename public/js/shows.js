const notesTextarea = document.querySelectorAll(".chapter-notes");
const downloadPdfButton = document.querySelectorAll(".download-pdf-btns");
const chaptersSelected = document.querySelectorAll(".shows-chapters-name");

chaptersSelected.forEach(chapters => {
    chapters.addEventListener('click', function() {
        chaptersSelected.forEach(chapters => chapters.classList.remove('active-chapter'));
        this.classList.add('active-chapter');
    });
});

function showChapterDetails(index) {
    // Hide all chapter details
    const overview = document.querySelector('.overview');
    const allDetails = document.querySelectorAll('.chapter-detail');
    allDetails.forEach(detail => detail.style.display = 'none');

    // Show the clicked chapter's details
    const chapterToShow = document.getElementById(`chapterDetail${index}`);
    if (chapterToShow) {
        chapterToShow.style.display = 'block';
        overview.style.display = 'none';
    }
}

function showOverview() {
    // Hide all chapter details
    const allDetails = document.querySelectorAll('.chapter-detail');
    allDetails.forEach(detail => detail.style.display = 'none');

    // Show only the overview
    const overview = document.querySelector('.overview');
    if (overview) {
        overview.style.display = 'block';
    }
}


downloadPdfButton.forEach((button, index) => {
    button.addEventListener("click", function() {
        const notesText = notesTextarea[index].value; // Get the notes text for the specific chapter
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text(`Notes for Chapter ${index + 1}`, 10, 10); // Title of the PDF
        doc.setFontSize(12);
        doc.text(notesText, 10, 20);  // Notes content

        doc.save(`Chapter_${index + 1}_Notes.pdf`);
    });
});