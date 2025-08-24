let quotes = [
  { text: "First quote", category: "Motivation" },
  { text: "Second quote", category: "Life" }
];

// Load quotes from local storage
if(localStorage.getItem("quotes")) {
  quotes = JSON.parse(localStorage.getItem("quotes"));
}

// Display last viewed quote from session storage
let lastQuote = sessionStorage.getItem("lastQuote") || "";
const quoteDisplay = document.getElementById("quoteDisplay");
quoteDisplay.innerHTML = lastQuote;

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = randomQuote.text + " [" + randomQuote.category + "]";
  sessionStorage.setItem("lastQuote", quoteDisplay.innerHTML);
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;
  if(text && category) {
    quotes.push({ text, category });
    saveQuotes();
    showRandomQuote();
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Export quotes as JSON file
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("exportQuotesBtn").addEventListener("click", exportToJsonFile);

