document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Retrieve input values
        const customerId = document.getElementById('user-id').value.trim();
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        // Validate input values
        if (!customerId || !startDate || !endDate) {
            alert('Please fill in all fields.');
            return;
        }

        // Convert dates to Date objects for comparison
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Check if the start date is before the end date
        if (start > end) {
            alert('Start date must be before end date.');
            return;
        }

        // Fetch or filter booking data based on the criteria
        const bookingData = JSON.parse(localStorage.getItem('bookingHistory')) || [];
        const filteredData = bookingData.filter(item => {
            const bookingDate = new Date(item.bookingDate);
            return item.customerId === customerId && bookingDate >= start && bookingDate <= end;
        });
        createBookingTable(filteredData);
        // Call a function to display the filtered data (you need to implement this)
    });

    function createBookingTable(data) {
        const tableBody = document.querySelector('.table tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        if (data.length === 0) {
            const noDataRow = document.createElement('tr');
            const noDataCell = document.createElement('td');
            noDataCell.setAttribute('colspan', '7');
            noDataCell.textContent = 'No booking data available';
            noDataCell.classList.add('text-center', 'text-muted');
            noDataRow.appendChild(noDataCell);
            tableBody.appendChild(noDataRow);
            return;
        }

        // Create rows for each booking
        data.forEach((item) => {
            const row = document.createElement('tr');
            const cellData = [
                item.customerId || 'N/A',
                item.bookingId || 'N/A',
                item.bookingDate ? new Date(item.bookingDate).toLocaleDateString() : 'N/A',
                item.receiverName || 'N/A',
                item.deliveredAddress || 'N/A',
                item.amount ? item.amount : 'N/A',
                item.status || 'Pending'
            ];

            cellData.forEach(cellValue => {
                const cell = document.createElement('td');
                cell.textContent = cellValue;
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });
    }
});