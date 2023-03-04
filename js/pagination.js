const pagination = document.getElementById('pagination');
const itemsPerPage = 5;
let currentPage = 1;
let items = [];

// Create items
for (let i = 1; i <= 50; i++) {
  items.push(`Item ${i}`);
}

// Display items on current page
function displayItems() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  // Display items
  const itemContainer = document.createElement('div');
  itemContainer.classList.add('item-container');

  paginatedItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    itemElement.innerText = item;
    itemContainer.appendChild(itemElement);
  });

  // Clear pagination
  pagination.innerHTML = '';

  // Add previous button
  if (currentPage > 1) {
    const previousButton = document.createElement('button');
    previousButton.classList.add('pagination-button');
    previousButton.innerText = 'Previous';
    previousButton.addEventListener('click', () => {
      currentPage--;
      displayItems();
    });
    pagination.appendChild(previousButton);
  }

  // Add page buttons
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    const pageButton = document.createElement('button');
    pageButton.classList.add('pagination-button');
    pageButton.innerText = i;
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.addEventListener('click', () => {
      currentPage = i;
      displayItems();
    });
    pagination.appendChild(pageButton);
  }

  // Add next button
  if (currentPage < Math.ceil(items.length / itemsPerPage)) {
    const nextButton = document.createElement('button');
    nextButton.classList.add('pagination-button');
    nextButton.innerText = 'Next';
    nextButton.addEventListener('click', () => {
      currentPage++;
      displayItems();
    });
    pagination.appendChild(nextButton);
  }

  // Display items
  pagination.appendChild(itemContainer);
}

// Initial display
displayItems();
