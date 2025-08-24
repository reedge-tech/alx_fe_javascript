// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const categoryFilter = document.getElementById('categoryFilter');
const exportBtn = document.getElementById('exportQuotesBtn');
const importFile = document.getElementById('importFile');
const notification = document.getElementById('notification');

// Initialize quotes array from localStorage or default
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: 'The early bird catches the worm', category: 'Motivation' },
  { text: 'A stitch in time saves nine', category: 'Wisdom' }
];

// --- Web Storage & JSON Functions ---
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    displayRandomQuote();
    notification.textContent = 'Quotes imported successfully!';
  };
  fileReader.readAsText(event.target.files[0]);
}

// --- Quote Functions ---
function displayRandomQuote() {
  const filteredQuotes = getFilteredQuotes();
  const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
  if (randomQuote) {
    quoteDisplay.textContent = randomQuote.text;
    sessionStorage.setItem('lastViewedQuote', randomQuote.text);
  } else {
    quoteDisplay.textContent = 'No quotes available in this category.';
  }
}

function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();
  if (text && category) {
    const newQuote = { text, category };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    displayRandomQuote();
    postQuoteToServer(newQuote); // post new quote to server
    notification.textContent = 'Quote added!';
  }
}

// --- Filtering ---
function populateCategories() {
  const categories = ['all', ...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = '';
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) categoryFilter.value = savedCategory;
}

function filterQuotes() {
  localStorage.setItem('selectedCategory', categoryFilter.value);
  displayRandomQuote();
}

function getFilteredQuotes() {
  const selected = categoryFilter.value || 'all';
  return selected === 'all' ? quotes : quotes.filter(q => q.category === selected);
}

// --- Server Sync Functions ---
async function fetchQuotesFromServer() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // mock API
    const data = await res.json();
    const serverQuotes = data.slice(0, 5).map(item => ({ text: item.title, category: 'Server' }));

    let updated = false;
    serverQuotes.forEach(sq => {
      if (!quotes.find(q => q.text === sq.text)) {
        quotes.push(sq);
        updated = true;
      }
    });

    if (updated) {
      saveQuotes();
      populateCategories();
      notification.textContent = 'Quotes updated from server!';
    }
  } catch (err) {
    console.error('Error fetching server quotes:', err);
  }
}

async function postQuoteToServer(quote) {
  try {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(quote),
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error posting quote to server:', err);
  }
}

function syncQuotes() {
  fetchQuotesFromServer();
  setInterval(fetchQuotesFromServer, 30000); // every 30 seconds
}

// --- Event Listeners ---
newQuoteBtn.addEventListener('click', displayRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);
categoryFilter.addEventListener('change', filterQuotes);
exportBtn.addEventListener('click', exportToJsonFile);
importFile.addEventListener('change', importFromJsonFile);

// --- Initialize ---
populateCategories();
displayRandomQuote();
syncQuotes();


