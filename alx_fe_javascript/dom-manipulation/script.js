// Quotes array with objects containing text and category
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "JavaScript is the language of the web.", category: "Programming" },
  { text: "Learning never exhausts the mind.", category: "Education" }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

// Function to display a random quote
function displayRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" - [${quote.category}]`;
}

// Function to add a new quote
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (text && category) {
    quotes.push({ text, category });
    newQuoteText.value = "";
    newQuoteCategory.value = "";
    displayRandomQuote(); // refresh display
  } else {
    alert("Please fill in both fields.");
  }
}

// Event listeners
newQuoteBtn.addEventListener("click", displayRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// Show an initial quote
displayRandomQuote();
