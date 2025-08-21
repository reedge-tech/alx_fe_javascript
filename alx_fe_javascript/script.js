// ====== Dynamic Quote Generator ======

// Initial quotes
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Wisdom" },
  { text: "Your limitation—it’s only your imagination.", category: "Inspiration" }
];

// Get DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Function: Display a random quote
function displayRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>- ${quote.category}</small>`;
}

// Function: Add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    quotes.push({ text, category });
    displayRandomQuote();
    textInput.value = "";
    categoryInput.value = "";
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Event listener for the button
newQuoteBtn.addEventListener("click", displayRandomQuote);

// Show one quote on page load
displayRandomQuote();
