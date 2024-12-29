// Function to generate a unique 12-digit booking ID in the format BID123456789
function generateBookingID() {
    const randomNum = Math.floor(Math.random() * 1000000000); // Generate a random number up to 9 digits
    const bookingID = "BID" + randomNum.toString().padStart(9, "0"); // Prepend 'BID' and pad the number to 9 digits
    return bookingID;
}
function generateCustomerID() {
    const randomNum = Math.floor(Math.random() * 1000000000); // Generate a random number up to 9 digits
    const bookingID = "CID" + randomNum.toString().padStart(9, "0"); // Prepend 'BID' and pad the number to 9 digits
    return bookingID;
}
// Function to store form data and display the alert with booking details
function storeFormData(event) {
    event.preventDefault(); // Prevent form submission and page reload

    // Retrieve form data
    const senderName = document.getElementById("sender-name").value.trim();
    const senderAddress = document.getElementById("sender-address").value.trim();
    const senderContact = document.getElementById("sender-contact").value.trim();
    const receiverName = document.getElementById("receiver-name").value.trim();
    const receiverAddress = document.getElementById("receiver-address").value.trim();
    const receiverPincode = document.getElementById("receiver-pincode").value.trim();
    const receiverContact = document.getElementById("receiver-contact").value.trim();
    const parcelSize = document.getElementById("parcel-size").value.trim();
    const parcelDescription = document.getElementById("parcel-description").value.trim();
    const deliverySpeed = document.getElementById("delivery-speed").value;
    const packagingPreference = document.getElementById("packaging-preference").value;
    const pickupTime = document.getElementById("pickup-time").value.trim();
    const serviceCost = document.getElementById("service-cost").value.trim();
    const paymentMethod = document.getElementById("payment-method").value;
    const insurance = document.getElementById("insurance").value;
    const tracking = document.getElementById("tracking").value;

    // Validate receiver's data (excluding sender's data)
    if (!receiverName || !receiverAddress || !receiverPincode || !receiverContact) {
        alert("Please fill in all the receiver's details.");
        return;
    }

    // Mobile number validation (Receiver's contact)
    const mobilePattern = /^[6-9]\d{9}$/; // Starts with 6-9 and has 10 digits
    if (!mobilePattern.test(receiverContact)) {
        alert("Please enter a valid 10-digit mobile number for the receiver.");
        return;
    }

    // Pincode validation (Receiver's pincode)
    const pincodePattern = /^\d{6}$/; // Exactly 6 digits
    if (!pincodePattern.test(receiverPincode)) {
        alert("Please enter a valid 6-digit pincode for the receiver.");
        return;
    }

    // Pickup time validation (must be a valid date and time in the future)
    const pickupDate = new Date(pickupTime);
    const currentDate = new Date();
    if (pickupTime === "" || pickupDate <= currentDate) {
        alert("Please select a valid pickup time in the future.");
        return;
    }

    // Service cost validation (must be a positive number)
    // Insurance validation (must be selected)
    if (!insurance) {
        alert("Please select an insurance option.");
        return;
    }

    // Tracking validation (must be selected)
    if (!tracking) {
        alert("Please select a tracking service.");
        return;
    }

    // Parcel weight validation (must be a valid number)
    if (isNaN(parcelSize) || parseFloat(parcelSize) <= 0) {
        alert("Please enter a valid weight for the parcel.");
        return;
    }

    // Delivery speed validation (must be selected)
    if (!deliverySpeed) {
        alert("Please select a delivery speed option.");
        return;
    }

    // Packaging preference validation (must be selected)
    if (!packagingPreference) {
        alert("Please select a packaging preference.");
        return;
    }

    // Payment method validation (must be selected)
    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    // If payment method is credit/debit card, validate card number, CVV, and expiration date
    if (paymentMethod === "credit-card" || paymentMethod === "debit-card") {
        const cardNumber = document.getElementById("card-number").value.trim();
        const cvv = document.getElementById("cvv").value.trim();
        const expiryDate = document.getElementById("expiry-date").value.trim(); // expiry date in format YYYY-MM

        // Validate card number (must be exactly 16 digits and numeric)
        const cardPattern = /^\d{16}$/;
        if (!cardPattern.test(cardNumber)) {
            alert("Please enter a valid 16-digit card number containing only numbers.");
            return;
        }

        // Validate CVV (must be exactly 3 digits and numeric)
        const cvvPattern = /^\d{3}$/;
        if (!cvvPattern.test(cvv)) {
            alert("Please enter a valid 3-digit CVV.");
            return;
        }

        // Validate expiration date (must be in the future)
        const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
        const currentYear = new Date().getFullYear(); // Get current year (yyyy)
        const [expiryYear, expiryMonth] = expiryDate.split("-").map(Number);

        // Check if the expiration date is in the future
        if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
            alert("Please enter a valid expiration date (must be in the future).");
            return;
        }
    }

    // Generate the booking ID
    const bookingID = generateBookingID();
    const customerID = generateCustomerID();

    // Consolidate form data
    const bookingData = {
        bookingID,
        customerID,
        senderName,
        senderAddress,
        senderContact,
        receiverName,
        receiverAddress,
        receiverPincode,
        receiverContact,
        parcelSize,
        parcelDescription,
        deliverySpeed,
        packagingPreference,
        pickupTime,
        serviceCost,
        paymentMethod,
        insurance,
        tracking,
        bookingstatus:"In Transit",
    };

    // Save data to local storage
    localStorage.setItem("bookingFormData", JSON.stringify(bookingData));

    // Display alert with booking details
    alert(`Booking ID: ${bookingID}\nCustomer ID: ${customerID}\nSender Name: ${senderName}\nReceiver Name: ${receiverName}\nSender Address: ${senderAddress}\nReceiver Address: ${receiverAddress}\nAmount: ${serviceCost}\nPayment Method: ${paymentMethod}`);    
    window.location.href = "invoice.html";
}

// Function to display payment details based on selected payment method
function showPaymentDetails() {
    const paymentMethod = document.getElementById("payment-method").value;

    // Hide all payment details
    document.getElementById("card-details").style.display = "none";
    document.getElementById("net-banking-details").style.display = "none";
    document.getElementById("cash-details").style.display = "none";

    // Show relevant payment details based on selection
    if (paymentMethod === "credit-card" || paymentMethod === "debit-card") {
        document.getElementById("card-details").style.display = "block";
    } else if (paymentMethod === "net-banking") {
        document.getElementById("net-banking-details").style.display = "block";
    } else if (paymentMethod === "cash") {
        document.getElementById("cash-details").style.display = "block";
    }
}
