let quotes = [
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" }
];

// Load stored quotes
function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    quotes = JSON.parse(stored);
  }
}
loadQuotes();

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quoteDisplay').innerText = random.text + " — " + random.author;
  sessionStorage.setItem('lastQuote', JSON.stringify(random));
}

function exportToJsonFile() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();

  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

document.getElementById('newQuote').addEventListener('click', showQuote);
document.getElementById('exportBtn').addEventListener('click', exportToJsonFile);
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// Show last viewed quote if session has one
const last = sessionStorage.getItem('lastQuote');
if (last) {
  const parsed = JSON.parse(last);
  document.getElementById('quoteDisplay').innerText = parsed.text + " — " + parsed.author;
}
