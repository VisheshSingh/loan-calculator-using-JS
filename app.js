document.getElementById("loan-form").addEventListener("submit", function(e) {
  e.preventDefault();

  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
});

function calculateResults() {
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalInterest = document.getElementById("total-interest");
  const totalPayment = document.getElementById("total-payment");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  // compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);

    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

function showError(err) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "none";
  // create a div
  const errorDiv = document.createElement("div");

  // add class
  errorDiv.className = "alert alert-danger";

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(err));

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
