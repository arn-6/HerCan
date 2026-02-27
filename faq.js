const questions = document.querySelectorAll(".faq-question");

questions.forEach(question => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isOpen = question.classList.toggle("open");
        // close others
        if (isOpen) {
            questions.forEach(q => {
                if (q !== question) {
                    q.classList.remove("open");
                    q.nextElementSibling.style.display = "none";
                }
            });
        }
        answer.style.display = isOpen ? "block" : "none";
    });
});