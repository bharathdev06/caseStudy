window.onload = function () {
    // Assuming the invoice details are stored in localStorage
    const bookingData = JSON.parse(localStorage.getItem("bookingFormData"));

    // Check if data exists
    if (bookingData) {
        // Set the values of the invoice fields dynamically
        document.getElementById("receiver-name").innerText = bookingData.receiverName;
        document.getElementById("receiver-address").innerText = bookingData.receiverAddress;
        document.getElementById("receiver-pincode").innerText = bookingData.receiverPincode;
        document.getElementById("receiver-mobile").innerText = bookingData.receiverContact;
        document.getElementById("parcel-weight").innerText = bookingData.parcelSize + "kg";
        document.getElementById("parcel-description").innerText = bookingData.parcelDescription;
        document.getElementById("parcel-delivery-type").innerText = bookingData.deliverySpeed;
        document.getElementById("parcel-packaging").innerText = bookingData.packagingPreference;
        document.getElementById("pickup-time").innerText = bookingData.pickupTime;
        document.getElementById("dropoff-time").innerText = bookingData.dropoffTime || "TBD";
        document.getElementById("service-cost").innerText = "$" + bookingData.serviceCost;
        document.getElementById("payment-time").innerText = bookingData.paymentTime || "TBD";
    } else {
        alert("No booking data found.");
    }
    
};

// Function to download the invoice as a PDF
// Function to download the invoice as a PDF and redirect to customer.html
async function downloadInvoice() {
    const { jsPDF } = window.jspdf;

    const invoiceElement = document.getElementById("invoice-container");

    try {
        const pdf = new jsPDF("p", "mm", "a4");
        const canvas = await html2canvas(invoiceElement, {
            scale: 2, // Higher scale for better resolution
            useCORS: true, // Allow CORS for external resources
        });

        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Invoice.pdf");
        
        // Redirect to customer.html after download
        window.location.href = "customer.html";
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate and download the invoice. Please try again.");
    }
}

