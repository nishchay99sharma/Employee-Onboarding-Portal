// Handle registration form submission
document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const newUserID = document.getElementById("newUserID").value;
    const newPassword = document.getElementById("newPassword").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user ID already exists
    const userExists = users.some((u) => u.id === newUserID);

    if (userExists) {
      alert("User ID already exists. Please choose a different ID.");
    } else {
      // Add the new user and save to local storage
      users.push({ id: newUserID, password: newPassword });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful! You can now log in.");
      window.location.href = "index.html"; // Redirect to login page
    }
  });
