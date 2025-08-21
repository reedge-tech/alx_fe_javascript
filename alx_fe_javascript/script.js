// Quotes array
const quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Don’t let yesterday take up too much of today.",
  "Your limitation—it’s only your imagination."
];

// Function: Display random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerText = randomQuote;
}

// Function: Add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const newQuote = textInput.value.trim();

  if (newQuote) {
    quotes.push(newQuote);
    textInput.value = "";
    displayRandomQuote();
  }
}

// Event listener
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Show a quote when page loads
displayRandomQuote();
