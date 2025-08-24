// Load quotes from localStorage or default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
  { text: "You learn more from failure than from success.", category: "Education" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display a random quote and save last viewed to sessionStorage
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = `"${quote.text}" — ${quote.category}`;
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

// Add a new quote
function addQuote(text, category) {
  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    showRandomQuote();
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Setup Add Quote button
document.getElementById("addQuoteBtn").addEventListener("click", () => {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  addQuote(textInput.value.trim(), categoryInput.value.trim());
  textInput.value = "";
  categoryInput.value = "";
});

// JSON Export
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// JSON Import
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
    showRandomQuote();
  };
  fileReader.readAsText(event.target.files[0]);
}

// Setup import/export buttons
document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Show initial random quote
showRandomQuote();

// Show new quote button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
