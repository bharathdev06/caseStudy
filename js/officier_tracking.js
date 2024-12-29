// Assuming the booking data is stored in local storage as a JSON string
const bookingData = JSON.parse(localStorage.getItem('bookingHistory'));

// Function to create and populate the table
function createBookingTable(data) {
    const tableBody = document.querySelector('tbody');
    // Clear existing rows in the table body
    tableBody.innerHTML = '';

    // Sort the booking data based on booking status
    const sortedData = sortBookingData([data]); // Wrap data in an array for sorting
    sortedData.forEach((booking) => {
    // Create a new row for the booking data
    booking.forEach(item => {
        const row = document.createElement('tr');

        // Extracting relevant fields from the booking data
        const bookingID = item.bookingId;
        const receiverName = item.receiverName;
        const receiverAddress = item.deliveredAddress;
        const amount = item.amount; // Assuming serviceCost is the amount
        const parcelStatus = item.status; // Assuming bookingstatus is the parcel status
        const bookingDate = new Date(item.bookingDate).toLocaleDateString(); // Format the date
        const deliveryDate = calculateDeliveryDate(item.bookingDate, item.deliverySpeed); // Calculate delivery date

        // Create cells for each field
        const cells = [
            bookingID,
            receiverName,
            receiverAddress,
            amount,
            parcelStatus,
            bookingDate,
            deliveryDate
        ];

        // Append cells to the row
        cells.forEach(cellValue => {
            const cell = document.createElement('td');
            cell.textContent = cellValue;
            row.appendChild(cell);
        });

        // Append the row to the table body
        tableBody.appendChild(row);
    });
});
}

function calculateDeliveryDate(pickupTime, deliverySpeed) {
    const pickupDate = new Date(pickupTime);
    let deliveryDays;

    // Determine the number of days to add based on delivery speed
    if (deliverySpeed === "standard") {
        deliveryDays = 4; // Add 4 days for standard delivery
    } else if (deliverySpeed === "express") {
        deliveryDays = 2; // Add 2 days for express delivery
    } else {
        deliveryDays = 0; // Default case if delivery speed is unknown
    }

    // Calculate the delivery date
    pickupDate.setDate(pickupDate.getDate() + deliveryDays);
    return pickupDate.toLocaleDateString(); // Return formatted delivery date
}

function sortBookingData(data) {
    const statusOrder = {
        "In Transit": 1,
        "Booked": 2,
        "Delivered": 3,
        "Returned": 4
    };

    return data.sort((a, b) => {
        return (statusOrder[a.booking.bookingstatus] || 5) - (statusOrder[b.booking.bookingstatus] || 5);
    });
}

// Function to filter booking data based on search criteria
function filterBookingData() {
    const customerIdInput = document.getElementById('customer-id').value.trim();
    const bookingIdInput = document.getElementById('booking-id').value.trim();

    // Filter the booking data based on Customer ID and Booking ID
    const filteredData = bookingData.filter(item => {
        const matchesCustomerId = customerIdInput === '' || item.customerId === customerIdInput;
        const matchesBookingId = bookingIdInput === '' || item.bookingId === bookingIdInput;
        console.log(matchesCustomerId && matchesBookingId);
        
        return matchesCustomerId && matchesBookingId;
    });
    console.log(filteredData);
    

    // Create the table with filtered data
    createBookingTable(filteredData);
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', filterBookingData);

// Call the function to create the table
createBookingTable(bookingData);