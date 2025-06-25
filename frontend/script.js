const API_URL = "http://127.0.0.1:8000/flashcards";

let cards = [];
let currentIndex = 0;
let bookmarks = JSON.parse(localStorage.getItem("bookmarkedCards") || "[]");

const front = document.getElementById("card-front");
const back = document.getElementById("card-back");
const card = document.getElementById("flashcard");
const bookmarkBtn = document.getElementById("bookmark-btn");
const bookmarkToggle = document.getElementById("show-bookmarked");
let fullDeck = [];

// 🌀 Flip card on click
card.addEventListener("click", () => {
  card.classList.toggle("flipped");
});

// ⏭️ Next card
document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    showCard();
  }
});

// ⏮️ Previous card
document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showCard();
  }
});

// 🔄 Load cards from API
document.getElementById("load-btn").addEventListener("click", async () => {
  const category = document.getElementById("category").value;
  let url = API_URL;
  if (category) {
    url += `?category=${category}`;
  }

  try {
    const res = await fetch(url);
    fullDeck = await res.json();
    applyBookmarkFilter();
  } catch (err) {
    front.textContent = "Error loading cards.";
    back.textContent = "";
    console.error(err);
  }
});

// ⭐ Bookmark toggle
bookmarkBtn.addEventListener("click", () => {
  if (cards.length === 0) return;

  const currentCard = cards[currentIndex];
  const key = `${currentCard.id}-${currentCard.category}`;

  if (bookmarks.includes(key)) {
    bookmarks = bookmarks.filter(b => b !== key);
  } else {
    bookmarks.push(key);
  }

  localStorage.setItem("bookmarkedCards", JSON.stringify(bookmarks));
  updateBookmarkIcon();
});

// 📋 Show current card
function showCard() {
  if (cards.length === 0) {
    front.textContent = "No cards found.";
    back.textContent = "";
    bookmarkBtn.textContent = "⭐ Bookmark";
    return;
  }

  const cardData = cards[currentIndex];
  front.textContent = cardData.question;
  back.textContent = cardData.answer;
  card.classList.remove("flipped");
  updateBookmarkIcon();
}

// 🔁 Show only bookmarked toggle
function applyBookmarkFilter() {
  const showOnly = bookmarkToggle.checked;

  if (showOnly) {
    cards = fullDeck.filter(card => {
      const key = `${card.id}-${card.category}`;
      return bookmarks.includes(key);
    });
  } else {
    cards = [...fullDeck];
  }

  currentIndex = 0;
  showCard();
}

bookmarkToggle.addEventListener("change", applyBookmarkFilter);

// 🔄 Update bookmark button state
function updateBookmarkIcon() {
  if (cards.length === 0) return;

  const currentCard = cards[currentIndex];
  const key = `${currentCard.id}-${currentCard.category}`;

  bookmarkBtn.textContent = bookmarks.includes(key)
    ? "✅ Bookmarked"
    : "⭐ Bookmark";
}

// ➕ Submit new flashcard
document.getElementById("flashcard-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const question = document.getElementById("new-question").value.trim();
  const answer = document.getElementById("new-answer").value.trim();
  const category = document.getElementById("new-category").value.trim();

  if (!question || !answer || !category) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer, category })
    });

    if (!res.ok) throw new Error("Failed to add flashcard");

    const newCard = await res.json();
    alert("Flashcard added successfully!");
    e.target.reset();
    document.getElementById("load-btn").click();

  } catch (err) {
    alert("Error adding flashcard.");
    console.error(err);
  }
});

function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.style.display = "none";
  });
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById(tabId).style.display = "block";
  const activeBtn = Array.from(document.querySelectorAll(".tab-btn")).find(btn =>
    btn.textContent.includes(tabId.includes("flashcards") ? "Flashcards" : "Add")
  );
  if (activeBtn) activeBtn.classList.add("active");
}

// 🔀 Tab switching logic
document.querySelectorAll(".tab-btn").forEach(button => {
    button.addEventListener("click", () => {
      const targetTabId = button.getAttribute("data-tab");
  
      // Hide all tabs
      document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.add("hidden");
      });
  
      // Remove active class from all buttons
      document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
      });
  
      // Show the clicked tab
      document.getElementById(targetTabId).classList.remove("hidden");
      button.classList.add("active");
    });
  });
  
