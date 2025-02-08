// Check session and redirect if not logged in
fetch('../php/check_session.php')
    .then(response => response.json())
    .then(data => {
        if (!data.loggedIn) {
            window.location.href = '../login.html';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        window.location.href = '../login.html';
    });

// Load user information
fetch('../php/get_current_user.php')
    .then(response => response.json())
    .then(data => {
        const name = data.name || 'User';
        document.getElementById('userName').textContent = name;
        document.getElementById('userEmail').textContent = data.email || '';
        document.getElementById('welcomeName').textContent = name;
    })
    .catch(error => console.error('Error:', error));

// Load events
function loadEvents() {
    fetch('../php/get_events.php')
        .then(response => response.json())
        .then(events => {
            const eventsList = document.getElementById('eventsList');
            
            // Update statistics
            document.getElementById('totalEvents').textContent = events.length;
            const upcomingEvents = events.filter(event => new Date(event.date + ' ' + event.time) > new Date()).length;
            document.getElementById('upcomingEvents').textContent = upcomingEvents;
            
            // Clear existing events
            eventsList.innerHTML = '';
            
            // Display events
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
                events.forEach(event => {
                    const eventDate = new Date(event.date + ' ' + event.time);
                    const isUpcoming = eventDate > new Date();
                    const formattedDate = eventDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    
                    const formattedTime = event.time ? event.time.substring(0, 5) : ''; // Format time as HH:MM
                    
                    const eventCard = `
                        <div class="col-md-4 mb-4">
                            <div class="card event-card">
                                <img src="${event.image_url}" class="card-img-top" alt="${event.title}" 
                                    onerror="this.src='https://via.placeholder.com/400x200?text=Event+Image'">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <h5 class="card-title mb-0">${event.title}</h5>
                                        <span class="badge ${isUpcoming ? 'bg-success' : 'bg-secondary'}">
                                            ${isUpcoming ? 'Upcoming' : 'Past'}
                                        </span>
                                    </div>
                                    <p class="card-text text-muted">${event.description}</p>
                                    <div class="mb-3">
                                        <div class="d-flex align-items-center mb-2">
                                            <i class="fas fa-calendar me-2 text-primary"></i>
                                            <span>${formattedDate}</span>
                                        </div>
                                        ${formattedTime ? `
                                        <div class="d-flex align-items-center mb-2">
                                            <i class="fas fa-clock me-2 text-primary"></i>
                                            <span>${formattedTime}</span>
                                        </div>
                                        ` : ''}
                                        <div class="d-flex align-items-center">
                                            <i class="fas fa-map-marker-alt me-2 text-primary"></i>
                                            <span>${event.location}</span>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="badge bg-primary">${event.category}</span>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    eventsList.insertAdjacentHTML('beforeend', eventCard);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const eventsList = document.getElementById('eventsList');
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

// Initial load
loadEvents();