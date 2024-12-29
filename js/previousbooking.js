const bookingHistory = [
    {
      customerId: "CID687912345",
      bookingId: "ABC123456789",
      bookingDate: "2024-12-30",
      receiverName: "John Doe",
      deliveredAddress: "456 Elm Street, City, ZIP",
      amount: "RS.200",
      status: "In Transit",
      deliverySpeed: "express"
    },
    {
      customerId: "CID687912345",
      bookingId: "ABC123456790",
      bookingDate: "2024-12-31",
      receiverName: "Jane Smith",
      deliveredAddress: "789 Oak Avenue, City, ZIP",
      amount: "RS.200",
      status: "In Transit",
      deliverySpeed: "standard"
    }
  ];
  
  // Store the booking data in localStorage
  localStorage.setItem("bookingHistory", JSON.stringify(bookingHistory));
  
  // Wait for the page to load and then retrieve and display the booking data
  window.addEventListener('load', function () {
    // Retrieve the booking history from localStorage
    const bookingHistoryString = localStorage.getItem("bookingHistory");
  
    // Convert the string back to an array
    const bookingHistoryArray = JSON.parse(bookingHistoryString);
  
    // If bookingHistoryArray is an array, display the data
    if (Array.isArray(bookingHistoryArray)) {
      const tableBody = document.querySelector("tbody"); // Updated to match your table's `<tbody>` selector
  
      // Clear any existing rows in the table
      tableBody.innerHTML = "";
  
      // Loop through the array and create table rows
      bookingHistoryArray.forEach(booking => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${booking.customerId}</td>
          <td>${booking.bookingId}</td>
          <td>${booking.bookingDate}</td>
          <td>${booking.receiverName}</td>
          <td>${booking.deliveredAddress}</td>
          <td>${booking.amount}</td>
          <td>${booking.status}</td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      console.log("No booking history found.");
    }
  });
  