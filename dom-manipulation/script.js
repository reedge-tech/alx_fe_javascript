// Array of quotes
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
  { text: "You learn more from failure than from success.", category: "Education" }
];

// Display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = `"${quote.text}" — ${quote.category}`;
}

// Add a new quote
function addQuote(text, category) {
  if (text && category) {
    quotes.push({ text, category });
    showRandomQuote();
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Create form dynamically
function createAddQuoteForm() {
  const container = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", () => {
    addQuote(textInput.value.trim(), categoryInput.value.trim());
    textInput.value = "";
    categoryInput.value = "";
  });

  container.appendChild(textInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);

  document.body.appendChild(container);
}

// Initialize
createAddQuoteForm();
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
showRandomQuote();

