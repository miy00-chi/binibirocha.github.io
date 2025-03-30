function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function redirectToSignIn() {
    window.location.href = "https://binibirocha.github.io/registration-logIn/signIn.html";
}

document.querySelector('.close-btn').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active'); // Remove the "active" class to hide the sidebar
});

document.addEventListener("DOMContentLoaded", function () {
    const languageButton = document.querySelector(".language-button");
    const languageDropdown = document.querySelector(".language-dropdown");
    const languageOptions = document.querySelectorAll(".language-option");

    languageButton.addEventListener("click", function () {
        languageDropdown.style.display = 
            languageDropdown.style.display === "block" ? "none" : "block";
    });

    languageOptions.forEach(option => {
        option.addEventListener("click", function () {
            languageButton.innerHTML = `🌏︎ ${this.textContent}`; 
            languageDropdown.style.display = "none"; // Close the dropdown after selecting a language
        });
    });

    document.addEventListener("click", function (event) {
        if (!languageButton.contains(event.target) && !languageDropdown.contains(event.target)) {
            languageDropdown.style.display = "none";
        }
    });
});