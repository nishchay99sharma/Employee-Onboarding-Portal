// Sample users for testing (if no users exist in local storage)
const sampleUsers = [
  { id: "employee123", password: "password123" },
  { id: "john_doe", password: "doepassword" },
];

// Store sample users in local storage if not already stored
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(sampleUsers));
}

// Handle login form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const userID = document.getElementById("userID").value;
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users"));

    // Log for debugging
    console.log("Users in localStorage:", users);
    console.log("Attempting to log in with ID:", userID);

    // Check if user exists with matching credentials
    const user = users.find((u) => u.id === userID && u.password === password);

    if (user) {
      console.log("Login successful for user:", user);
      localStorage.setItem("currentUser", JSON.stringify(user)); // Save current user session
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
      console.log("Invalid login attempt");
      const loginMessage = document.getElementById("loginMessage");
      loginMessage.textContent = "Invalid ID or Password!";
      loginMessage.style.display = "block"; // Show error message
    }
  });
