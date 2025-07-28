import React, { useState, useEffect, useCallback } from 'react';

const FilterComponent = () => {
  // Pagination settings
  const CARDS_PER_PAGE = 8;
  
  // State management
  const [currentCardsShown, setCurrentCardsShown] = useState(CARDS_PER_PAGE);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);

  // Get cards from DOM
  const getCardsFromDOM = useCallback(() => {
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
  useEffect(() => {
    const cardsData = getCardsFromDOM();
    setCards(cardsData);
  }, [getCardsFromDOM]);

  // Filter cards based on category and search
  const filterCards = useCallback((category, search, resetPagination = false) => {
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
  const handleCategoryChange = useCallback((category, categoryText) => {
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
  const handleSearchChange = useCallback((search) => {
    setSearchTerm(search);
    filterCards(activeCategory, search, true);
  }, [activeCategory, filterCards]);

  // Handle load more
  const handleLoadMore = useCallback(() => {
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
  useEffect(() => {
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

    return (
      <div className="show-more-btn" style={{ textAlign: 'center', margin: '2rem 0' }}>
        <button
          onClick={handleLoadMore}
          className="show-more-button"
          style={{
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
          }}
        >
          Load more
        </button>
      </div>
    );
  };

  // Results Counter Component
  const ResultsCounter = () => {
    useEffect(() => {
      console.log('🔍 Results count:', `${visibleCards.length} of ${cards.length} products visible`);
    }, [visibleCards.length, cards.length]);

    return null; // This is just for logging, no visual component needed
  };

  return (
    <div className="react-filter-component">
      <ResultsCounter />
      <ShowMoreButton />
    </div>
  );
};

export default FilterComponent; 