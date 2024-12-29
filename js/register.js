function validation(event) {
  event.preventDefault(); // Prevent form submission for validation

  // Retrieve form data
  const customerName = document.getElementById("customerName").value.trim();
  const email = document.getElementById("email").value.trim();
  const countryCode = document.getElementById("countryCode").value;
  const mobile = document.getElementById("mobile").value.trim();
  const address = document.getElementById("address").value.trim();
  const userID = document.getElementById("userID").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const preferences = document.getElementById("preferences").value.trim();
  var em=validateEmail(email);
  var mb=validateMobile(mobile);
  var pa=validatePassword(password);
  var f=0;
  if(em==true && mb==true && pa==true){
    f=1;
  }
  // Validate required fields
  if (!customerName || customerName.toLowerCase() === "null") {
    alert("Customer Name is required and cannot be 'null'.");
    return;
  }

  // Validate email
  if (!email || !validateEmail(email)) {
    alert("A valid Email is required.");
    return;
  }

  // Validate mobile number
  if (!mobile || !validateMobile(mobile)) {
    alert("A valid Mobile Number is required. The first three digits must be between 900 and 699.");
    return;
  }

  // Validate address
  if (!address) {
    alert("Address is required.");
    return;
  }

  // Validate userID
  if (!userID) {
    alert("User ID is required.");
    return;
  }

  // Validate password
  if (!password || !validatePassword(password)) {
    alert("Password must be between 8 to 30 characters and must include at least one uppercase letter, one lowercase letter, one number, and one special character.");
    return;
  }

  // Validate password confirmation
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // If all validations pass, store the data and show acknowledgment
  const customerData = {
    customerName,
    email,
    countryCode,
    mobile,
    address,
    userID,
    password,
    preferences,
  };

  // Save data to local storage
  localStorage.setItem("customerData", JSON.stringify(customerData));

  // Create a success alert with customer details
  alert(`Customer Registration Successful!\n\nUsername: ${userID}\nName: ${customerName}\nEmail: ${email}`);

  // Display acknowledgment message on the page
  const acknowledgment = document.getElementById("acknowledgment");
  document.getElementById("customerUsername").textContent = userID;
  document.getElementById("acknowledgmentName").textContent = customerName;
  document.getElementById("acknowledgmentEmail").textContent = email;
  acknowledgment.style.display = "block";
  console.log(f);
  if(f==1){
    window.location.href="login.html";
  }
}


// Email validation function
function validateEmail(email) {
  // Regex for validating a simple email format (basic validation)
  const emailPattern = /^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// Mobile number validation function (first three digits between 900 and 699, followed by 7 digits)
function validateMobile(mobile) {
  // Regex to check if the mobile number starts with 9, 8, 7, or 6 followed by two digits and then 7 digits
  const mobilePattern = /^(9\d{2}|8\d{2}|7\d{2}|6\d{2})\d{7}$/;
  return mobilePattern.test(mobile);
}

// Password validation function (at least 8 characters, max 30, contains uppercase, lowercase, number, and special character)
function validatePassword(password) {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
  return passwordPattern.test(password);
}
