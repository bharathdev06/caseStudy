function loginValidation(event) {
    event.preventDefault(); // Prevent form submission for validation
  
    // Retrieve form data
    const userID = document.getElementById("id").value.trim();
    const password = document.getElementById("password").value;
  
    // Get stored user data from local storage
    const storedData = {
        "userID": "OFR1234",
        "password": "Ofr12345"
      };
  
    // Check if the stored data exists and matches the entered data
    if (storedData && storedData.userID === userID && storedData.password === password) {
      alert("Login successful!");
      // Redirect to customer page after successful login
      window.location.href = "officierhome.html";
    } else {
      alert("Invalid username or password. Please try again.");
    }
  }
  