// URL for mock server
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch quotes from server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(SERVER_URL);
        if (!response.ok) throw new Error("Failed to fetch from server");
        const serverData = await response.json();

        const serverQuotes = serverData.map(item => ({
            text: item.title || "No text",
            category: item.category || "general"
        }));

        quotes = mergeQuotes(quotes, serverQuotes);
        saveQuotes();
        displayRandomQuote();
        showNotification("Quotes synced with server successfully!");
    } catch (error) {
        console.error("Error fetching quotes:", error);
        showNotification("Failed to fetch quotes from server.");
    }
}

// Post a quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(SERVER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quote)
        });
        if (!response.ok) throw new Error("Failed to post to server");
    } catch (error) {
        console.error("Error posting quote:", error);
        showNotification("Failed to post quote to server.");
    }
}

// Merge local and server quotes (server takes precedence)
function mergeQuotes(local, server) {
    const combined = [...local];
    server.forEach(sq => {
        if (!combined.some(lq => lq.text === sq.text && lq.category === sq.category)) {
            combined.push(sq);
        }
    });
    return combined;
}

// Periodically sync quotes with server
function syncQuotes(interval = 10000) {
    setInterval(fetchQuotesFromServer, interval);
}

// Show notifications for conflicts or updates
function showNotification(message) {
    let notif = document.getElementById("notification");
    if (!notif) {
        notif = document.createElement("div");
        notif.id = "notification";
        notif.style.position = "fixed";
        notif.style.top = "10px";
        notif.style.right = "10px";
        notif.style.backgroundColor = "#4caf50";
        notif.style.color = "white";
        notif.style.padding = "10px 20px";
        notif.style.borderRadius = "5px";
        notif.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        document.body.appendChild(notif);
    }
    notif.innerText = message;
    notif.style.display = "block";
    setTimeout(() => { notif.style.display = "none"; }, 3000);
}

// Start syncing on page load
syncQuotes();
