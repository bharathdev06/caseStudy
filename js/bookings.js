document.addEventListener("DOMContentLoaded", () => {
    const senderData = JSON.parse(localStorage.getItem("customerData"));
    // console.log(senderData);
    if (senderData != null) {
      document.getElementById("sender-name").value = senderData.customerName;
      document.getElementById("sender-address").value = senderData.address;
      document.getElementById("sender-contact").value = senderData.mobile;
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const currentTimeElement = document.getElementById("current-time");
    const pickupTimeInput = document.getElementById("pickup-time");
    const packagingPreference = document.getElementById("packaging-preference");
    const deliverySpeed = document.getElementById("delivery-speed");
    const parcelSizeInput = document.getElementById("parcel-size");
    const serviceCostInput = document.getElementById("service-cost");
    const form = document.querySelector("form");
  
    // Function to format the current date and time
    const formatDateTime = (date) => {
      const pad = (num) => num.toString().padStart(2, "0");
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
  
    // Function to update the current time display
    const updateCurrentTime = () => {
      const now = new Date();
      currentTimeElement.textContent = now.toLocaleString();
      pickupTimeInput.min = formatDateTime(now);
    };
  
    // Function to calculate the service cost
    const calculateServiceCost = () => {
      const packagingCosts = {
        standard: 20,
        eco: 30,
        custom: 40,
        fragile: 50,
      };
  
      const packagingType = packagingPreference.value;
      const parcelWeight = parseFloat(parcelSizeInput.value) || 0;
      const isExpress = deliverySpeed.value === "express";
  
      let cost = 0;
  
      if (packagingCosts[packagingType] && parcelWeight > 0) {
        cost = packagingCosts[packagingType] * parcelWeight;
        if (isExpress) {
          cost += 40;
        } else {
          cost += 20;
        }
      }
  
      serviceCostInput.value = cost > 0 ? `₹${cost.toFixed(2)}` : "";
    };
  
    // Function to store form data in local storage
    
    // Attach the `storeFormData` function to the form's submit event
    form.addEventListener("submit", storeFormData);
  
    // Initialize current time and set periodic updates
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
  
    // Recalculate service cost on input changes
    packagingPreference.addEventListener("change", calculateServiceCost);
    parcelSizeInput.addEventListener("input", calculateServiceCost);
    deliverySpeed.addEventListener("change", calculateServiceCost);
  });
  