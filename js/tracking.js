document.getElementById("trackingForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Prevent the form from submitting

    const bookingId = document.getElementById("booking-id").value.trim();
    console.log("Booking ID entered:", bookingId);  // Debugging line

    // Validate Booking ID format (3 letters followed by 9 digits)
    const isValidBookingId = /^[A-Za-z]{3}\d{9}$/.test(bookingId);
    if (!isValidBookingId) {
        alert("Please enter a valid Booking ID. It should be 3 letters followed by 9 digits.");
        return;
    }

    // Retrieve booking data from localStorage
    const bookingData = JSON.parse(localStorage.getItem("bookingFormData"));
    const data=JSON.parse(localStorage.getItem("customerData"))
    console.log("Booking data retrieved:", bookingData);  // Debugging line

    // Check if bookingData exists and if the bookingId is found within it
    if (bookingData ) {

        // Display the tracking information
        const trackingStatusElement = document.getElementById("tracking-status");
        trackingStatusElement.style.display = "block";
        trackingStatusElement.innerHTML = `
            <fieldset>
                <legend>Tracking Status</legend>
                <p><strong>Booking ID:</strong> ${bookingId}</p>
                <p><strong>Sender Name:</strong> ${data.customerName}</p>
                <p><strong>Receiver Name:</strong> ${bookingData.receiverName}</p>
                <p><strong>Status:</strong> ${bookingData.bookingstatus}</p>
            </fieldset>
        `;
    } else {
        alert("Booking ID not found.");
    }
});
