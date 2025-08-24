// ==================== Quotes Array ====================
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "First quote example", category: "Motivation" },
  { text: "Second quote example", category: "Inspiration" }
];

// ==================== DOM Elements ====================
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');

// ==================== Functions ====================

// Display a random quote
function showRandomQuote(filteredQuotes = quotes) {
  if (filteredQuotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `"${quote.text}" - ${quote.category}`;
  sessionStorage.setItem('lastViewedQuote', randomIndex);
}

// Add a new quote
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();
  if (!text || !category) return alert("Both fields are required");

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  filterQuotes();
  newQuoteText.value = '';
  newQuoteCategory.value = '';
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Export quotes to JSON file
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// ==================== Category Functions ====================
function populateCategories() {
  // Extract unique categories
  const categories = Array.from(new Set(quotes.map(q => q.category)));
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category
  const lastFilter = localStorage.getItem('lastSelectedCategory');
  if (lastFilter) categoryFilter.value = lastFilter;
}

// Filter quotes based on category
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem('lastSelectedCategory', selectedCategory);

  if (selectedCategory === 'all') {
    showRandomQuote(quotes);
  } else {
    const filtered = quotes.filter(q => q.category === selectedCategory);
    showRandomQuote(filtered);
  }
}

// ==================== Event Listeners ====================
newQuoteBtn.addEventListener('click', () => filterQuotes());
addQuoteBtn.addEventListener('click', addQuote);
exportBtn.addEventListener('click', exportToJsonFile);
importFile.addEventListener('change', importFromJsonFile);

// ==================== Load Initial Data ====================
window.addEventListener('load', () => {
  populateCategories();
  filterQuotes();
});

