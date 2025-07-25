// Filter functionality for Fern Cards
console.log('🔍 Filter system initialized');

// Pagination settings
const CARDS_PER_PAGE = 8;
let currentPage = 1;

// Define filterCards function first
function filterCards(category, searchTerm, showAll = false) {
  // Re-get cards in case DOM changed
  const currentCards = document.querySelectorAll('.filter-card');
  
  let visibleCount = 0;
  let hiddenCount = 0;
  let matchingCards = [];
  
  // First pass: find all matching cards
  currentCards.forEach((card, index) => {
    // Get filter data from hidden div inside the card
    const filterDataEl = card.querySelector('.filter-data');
    const cardCategory = filterDataEl ? filterDataEl.dataset.category : '';
    const cardTags = filterDataEl ? filterDataEl.dataset.tags || '' : '';
    const cardText = card.textContent.toLowerCase();
    
    // Category filter
    const categoryMatch = category === 'all' || cardCategory === category;
    
    // Search filter
    const searchMatch = !searchTerm || 
      cardText.includes(searchTerm.toLowerCase()) ||
      cardTags.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (categoryMatch && searchMatch) {
      matchingCards.push({ card, index });
    }
  });
  
  // Second pass: show/hide based on pagination
  const cardsToShow = showAll ? matchingCards.length : Math.min(CARDS_PER_PAGE, matchingCards.length);
  
  currentCards.forEach((card, index) => {
    const matchIndex = matchingCards.findIndex(match => match.card === card);
    const shouldShow = matchIndex !== -1 && matchIndex < cardsToShow;
    
    if (shouldShow) {
      card.classList.remove('hidden');
      card.style.display = '';
      visibleCount++;
    } else {
      card.classList.add('hidden');
      card.style.display = 'none';
      hiddenCount++;
    }
  });
  
  console.log(`🔍 Showing ${visibleCount} of ${matchingCards.length} matching products`);
  
  // Show/hide "Show More" button
  updateShowMoreButton(matchingCards.length, cardsToShow);
  
  // Update results count
  updateResultsCount();
}

function updateShowMoreButton(totalMatching, currentlyShowing) {
  let showMoreBtn = document.querySelector('.show-more-btn');
  
  if (totalMatching > CARDS_PER_PAGE && currentlyShowing < totalMatching) {
    if (!showMoreBtn) {
      // Create show more button
      const cardContainer = document.querySelector('.td-main-body');
      showMoreBtn = document.createElement('div');
      showMoreBtn.className = 'show-more-btn';
      showMoreBtn.innerHTML = `
        <button style="
          margin: 2rem auto;
          display: block;
          padding: 0.75rem 1.5rem;
          background: #007AC5;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
        ">
          Show More Products (${totalMatching - currentlyShowing} remaining)
        </button>
      `;
      cardContainer.appendChild(showMoreBtn);
      
      // Add click handler
      showMoreBtn.querySelector('button').addEventListener('click', function() {
        const currentCategory = document.querySelector('.td-sidebar-item.td-active')?.dataset.category || 'all';
        const currentSearch = document.getElementById('main-search').value;
        filterCards(currentCategory, currentSearch, true);
      });
    } else {
      showMoreBtn.style.display = 'block';
      showMoreBtn.querySelector('button').textContent = `Show More Products (${totalMatching - currentlyShowing} remaining)`;
    }
  } else {
    if (showMoreBtn) {
      showMoreBtn.style.display = 'none';
    }
  }
}

function updateResultsCount() {
  const visibleCards = document.querySelectorAll('.filter-card:not(.hidden)');
  const totalCards = document.querySelectorAll('.filter-card').length;
  
  console.log('🔍 Results count:', `${visibleCards.length} of ${totalCards} products visible`);
}

// Initialize immediately if DOM is ready
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initializeFilter();
}

// Also try on DOMContentLoaded (in case DOM isn't ready yet)
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 DOMContentLoaded event fired');
    initializeFilter();
});

function initializeFilter() {
    console.log('🔍 Initializing filter system');
    
    const sidebarItems = document.querySelectorAll('.td-sidebar-item');
    const mobileDropdown = document.getElementById('mx-filter-dropdown');
    const searchInput = document.getElementById('main-search');
    const mainHeader = document.querySelector('.td-main-hdr');
      
    // Sidebar filtering
    sidebarItems.forEach(item => {
      item.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update active state
        sidebarItems.forEach(i => i.classList.remove('td-active'));
        this.classList.add('td-active');
        
        // Update header
        if (mainHeader) {
          mainHeader.textContent = this.querySelector('span').textContent;
        }
        
        // Update mobile dropdown
        if (mobileDropdown) {
          mobileDropdown.value = category;
        }
        
        // Reset pagination and filter cards
        currentPage = 1;
        const currentSearch = searchInput ? searchInput.value : '';
        filterCards(category, currentSearch);
      });
    });
    
    // Mobile dropdown filtering
    if (mobileDropdown) {
      mobileDropdown.addEventListener('change', function() {
        const category = this.value;
        const selectedText = this.options[this.selectedIndex].text;
        
        // Update sidebar active state
        sidebarItems.forEach(item => {
          item.classList.remove('td-active');
          if (item.dataset.category === category) {
            item.classList.add('td-active');
          }
        });
        
        // Update header
        if (mainHeader) {
          mainHeader.textContent = selectedText;
        }
        
        // Reset pagination and filter cards
        currentPage = 1;
        const currentSearch = searchInput ? searchInput.value : '';
        filterCards(category, currentSearch);
      });
    }
    
    // Search filtering
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const currentCategory = document.querySelector('.td-sidebar-item.td-active')?.dataset.category || 'all';
        // Reset pagination when searching
        currentPage = 1;
        filterCards(currentCategory, this.value);
      });
      
      console.log('🔍 Search and filter system ready');
    } else {
      console.log('❌ Search input not found');
    }
    
    // Initialize with pagination - show only first 8 cards
    filterCards('all', '');
}