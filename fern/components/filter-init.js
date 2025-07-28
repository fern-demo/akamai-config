// Check if React is available globally, otherwise import it
let React, ReactDOM;

if (typeof window !== 'undefined' && window.React && window.ReactDOM) {
  console.log('🔍 Using global React and ReactDOM');
  React = window.React;
  ReactDOM = window.ReactDOM;
} else {
  // Fallback - try to import (this might not work in all environments)
  try {
    React = require('react');
    ReactDOM = require('react-dom');
    console.log('🔍 Using imported React and ReactDOM');
  } catch (e) {
    console.error('❌ React and ReactDOM not available:', e);
  }
}

// React Filter Component (inline to avoid import issues)
const FilterComponent = () => {
  // Pagination settings
  const CARDS_PER_PAGE = 8;
  
  // State management
  const [currentCardsShown, setCurrentCardsShown] = React.useState(CARDS_PER_PAGE);
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [filteredCards, setFilteredCards] = React.useState([]);
  const [visibleCards, setVisibleCards] = React.useState([]);

  // Get cards from DOM
  const getCardsFromDOM = React.useCallback(() => {
    const cardElements = document.querySelectorAll('.filter-card');
    const cardsData = Array.from(cardElements).map((card, index) => {
      const filterDataEl = card.querySelector('.filter-data');
      return {
        element: card,
        index,
        category: filterDataEl ? filterDataEl.dataset.category : '',
        tags: filterDataEl ? filterDataEl.dataset.tags || '' : '',
        text: card.textContent.toLowerCase(),
      };
    });
    return cardsData;
  }, []);

  // Initialize cards on mount
  React.useEffect(() => {
    const cardsData = getCardsFromDOM();
    setCards(cardsData);
  }, [getCardsFromDOM]);

  // Filter cards based on category and search
  const filterCards = React.useCallback((category, search, resetPagination = false) => {
    console.log(`🔍 Filtering: category=${category}, search="${search}"`);
    
    if (resetPagination) {
      setCurrentCardsShown(CARDS_PER_PAGE);
    }

    // Re-get cards in case DOM changed
    const currentCards = getCardsFromDOM();
    setCards(currentCards);

    // Filter matching cards
    const matchingCards = currentCards.filter(card => {
      const categoryMatch = category === 'all' || card.category === category;
      const searchMatch = !search || 
        card.text.includes(search.toLowerCase()) ||
        card.tags.toLowerCase().includes(search.toLowerCase());
      
      return categoryMatch && searchMatch;
    });

    setFilteredCards(matchingCards);
    
    // Update visible cards based on pagination
    const cardsToShow = Math.min(resetPagination ? CARDS_PER_PAGE : currentCardsShown, matchingCards.length);
    const cardsToDisplay = matchingCards.slice(0, cardsToShow);
    setVisibleCards(cardsToDisplay);

    // Update DOM visibility
    currentCards.forEach(card => {
      const shouldShow = cardsToDisplay.some(visibleCard => visibleCard.element === card.element);
      if (shouldShow) {
        card.element.classList.remove('hidden');
        card.element.style.display = '';
      } else {
        card.element.classList.add('hidden');
        card.element.style.display = 'none';
      }
    });

    console.log(`🔍 Showing ${cardsToDisplay.length} of ${matchingCards.length} matching products`);
  }, [currentCardsShown, getCardsFromDOM]);

  // Handle category change
  const handleCategoryChange = React.useCallback((category, categoryText) => {
    setActiveCategory(category);
    
    // Update sidebar active state
    const sidebarItems = document.querySelectorAll('.td-sidebar-item');
    sidebarItems.forEach(item => {
      item.classList.remove('td-active');
      if (item.dataset.category === category) {
        item.classList.add('td-active');
      }
    });
    
    // Update header
    const mainHeader = document.querySelector('.td-main-hdr');
    if (mainHeader) {
      mainHeader.textContent = categoryText;
    }
    
    // Update mobile dropdown
    const mobileDropdown = document.getElementById('mx-filter-dropdown');
    if (mobileDropdown) {
      mobileDropdown.value = category;
    }
    
    filterCards(category, searchTerm, true);
  }, [searchTerm, filterCards]);

  // Handle search change
  const handleSearchChange = React.useCallback((search) => {
    setSearchTerm(search);
    filterCards(activeCategory, search, true);
  }, [activeCategory, filterCards]);

  // Handle load more
  const handleLoadMore = React.useCallback(() => {
    const newCardsShown = currentCardsShown + CARDS_PER_PAGE;
    setCurrentCardsShown(newCardsShown);
    
    const cardsToDisplay = filteredCards.slice(0, newCardsShown);
    setVisibleCards(cardsToDisplay);
    
    // Update DOM visibility
    cards.forEach(card => {
      const shouldShow = cardsToDisplay.some(visibleCard => visibleCard.element === card.element);
      if (shouldShow) {
        card.element.classList.remove('hidden');
        card.element.style.display = '';
      } else {
        card.element.classList.add('hidden');
        card.element.style.display = 'none';
      }
    });
  }, [currentCardsShown, filteredCards, cards]);

  // Initialize event listeners
  React.useEffect(() => {
    console.log('🔍 Initializing React filter system');
    
    // Sidebar event listeners
    const sidebarItems = document.querySelectorAll('.td-sidebar-item');
    const handleSidebarClick = (event) => {
      const category = event.currentTarget.dataset.category;
      const categoryText = event.currentTarget.querySelector('span').textContent;
      handleCategoryChange(category, categoryText);
    };

    sidebarItems.forEach(item => {
      item.addEventListener('click', handleSidebarClick);
    });
    
    // Mobile dropdown event listener
    const mobileDropdown = document.getElementById('mx-filter-dropdown');
    const handleDropdownChange = (event) => {
      const category = event.target.value;
      const selectedText = event.target.options[event.target.selectedIndex].text;
      handleCategoryChange(category, selectedText);
    };

    if (mobileDropdown) {
      mobileDropdown.addEventListener('change', handleDropdownChange);
    }
    
    // Search input event listener
    const searchInput = document.getElementById('main-search');
    const handleSearchInput = (event) => {
      handleSearchChange(event.target.value);
    };

    if (searchInput) {
      searchInput.addEventListener('input', handleSearchInput);
      console.log('🔍 React search and filter system ready');
    } else {
      console.log('❌ Search input not found');
    }
    
    // Initialize with default filter
    filterCards('all', '', true);
    
    // Cleanup event listeners
    return () => {
      sidebarItems.forEach(item => {
        item.removeEventListener('click', handleSidebarClick);
      });
      if (mobileDropdown) {
        mobileDropdown.removeEventListener('change', handleDropdownChange);
      }
      if (searchInput) {
        searchInput.removeEventListener('input', handleSearchInput);
      }
    };
  }, [handleCategoryChange, handleSearchChange, filterCards]);

  // Show More Button Component
  const ShowMoreButton = () => {
    const shouldShow = filteredCards.length > CARDS_PER_PAGE && visibleCards.length < filteredCards.length;
    
    if (!shouldShow) return null;

    return React.createElement('div', {
      className: 'show-more-btn',
      style: { textAlign: 'center', margin: '2rem 0' }
    }, React.createElement('button', {
      onClick: handleLoadMore,
      className: 'show-more-button',
      style: {
        margin: '2rem auto',
        display: 'block',
        padding: '0.75rem 1.5rem',
        background: 'transparent',
        border: '1px solid #ddd',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit',
        color: 'inherit',
      }
    }, 'Load more'));
  };

  // Results Counter Component
  const ResultsCounter = () => {
    React.useEffect(() => {
      console.log('🔍 Results count:', `${visibleCards.length} of ${cards.length} products visible`);
    }, [visibleCards.length, cards.length]);

    return null; // This is just for logging, no visual component needed
  };

  return React.createElement('div', {
    className: 'react-filter-component'
  }, [
    React.createElement(ResultsCounter, { key: 'counter' }),
    React.createElement(ShowMoreButton, { key: 'button' })
  ]);
};

console.log('🔍 React Filter Component loader initialized');

// Function to initialize the filter component
function initializeReactFilter() {
  console.log('🔍 Attempting to initialize React Filter Component');
  
  // Check if React is available
  if (!React || !ReactDOM) {
    console.error('❌ React or ReactDOM not available. Falling back to vanilla JS.');
    // Try vanilla fallback
    if (window.initVanillaFilter) {
      window.initVanillaFilter();
    } else {
      console.error('❌ No fallback filter available');
    }
    return;
  }
  
  // Look for a container where we can mount our component
  let filterContainer = document.getElementById('react-filter-container');
  
  if (!filterContainer) {
    // Create a container element and append it to the main body
    const mainBody = document.querySelector('.td-main-body') || document.body;
    if (mainBody) {
      filterContainer = document.createElement('div');
      filterContainer.id = 'react-filter-container';
      filterContainer.style.display = 'none'; // Hidden since we're just managing logic
      mainBody.appendChild(filterContainer);
      console.log('🔍 Created filter container element');
    } else {
      console.log('❌ Could not find main body to attach filter container');
      return;
    }
  }

  // Render the React component
  try {
    ReactDOM.render(
      React.createElement(FilterComponent),
      filterContainer
    );
    console.log('✅ React Filter Component successfully mounted');
  } catch (error) {
    console.error('❌ Error mounting React Filter Component:', error);
  }
}

// Initialize when DOM is ready
function waitForDOM() {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // DOM is ready, but let's wait a bit for Fern to finish its initialization
    setTimeout(initializeReactFilter, 100);
  } else {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initializeReactFilter, 100);
    });
  }
}

// Also try to re-initialize on navigation changes (for SPA behavior)
function observeNavigation() {
  // Watch for URL changes (for client-side navigation)
  let currentUrl = window.location.href;
  
  const observer = new MutationObserver(() => {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href;
      console.log('🔍 Navigation detected, re-initializing filter');
      setTimeout(initializeReactFilter, 200);
    }
  });
  
  // Observe changes to the document body
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Start initialization
waitForDOM();
observeNavigation();

// Export for manual initialization if needed
window.initializeReactFilter = initializeReactFilter;

// Vanilla JavaScript fallback for filter functionality
// This will run if React is not available

console.log('🔍 Vanilla JS Filter fallback loaded');

function initVanillaFilter() {
  console.log('🔍 Initializing vanilla filter system');
  
  // Pagination settings
  const CARDS_PER_PAGE = 8;
  let currentCardsShown = CARDS_PER_PAGE;
  let activeCategory = 'all';
  let searchTerm = '';
  let allCards = [];
  let filteredCards = [];

  // Get cards from DOM
  function getCardsFromDOM() {
    const cardElements = document.querySelectorAll('.filter-card');
    return Array.from(cardElements).map((card, index) => {
      const filterDataEl = card.querySelector('.filter-data');
      return {
        element: card,
        index,
        category: filterDataEl ? filterDataEl.dataset.category : '',
        tags: filterDataEl ? filterDataEl.dataset.tags || '' : '',
        text: card.textContent.toLowerCase(),
      };
    });
  }

  // Filter cards
  function filterCards(category, search, resetPagination = false) {
    console.log(`🔍 Filtering: category=${category}, search="${search}"`);
    
    if (resetPagination) {
      currentCardsShown = CARDS_PER_PAGE;
    }

    // Re-get cards in case DOM changed
    allCards = getCardsFromDOM();

    // Filter matching cards
    filteredCards = allCards.filter(card => {
      const categoryMatch = category === 'all' || card.category === category;
      const searchMatch = !search || 
        card.text.includes(search.toLowerCase()) ||
        card.tags.toLowerCase().includes(search.toLowerCase());
      
      return categoryMatch && searchMatch;
    });
    
    // Update visible cards based on pagination
    const cardsToShow = Math.min(currentCardsShown, filteredCards.length);
    const cardsToDisplay = filteredCards.slice(0, cardsToShow);

    // Update DOM visibility
    allCards.forEach(card => {
      const shouldShow = cardsToDisplay.some(visibleCard => visibleCard.element === card.element);
      if (shouldShow) {
        card.element.classList.remove('hidden');
        card.element.style.display = '';
      } else {
        card.element.classList.add('hidden');
        card.element.style.display = 'none';
      }
    });

    // Update or create "Load more" button
    updateLoadMoreButton();

    console.log(`🔍 Showing ${cardsToDisplay.length} of ${filteredCards.length} matching products`);
  }

  // Handle category change
  function handleCategoryChange(category, categoryText) {
    activeCategory = category;
    
    // Update sidebar active state
    const sidebarItems = document.querySelectorAll('.td-sidebar-item');
    sidebarItems.forEach(item => {
      item.classList.remove('td-active');
      if (item.dataset.category === category) {
        item.classList.add('td-active');
      }
    });
    
    // Update header
    const mainHeader = document.querySelector('.td-main-hdr');
    if (mainHeader) {
      mainHeader.textContent = categoryText;
    }
    
    // Update mobile dropdown
    const mobileDropdown = document.getElementById('mx-filter-dropdown');
    if (mobileDropdown) {
      mobileDropdown.value = category;
    }
    
    filterCards(category, searchTerm, true);
  }

  // Handle search change
  function handleSearchChange(search) {
    searchTerm = search;
    filterCards(activeCategory, search, true);
  }

  // Handle load more
  function handleLoadMore() {
    currentCardsShown += CARDS_PER_PAGE;
    
    const cardsToShow = Math.min(currentCardsShown, filteredCards.length);
    const cardsToDisplay = filteredCards.slice(0, cardsToShow);
    
    // Update DOM visibility
    allCards.forEach(card => {
      const shouldShow = cardsToDisplay.some(visibleCard => visibleCard.element === card.element);
      if (shouldShow) {
        card.element.classList.remove('hidden');
        card.element.style.display = '';
      } else {
        card.element.classList.add('hidden');
        card.element.style.display = 'none';
      }
    });

    updateLoadMoreButton();
  }

  // Update or create load more button
  function updateLoadMoreButton() {
    const shouldShow = filteredCards.length > CARDS_PER_PAGE && currentCardsShown < filteredCards.length;
    
    let loadMoreContainer = document.getElementById('vanilla-load-more-container');
    
    if (shouldShow) {
      if (!loadMoreContainer) {
        loadMoreContainer = document.createElement('div');
        loadMoreContainer.id = 'vanilla-load-more-container';
        loadMoreContainer.className = 'show-more-btn';
        loadMoreContainer.style.textAlign = 'center';
        loadMoreContainer.style.margin = '2rem 0';
        
        const button = document.createElement('button');
        button.className = 'show-more-button';
        button.textContent = 'Load more';
        button.style.margin = '2rem auto';
        button.style.display = 'block';
        button.style.padding = '0.75rem 1.5rem';
        button.style.background = 'transparent';
        button.style.border = '1px solid #ddd';
        button.style.borderRadius = '6px';
        button.style.cursor = 'pointer';
        button.style.fontSize = '1rem';
        button.style.transition = 'all 0.2s ease';
        button.style.fontFamily = 'inherit';
        button.style.color = 'inherit';
        
        button.addEventListener('click', handleLoadMore);
        loadMoreContainer.appendChild(button);
        
        // Find a good place to insert the button
        const mainBody = document.querySelector('.td-main-body') || document.body;
        mainBody.appendChild(loadMoreContainer);
      }
    } else if (loadMoreContainer) {
      loadMoreContainer.remove();
    }
  }

  // Initialize event listeners
  function initializeEventListeners() {
    // Sidebar event listeners
    const sidebarItems = document.querySelectorAll('.td-sidebar-item');
    sidebarItems.forEach(item => {
      item.addEventListener('click', (event) => {
        const category = event.currentTarget.dataset.category;
        const categoryText = event.currentTarget.querySelector('span').textContent;
        handleCategoryChange(category, categoryText);
      });
    });
    
    // Mobile dropdown event listener
    const mobileDropdown = document.getElementById('mx-filter-dropdown');
    if (mobileDropdown) {
      mobileDropdown.addEventListener('change', (event) => {
        const category = event.target.value;
        const selectedText = event.target.options[event.target.selectedIndex].text;
        handleCategoryChange(category, selectedText);
      });
    }
    
    // Search input event listener
    const searchInput = document.getElementById('main-search');
    if (searchInput) {
      searchInput.addEventListener('input', (event) => {
        handleSearchChange(event.target.value);
      });
      console.log('🔍 Vanilla search and filter system ready');
    } else {
      console.log('❌ Search input not found');
    }
    
    // Initialize with default filter
    filterCards('all', '', true);
  }

  // Initialize
  initializeEventListeners();
}

// Export for manual initialization if needed
window.initVanillaFilter = initVanillaFilter; 