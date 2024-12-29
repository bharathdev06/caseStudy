// Function to retrieve booking data from local storage
function getBookingData(bookingID) {
    const bookingData = JSON.parse(localStorage.getItem('bookingHistory'));
    return bookingData ? bookingData.find(item => item.bookingId === bookingID) : null;
}

// Function to display booking details in the form
function displayBookingDetails(booking) {
    if (booking) {
        document.getElementById('bookingId').textContent = booking.bookingId;
        document.getElementById('senderName').textContent = booking.receiverName;
        document.getElementById('pickupDatetime').value = booking.bookingDate;
        // Populate other fields as needed
    } else {
        alert('Booking not found!');
    }
}

// Function to update booking data in local storage
function updateBookingData(bookingID, bookingDate) {
    const bookingData = JSON.parse(localStorage.getItem('bookingHistory'));
    const bookingIndex = bookingData.findIndex(item => item.bookingId === bookingID);
    if (bookingIndex !== -1) {
        // Update the pickup time
        bookingData[bookingIndex].bookingDate = bookingDate;
        localStorage.setItem('bookingHistory', JSON.stringify(bookingData));
        document.getElementById('message').style.display = 'block'; // Show success message
    } else {
        alert('Booking not found for update!');
    }
}

// Event listener for the search button
document.querySelector('#search-button').addEventListener('click', function() {
    const bookingID = document.getElementById('booking-id').value.trim();
    console.log(bookingID);
    const booking = getBookingData(bookingID);
    
    displayBookingDetails(booking);
});

// Event listener for the pickup form submission
document.querySelector('.btn-success').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission
    const bookingID = document.getElementById('bookingId').textContent;
    const bookingDate = document.getElementById('pickupDatetime').value;
    if (bookingDate) {
        updateBookingData(bookingID, bookingDate);
    } else {
        alert('Please select a pickup date and time.');
    }
});

// Function to set minimum date to current date/time
function setMinPickupDate() {
    // Get current date and time
    const now = new Date();
    
    // Format date for datetime-local input (YYYY-MM-DDTHH:MM)
    const formattedDateTime = now.toISOString().slice(0,10);
    console.log(formattedDateTime);
    
    // Set min attribute to prevent selecting past dates
    document.getElementById('pickupDatetime').min = formattedDateTime;
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    setMinPickupDate();
});