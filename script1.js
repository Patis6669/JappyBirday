document.addEventListener("DOMContentLoaded", function () {
    const floatingButton = document.getElementById("floatingButton");
    const paragraphs = document.querySelectorAll(".paragraph");
    let currentIndex = 1;

    floatingButton.addEventListener("click", function () {
        if (currentIndex < paragraphs.length) {
            paragraphs[currentIndex].classList.add("visible");
            currentIndex++;

            if (currentIndex === paragraphs.length) {
                floatingButton.innerHTML = "<i class='fas fa-check'></i> Todo leído";
                floatingButton.disabled = true;
                floatingButton.style.background = "#666";
                floatingButton.style.cursor = "not-allowed";
            }
        }
    });

    const backButton = document.getElementById("backButton");

    backButton.addEventListener("click", function () {
        // Redirige a la página anterior si hay historial
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Redirige a una página predeterminada si no hay historial
            window.location.href = "index.html";
        }
    });
});
