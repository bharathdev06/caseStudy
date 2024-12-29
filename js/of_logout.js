function logout() {
    // Clear user data from localStorage (or sessionStorage)
    localStorage.removeItem("userID");
    localStorage.removeItem("password");
    
    // Redirect the user to the login page or home page
    window.location.href = "officer_login.html";  // Adjust the redirection URL as needed
}
