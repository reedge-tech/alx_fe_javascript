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

let quotes = [];

document.addEventListener('DOMContentLoaded', () => {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
        quotes = JSON.parse(savedQuotes);
    }
    displayRandomQuote();
});

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function displayRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById('quoteDisplay').textContent = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').textContent = quote;
    sessionStorage.setItem('lastViewedQuote', quote);
}

function addQuote() {
    const input = document.getElementById('newQuote');
    const quote = input.value.trim();
    if (quote) {
        quotes.push(quote);
        saveQuotes();
        input.value = '';
        displayRandomQuote();
    }
}

function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        displayRandomQuote();
    };
    fileReader.readAsText(event.target.files[0]);
}
