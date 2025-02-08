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
  })
  .catch(error => console.error('Error:', error));

// Image preview function
function previewImageUrl(url) {
  const preview = document.getElementById('imagePreview');
  const uploadText = document.getElementById('uploadText');
  
  if (url && url.trim() !== '') {
      // Create a temporary image to test if the URL is valid
      const tempImage = new Image();
      tempImage.onload = function() {
          preview.src = url;
          preview.style.display = 'block';
          uploadText.style.display = 'none';
      };
      tempImage.onerror = function() {
          preview.style.display = 'none';
          uploadText.style.display = 'block';
          alert('Invalid image URL or image not accessible. Please check the URL and try again.');
      };
      tempImage.src = url;
  } else {
      preview.style.display = 'none';
      uploadText.style.display = 'block';
  }
}

// Form validation and submission
document.getElementById('eventForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Basic form validation
  const title = document.getElementById('eventTitle').value;
  const description = document.getElementById('eventDescription').value;
  const date = document.getElementById('eventDate').value;
  const time = document.getElementById('eventTime').value;
  const location = document.getElementById('eventLocation').value;
  const category = document.getElementById('eventCategory').value;
  const imageUrl = document.getElementById('imageUrl').value;
  
  if (!title || !description || !date || !time || !location || !category || !imageUrl) {
      alert('Please fill in all required fields');
      return;
  }
  
  // Submit the form
  this.submit();
});

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('eventDate').min = today;