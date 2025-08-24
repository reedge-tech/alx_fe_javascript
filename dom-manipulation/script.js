// Array of quotes
let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don't let yesterday take up too much of today.", category: "Motivation" },
    { text: "You learn more from failure than from success.", category: "Learning" }
];

// ---- Web Storage Functions ----

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Save last viewed quote to session storage
function saveLastQuote(quote) {
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Load last viewed quote from session storage
function getLastQuote() {
    const stored = sessionStorage.getItem('lastQuote');
    return stored ? JSON.parse(stored) : null;
}

// ---- Display Functions ----
function displayRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').innerHTML = `"${quote.text}" - ${quote.category}`;
    saveLastQuote(quote);
}

// ---- Add Quote Function (optional) ----
function addQuote(text, category) {
    quotes.push({ text, category });
    saveQuotes();
    displayRandomQuote();
}

// ---- JSON Export ----
function exportToJsonFile() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// ---- JSON Import ----
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        displayRandomQuote();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// ---- Event Listeners ----
document.getElementById('newQuoteBtn').addEventListener('click', displayRandomQuote);
document.getElementById('exportJson').addEventListener('click', exportToJsonFile);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// ---- Initialize ----
loadQuotes();
const lastQuote = getLastQuote();
if (lastQuote) {
    document.getElementById('quote').innerHTML = `"${lastQuote.text}" - ${lastQuote.category}`;
} else {
    displayRandomQuote();
}

