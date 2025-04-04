// Function to toggle sidebar menu
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Function to close sidebar when clicking the close button
document.querySelector('.close-btn').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active'); 
});

// Function to redirect to login page
function redirectToSignIn() {
    window.location.href = "https://binibirocha.github.io/registration-logIn/logIn.html";
}

// Function to preview and save uploaded profile image
function previewImage(event) {
    console.log("File selected");
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function() {
        const imageData = reader.result; 
        localStorage.setItem('profilePicture', imageData); // Save image to local storage
        document.querySelector('.profile-pic').src = imageData; // Update profile picture
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        console.log("No file selected");
    }
}

// Function to load saved profile picture on page load
function loadProfilePicture() {
    const savedImage = localStorage.getItem('profilePicture');
    if (savedImage) {
        document.querySelector('.profile-pic').src = savedImage;
    }
}

// Functionality for the language dropdown
document.addEventListener("DOMContentLoaded", function () {
    loadProfilePicture(); // Load the saved profile picture when the page loads

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
            languageDropdown.style.display = "none"; 
        });
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!languageButton.contains(event.target) && !languageDropdown.contains(event.target)) {
            languageDropdown.style.display = "none";
        }
    });

    // Attach event listener to "Change Avatar" button
    document.getElementById('changeAvatarBtn').addEventListener('click', function() {
        document.getElementById('avatarInput').click(); // Trigger the file input when button is clicked
    });

    // Attach event listener to file input
    document.getElementById('avatarInput').addEventListener('change', previewImage);

    // Account Deletion Modal Logic
    document.getElementById('delete-account-btn').addEventListener('click', function() {
        // Show the delete confirmation modal
        document.getElementById('deleteModal').style.display = 'flex';
    });

    document.getElementById('cancelDeleteBtn').addEventListener('click', function() {
        // Hide the modal when cancel is clicked
        document.getElementById('deleteModal').style.display = 'none';
    });

    document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
        // Handle the deletion logic here (e.g., confirm and delete account)
        alert('Account Deleted');
        document.getElementById('deleteModal').style.display = 'none';
    });

    // Change Password Functionality
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const changePasswordModal = document.getElementById('changePasswordModal');
    const cancelChangePasswordBtn = document.getElementById('cancelChangePasswordBtn');
    const savePasswordBtn = document.getElementById('savePasswordBtn');

    // Open the modal when the "Change Password" button is clicked
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function () {
            changePasswordModal.style.display = 'block';
        });
    }

    // Close the modal when the "Cancel" button is clicked
    if (cancelChangePasswordBtn) {
        cancelChangePasswordBtn.addEventListener('click', function () {
            changePasswordModal.style.display = 'none';
        });
    }

    // Save new password when "Change Password" button in modal is clicked
    if (savePasswordBtn) {
        savePasswordBtn.addEventListener('click', function () {
            const currentPassword = document.getElementById('current-password').value.trim();
            const newPassword = document.getElementById('new-password').value.trim();
            const confirmPassword = document.getElementById('confirm-new-password').value.trim();

            // Simple validation checks
            if (newPassword.length < 6) {
                alert("❌ Password must be at least 6 characters.");
                return;
            }

            if (newPassword !== confirmPassword) {
                alert("❌ Passwords do not match!");
                return;
            }

            // Assuming user is logged in and their info is stored in local storage
            let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            let users = JSON.parse(localStorage.getItem('users')) || [];

            if (loggedInUser) {
                // Check if the current password matches
                if (loggedInUser.password !== currentPassword) {
                    alert("❌ Current password is incorrect!");
                    return;
                }

                // Update the user's password
                let userIndex = users.findIndex(user => user.email === loggedInUser.email);
                if (userIndex !== -1) {
                    users[userIndex].password = newPassword;
                    localStorage.setItem('users', JSON.stringify(users));

                    // Update logged-in user info
                    loggedInUser.password = newPassword;
                    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

                    alert("✅ Password updated successfully!");
                    changePasswordModal.style.display = 'none';
                }
            }
        });
    }

    // Optional: Close the modal if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === changePasswordModal) {
            changePasswordModal.style.display = 'none';
        }
    });
});
