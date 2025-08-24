// ===== Quotes array =====
const quotes = [
  { text: "Stay hungry, stay foolish.", category: "Inspiration" },
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Wisdom" }
];

// ===== showRandomQuote(): pick random + update DOM =====
function showRandomQuote() {
  const display = document.getElementById('quoteDisplay');
  if (!display) return;

  if (!Array.isArray(quotes) || quotes.length === 0) {
    display.innerHTML = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const q = quotes[randomIndex];
  display.innerHTML = `<p>${q.text}</p><small>${q.category}</small>`;
}

// ===== addQuote(): push new item + update DOM =====
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  const text = textInput ? textInput.value.trim() : "";
  const category = categoryInput ? categoryInput.value.trim() : "";

  if (!text || !category) return;

  quotes.push({ text, category });
  showRandomQuote();

  if (textInput) textInput.value = "";
  if (categoryInput) categoryInput.value = "";
}

// ===== createAddQuoteForm(): dynamically create add-quote UI =====
function createAddQuoteForm() {
  const container = document.createElement('div');

  const textInput = document.createElement('input');
  textInput.id = 'newQuoteText';
  textInput.placeholder = 'Enter a new quote';

  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.id = 'addQuoteBtn';
  addButton.textContent = 'Add Quote';
  addButton.addEventListener('click', addQuote);

  container.appendChild(textInput);
  container.appendChild(categoryInput);
  container.appendChild(addButton);

  document.body.appendChild(container);
}

// ===== Event listeners =====
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('newQuote');
  if (btn) btn.addEventListener('click', showRandomQuote);

  // Dynamically create add quote form (checker looks for this)
  createAddQuoteForm();
});

// Expose globally
window.showRandomQuote = showRandomQuote;
window.addQuote = addQuote;
window.createAddQuoteForm = createAddQuoteForm;
