// Function to load activities into the DOM
async function loadActivities() {
  const activitiesList = document.getElementById("activities-list");
  activitiesList.innerHTML = ""; // Clear existing content

  try {
    const response = await fetch("/activities");
    const activities = await response.json();

    Object.entries(activities).forEach(([name, details]) => {
      const activityCard = document.createElement("div");
      activityCard.classList.add("activity-card");

      activityCard.innerHTML = `
        <h4>${name}</h4>
        <p>${details.description}</p>
        <p><strong>Schedule:</strong> ${details.schedule}</p>
        <h5>Participants:</h5>
        <ul class="participants-list">
          ${details.participants.map(participant => `<li>${participant}</li>`).join("")}
        </ul>
      `;

      activitiesList.appendChild(activityCard);
    });
  } catch (error) {
    console.error("Failed to load activities:", error);
    activitiesList.innerHTML = "<p>Failed to load activities. Please try again later.</p>";
  }
}

// Call the function to load activities on page load
document.addEventListener("DOMContentLoaded", loadActivities);
