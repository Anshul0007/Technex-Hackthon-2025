// Search Alumni, Events, or News
const searchInput = document.querySelector('.search-bar input');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  cards.forEach((card) => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    if (name.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
});

// Highlight Selected Category
const categoryLinks = document.querySelectorAll('.categories a');
categoryLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    categoryLinks.forEach((link) => link.classList.remove('active'));
    e.target.classList.add('active');
    const category = e.target.textContent.toLowerCase();
    cards.forEach((card) => {
      const cardText = card.querySelector('h3').textContent.toLowerCase();
      if (cardText.includes(category) || category === 'all') {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Placeholder for Sign-In and Register buttons
document.querySelector('.sign-in').addEventListener('click', () => {
  alert('Sign-In functionality is under construction.');
});

document.querySelector('.register').addEventListener('click', () => {
  alert('Register functionality is under construction.');
});
// Fetch alumni data and populate the grid
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");

  fetch("/api/alumni")
    .then((response) => response.json())
    .then((data) => {
      grid.innerHTML = ""; // Clear existing cards
      data.forEach((alumni) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <img src="${alumni.image}" alt="${alumni.name}">
          <h3>${alumni.name}</h3>
          <p>${alumni.count} Alumni</p>
        `;
        grid.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching alumni data:", error));
});
