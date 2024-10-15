// Sample tasks for onboarding
const defaultTasks = [
  { id: 1, text: "Complete Company Overview", completed: false },
  { id: 2, text: "Review Policies & Guidelines", completed: false },
  { id: 3, text: "Attend Mandatory Training", completed: false },
];

// Store default tasks in local storage if not already stored
if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify(defaultTasks));
}

// Load tasks from local storage
function loadTasks() {
  const taskList = document.getElementById("taskList");
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  taskList.innerHTML = ""; // Clear the task list

  savedTasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    taskItem.textContent = task.text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

    taskItem.appendChild(checkbox);
    taskList.appendChild(taskItem);
  });

  updateProgress(); // Update progress after loading tasks
}

// Toggle task completion and update local storage
function toggleTaskCompletion(taskId) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  const task = savedTasks.find((t) => t.id === taskId);
  task.completed = !task.completed;
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
  loadTasks(); // Reload tasks to reflect changes
}

// Update the progress bar and summary
function updateProgress() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  const totalTasks = savedTasks.length;
  const completedTasks = savedTasks.filter((task) => task.completed).length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = `${progressPercentage}%`;
  progressBar.setAttribute("aria-valuenow", progressPercentage);
  progressBar.textContent = `${Math.round(progressPercentage)}%`;

  // Update progress summary
  const progressSummary = document.getElementById("progressSummary");
  progressSummary.textContent = `${completedTasks} out of ${totalTasks} tasks completed`;
}

// Reset tasks and update local storage
document.getElementById("resetTasksBtn").addEventListener("click", () => {
  localStorage.setItem("tasks", JSON.stringify(defaultTasks)); // Reset tasks to default state
  loadTasks(); // Reload tasks
});

// Display user's name
const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Get current user
if (currentUser) {
  document.getElementById(
    "userName"
  ).textContent = `Welcome, ${currentUser.id}`;
} else {
  window.location.href = "index.html"; // Redirect to login if no user
}

// Logout function
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentUser"); // Clear user session
  window.location.href = "index.html"; // Redirect to login
});

// Load tasks on page load
loadTasks();

// Function to add a new task
document.getElementById("addTaskBtn").addEventListener("click", () => {
  const newTaskInput = document.getElementById("newTaskInput");
  const newTaskText = newTaskInput.value.trim();

  if (newTaskText) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const newTask = {
      id: savedTasks.length + 1, // Incremental ID based on existing tasks
      text: newTaskText,
      completed: false,
    };

    // Add new task to the tasks array and save it
    savedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    loadTasks(); // Reload tasks to reflect changes
    newTaskInput.value = ""; // Clear input field
  } else {
    alert("Please enter a task."); // Alert if input is empty
  }
});

// Sidebar Toggle Functionality
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");

// Toggle sidebar on hamburger button click
sidebarToggle.addEventListener("click", function (event) {
  event.stopPropagation(); // Prevent immediate close
  sidebar.classList.toggle("open"); // Toggle the open class
});

// Close sidebar if clicking outside it or the toggle button
document.addEventListener("click", function (event) {
  if (
    sidebar.classList.contains("open") &&
    !sidebar.contains(event.target) &&
    event.target !== sidebarToggle
  ) {
    sidebar.classList.remove("open");
  }
});

// Sample notifications for demonstration
const notifications = [
  {
    id: 1,
    text: "Your profile has been updated successfully.",
    timestamp: "2024-10-13 10:00",
  },
  {
    id: 2,
    text: "You have a new message from HR.",
    timestamp: "2024-10-12 14:30",
  },
  {
    id: 3,
    text: "New training session scheduled for next week.",
    timestamp: "2024-10-11 09:00",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  // Load notifications
  loadNotifications();

  // Initialize resource library search and filters
  initializeResourceLibrary();
});

// Function to load notifications
function loadNotifications() {
  const notificationList = document.getElementById("notificationList");
  const notificationBadge = document.getElementById("notificationBadge");
  notificationList.innerHTML = ""; // Clear the notification list

  // Populate notifications
  notifications.forEach((notification) => {
    const notificationItem = document.createElement("li");
    notificationItem.className = "dropdown-item notification-item";
    notificationItem.innerHTML = `
      <span class="notification-text">${notification.text}</span>
      <small class="text-muted d-block">${notification.timestamp}</small>
    `;
    notificationList.appendChild(notificationItem);
  });

  // Update the notification badge with the count
  notificationBadge.textContent = notifications.length;
}

// Load notifications on page load
document.addEventListener("DOMContentLoaded", loadNotifications);


// Variables for Checklist and Progress Tracker
const checklistItems = document.querySelectorAll(".checklist-item");
const progressTrackerBar = document.getElementById("progressTrackerBar");
const progressTrackerSummary = document.getElementById(
  "progressTrackerSummary"
);
const resetChecklistBtn = document.getElementById("resetChecklistBtn");

// Function to update the progress tracker
function updateTrackerProgress() {
  const totalChecklistItems = checklistItems.length;
  const completedItems = Array.from(checklistItems).filter(
    (item) => item.checked
  ).length;
  const progressPercentage = (completedItems / totalChecklistItems) * 100;

  // Update the progress bar width and text
  progressTrackerBar.style.width = `${progressPercentage}%`;
  progressTrackerBar.setAttribute("aria-valuenow", progressPercentage);
  progressTrackerBar.textContent = `${Math.round(progressPercentage)}%`;

  // Update the progress summary
  progressTrackerSummary.textContent = `${completedItems} out of ${totalChecklistItems} tasks completed`;
}

// Add event listeners to each checklist item to update progress when checked
checklistItems.forEach((item) => {
  item.addEventListener("change", updateTrackerProgress);
});

// Reset checklist and progress tracker
resetChecklistBtn.addEventListener("click", () => {
  checklistItems.forEach((item) => (item.checked = false));
  updateTrackerProgress(); // Reset progress after unchecking all items
});

// Initialize progress tracker on page load
updateTrackerProgress();

// Search functionality for resource library
function initializeResourceLibrary() {
  const resourceSearch = document.getElementById("resourceSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const resourceItems = document.querySelectorAll(".resource-item");

  // Search functionality
  resourceSearch.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    resourceItems.forEach((item) => {
      const title = item.querySelector(".card-title").textContent.toLowerCase();
      item.style.display = title.includes(query) ? "block" : "none";
    });
  });

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      resourceItems.forEach((item) => {
        const itemType = item.getAttribute("data-type");
        item.style.display = filter === "all" || filter === itemType ? "block" : "none";
      });
    });
  });
}

// Handle feedback form submission
document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    const feedbackInput = document.getElementById("feedbackInput").value;
    const ratingSelect = document.getElementById("ratingSelect").value;

    if (feedbackInput && ratingSelect) {
      // Process the feedback (e.g., send it to a server or log it)
      console.log("Feedback submitted:", feedbackInput);
      console.log("Rating:", ratingSelect);

      // Clear the form
      document.getElementById("feedbackInput").value = "";
      document.getElementById("ratingSelect").value = "";

      // Optionally, display a success message
      alert("Thank you for your feedback!");
    } else {
      alert("Please fill out all fields before submitting.");
    }
  });

// Handle finish button click
document.getElementById("finishButton").addEventListener("click", function () {
  // Logic to handle finishing the onboarding process
  alert("Onboarding process completed! Welcome aboard!");
  // You may redirect or update the UI accordingly
});