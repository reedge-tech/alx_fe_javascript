// Initial quotes array
let quotes = [
    { text: "Be yourself; everyone else is already taken.", category: "Motivation" },
    { text: "Two things are infinite: the universe and human stupidity.", category: "Humor" },
    { text: "In the middle of difficulty lies opportunity.", category: "Motivation" },
];

// Load quotes from local storage
const storedQuotes = JSON.parse(localStorage.getItem('quotes'));
if (storedQuotes) {
    quotes = storedQuotes;
}

// Display random quote
function displayRandomQuote() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const filteredQuotes = categoryFilter === 'all' 
        ? quotes 
        : quotes.filter(q => q.category === categoryFilter);

    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        document.getElementById('quoteDisplay').innerHTML = `"${filteredQuotes[randomIndex].text}"`;
        sessionStorage.setItem('lastQuote', JSON.stringify(filteredQuotes[randomIndex]));
    } else {
        document.getElementById('quoteDisplay').innerHTML = "No quotes in this category.";
    }
}

// Populate categories dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    const categories = [...new Set(quotes.map(q => q.category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    const lastCategory = localStorage.getItem('lastCategory') || 'all';
    categoryFilter.value = lastCategory;
}

// Filter quotes by selected category
function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('lastCategory', selectedCategory);
    displayRandomQuote();
}

// Add new quote
function handleAddQuote(event) {
    event.preventDefault();
    const text = document.getElementById('newQuoteText').value;
    const category = document.getElementById('newQuoteCategory').value;
    addQuote({ text, category });
    event.target.reset();
}

function addQuote(newQuote) {
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    displayRandomQuote();
}

// Export quotes to JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        const importedQuotes = JSON.parse(e.target.result);
        quotes.push(...importedQuotes);
        localStorage.setItem('quotes', JSON.stringify(quotes));
        populateCategories();
        displayRandomQuote();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Initialize page
populateCategories();
displayRandomQuote();

// Restore last viewed quote from session storage
const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
if (lastQuote) {
    document.getElementById('quoteDisplay').innerHTML = `"${lastQuote.text}"`;
}
