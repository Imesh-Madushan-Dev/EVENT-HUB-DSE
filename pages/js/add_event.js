// Check session and redirect if not logged in
fetch('../php/check_session.php')
  .then(response => response.json())
  .then(data => {
      if (!data.loggedIn) {
          // Redirect to login page if user is not logged in
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
      // Display user name and email
      document.getElementById('userName').textContent = data.name || 'User';
      document.getElementById('userEmail').textContent = data.email || '';
  })
  .catch(error => console.error('Error:', error));

// Function to preview image from URL
function previewImageUrl(url) {
  const preview = document.getElementById('imagePreview');
  const uploadText = document.getElementById('uploadText');
  
  if (url && url.trim() !== '') {
      const tempImage = new Image();
      
      tempImage.onload = function() {
          // Show the image if URL is valid
          preview.src = url;
          preview.style.display = 'block';
          uploadText.style.display = 'none';
      };
      
      tempImage.onerror = function() {
          // Hide the image and show error message if URL is invalid
          preview.style.display = 'none';
          uploadText.style.display = 'block';
          alert('Invalid image URL. Please check and try again.');
      };
      
      tempImage.src = url;
  } else {
      preview.style.display = 'none';
      uploadText.style.display = 'block';
  }
}

// Form validation and submission
const eventForm = document.getElementById('eventForm');
eventForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const title = document.getElementById('eventTitle').value;
  const description = document.getElementById('eventDescription').value;
  const date = document.getElementById('eventDate').value;
  const time = document.getElementById('eventTime').value;
  const location = document.getElementById('eventLocation').value;
  const category = document.getElementById('eventCategory').value;
  const imageUrl = document.getElementById('imageUrl').value;
  
  // Check if all fields are filled
  if (!title || !description || !date || !time || !location || !category || !imageUrl) {
      alert('Please fill in all required fields');
      return;
  }
  
  // Submit the form
  eventForm.submit();
});

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('eventDate').min = today;