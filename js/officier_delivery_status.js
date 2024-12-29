// updateBookingStatus.js

document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector("button.btn-success");
    const updateButton = document.querySelector("button.btn-primary");
    const bookingIdInput = document.querySelector("#booking-id");
    const packageDetailsDiv = document.querySelector("#package-details");
    const statusSelect = document.querySelector("#status");
  
    let bookingData = JSON.parse(localStorage.getItem("bookingHistory"));

  
    // Function to display package details
    function displayPackageDetails(booking) {
      packageDetailsDiv.innerHTML = `
        <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
        <p><strong>Receiver Name:</strong> ${booking.receiverName}</p>
        <p><strong>Current Status:</strong> ${booking.status}</p>   
      `;
    }
  
    // Search for Booking ID
    searchButton.addEventListener("click", function () {
      const bookingId = bookingIdInput.value.trim();
  
      if (!bookingId) {
        alert("Please enter a Booking ID.");
        return;
      }
      console.log(bookingId);
      const booking = bookingData.find((item) => item.bookingId === bookingId);
  
      if (booking) {
        displayPackageDetails(booking);
      } else {
        packageDetailsDiv.innerHTML = `<p class='text-danger'>No package found with Booking ID: ${bookingId}</p>`;
      }
    });
  
    // Update Booking Status
    updateButton.addEventListener("click", function () {
      const bookingId = bookingIdInput.value.trim();
      const newStatus = statusSelect.value;
  
      if (!bookingId) {
        alert("Please search for a Booking ID first.");
        return;
      }
  
      if (!newStatus) {
        alert("Please select a status to update.");
        return;
      }
  
      const bookingIndex = bookingData.findIndex((item) => item.bookingId === bookingId);
  
      if (bookingIndex !== -1) {
        bookingData[bookingIndex].status = newStatus;
        localStorage.setItem("bookingHistory", JSON.stringify(bookingData));
        console.log(bookingIndex);
        
        displayPackageDetails(bookingData[bookingIndex]);
  
        alert("Status updated successfully.");
      } else {
        alert("No package found to update.");
      }
    });
  });
  