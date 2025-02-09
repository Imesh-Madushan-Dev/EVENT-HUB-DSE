// Check if the user is logged in
fetch("../php/check_session.php")
  .then((response) => response.json()) // Convert the response to JSON
  .then((data) => {
    // If the user is not logged in, redirect them to the login page
    if (!data.loggedIn) {
      window.location.href = "../login.html"; // Redirect to login page
    }
  })
  .catch((error) => {
    // If there is an error, show it in the console and redirect to login page
    console.error("Error:", error);
    window.location.href = "../login.html"; // Redirect to login page if there's an error
  });

// Load the current user's information (name and email)
fetch("../php/get_current_user.php")
  .then((response) => response.json()) // Convert the response to JSON
  .then((data) => {
    const name = data.name || "User"; // Use 'User' as default if no name is found
    // Set the name and email on the page (elements must exist in HTML)
    document.getElementById("userName").textContent = name;
    document.getElementById("userEmail").textContent = data.email || "";
    document.getElementById("welcomeName").textContent = name;
  })
  .catch((error) => console.error("Error:", error)); // Log any errors in the console

// Function to load events and display them
function loadEvents() {
  // Fetch the events from the server
  fetch("../php/get_events.php")
    .then((response) => response.json()) // Convert the response to JSON
    .then((events) => {
      const eventsList = document.getElementById("eventsList"); // Get the events container from the page

      // Update statistics on the page
      document.getElementById("totalEvents").textContent = events.length; // Show total number of events
      // Filter events to count the upcoming ones based on date
      const upcomingEvents = events.filter(
        (event) => new Date(event.date + " " + event.time) > new Date()
      ).length;
      document.getElementById("upcomingEvents").textContent = upcomingEvents; // Show the count of upcoming events

      // Clear the events container first
      eventsList.innerHTML = "";

      // If there are no events, show a message
      if (events.length === 0) {
        eventsList.innerHTML = `
                    <div class="col-12">
                        <div class="alert alert-info d-flex align-items-center">
                            <i class="fas fa-info-circle me-3 fa-2x"></i>
                            <div>
                                <h5 class="mb-1">No Events Found</h5>
                                <p class="mb-0">You haven't created any events yet. 
                                <a href="add_Event.html" class="alert-link">Create your first event!</a></p>
                            </div>
                        </div>
                    </div>
                `;
      } else {
        // Loop through each event and create HTML to display it
        events.forEach((event) => {
          const eventDate = new Date(event.date + " " + event.time); // Create a Date object for the event date
          const isUpcoming = eventDate > new Date(); // Check if the event is upcoming
          const formattedDate = eventDate.toLocaleDateString("en-US", {
            // Format the date to display in a nice format
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          const formattedTime = event.time ? event.time.substring(0, 5) : ""; // Format time as HH:MM (if available)

          // Create a card to display event details
          const eventCard = `
                        <div class="col-md-4 mb-4">
                            <div class="card event-card">
                                <img src="${
                                  event.image_url
                                }" class="card-img-top" alt="${event.title}" 
                                    onerror="this.src='https://via.placeholder.com/400x200?text=Event+Image'"> <!-- Default image on error -->
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <h5 class="card-title mb-0">${
                                          event.title
                                        }</h5>
                                        <span class="badge ${
                                          isUpcoming
                                            ? "bg-success"
                                            : "bg-secondary"
                                        }">
                                            ${isUpcoming ? "Upcoming" : "Past"}
                                        </span>
                                    </div>
                                    <p class="card-text text-muted">${
                                      event.description
                                    }</p>
                                    <div class="mb-3">
                                        <div class="d-flex align-items-center mb-2">
                                            <i class="fas fa-calendar me-2 text-primary"></i>
                                            <span>${formattedDate}</span>
                                        </div>
                                        ${
                                          formattedTime
                                            ? `
                                        <div class="d-flex align-items-center mb-2">
                                            <i class="fas fa-clock me-2 text-primary"></i>
                                            <span>${formattedTime}</span>
                                        </div>
                                        `
                                            : ""
                                        }
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-map-marker-alt me-2 text-primary"></i>
                                            <span>${event.location}</span>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="badge bg-primary">${
                                          event.category
                                        }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
          // Add the event card to the list of events
          eventsList.insertAdjacentHTML("beforeend", eventCard);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      const eventsList = document.getElementById("eventsList");
      // If there is an error fetching events, show a message
      eventsList.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle me-2"></i>
                        Failed to load events. Please try again later.
                    </div>
                </div>
            `;
    });
}

// Call the loadEvents function when the page loads to display events
loadEvents();
