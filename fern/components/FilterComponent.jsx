import React, { useState, useEffect, useMemo } from 'react';

const FilterComponent = () => {
  // Pagination settings
  const CARDS_PER_PAGE = 8;
  
  // Product data - this replaces the DOM scraping approach
  const productData = [
    {
      id: 'edgeworkers',
      title: 'EdgeWorkers',
      description: 'Execute JavaScript at the edge to customize and optimize your applications.',
      href: '/edge-workers',
      category: 'compute',
      tags: 'edge javascript workers compute',
      buttons: [
        { text: 'API', href: '/edge-workers/api', outlined: true },
        { text: 'Guide', href: '/edge-workers', outlined: true }
      ]
    },
    {
      id: 'sample-spec',
      title: 'Sample Spec',
      description: 'Sample Spec documentation and API reference.',
      href: '/sample-spec',
      category: 'tools',
      tags: 'tools api',
      buttons: [
        { text: 'API', href: '/sample-spec/api', outlined: true },
        { text: 'Guide', href: '/sample-spec', outlined: true }
      ]
    },
    {
      id: 'demo-apis',
      title: 'Demo APIs',
      description: 'Collection of demo APIs showcasing different features, specifications, and implementation examples.',
      href: '/demo-apis',
      category: 'tools',
      tags: 'tools api demo examples rest-api',
      buttons: [
        { text: 'API', href: '/demo-apis/api', outlined: true },
        { text: 'Guide', href: '/demo-apis', outlined: true }
      ]
    }
    // Add more products here as needed
  ];

  // Categories for the sidebar
  const categories = [
    { id: 'all', name: 'All products & services', icon: '›' },
    { id: 'compute', name: 'Cloud Computing', icon: '›' },
    { id: 'security', name: 'Security', icon: '›' },
    { id: 'networking', name: 'Cloud networking', icon: '›' },
    { id: 'tools', name: 'Cross-product tools', icon: '›' }
  ];
  
  // State management
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered products based on category and search
  const filteredProducts = useMemo(() => {
    return productData.filter(product => {
      const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
      const searchMatch = !searchTerm || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.toLowerCase().includes(searchTerm.toLowerCase());
      
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchTerm]);

  // Paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * CARDS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  // Handlers
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Get current category name for header
  const currentCategoryName = categories.find(cat => cat.id === activeCategory)?.name || 'All products & services';

  // Show load more button
  const showLoadMore = paginatedProducts.length < filteredProducts.length;

  return (
    <div className="td-filter">
      <div className="td-filter-body">
        {/* Sidebar */}
        <div className="td-filter-sidebar">
          {categories.map(category => (
            <div
              key={category.id}
              className={`td-sidebar-item ${category.id === activeCategory ? 'td-active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCategoryChange(category.id);
                }
              }}
            >
              <span>{category.name}</span>
              <span className="td-icon td-icon-right">{category.icon}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="td-filter-main">
          <div className="td-fltr-hdr">
            <div className="td-main-hdr">{currentCategoryName}</div>
            
            {/* Mobile dropdown */}
            <div className="td-mx-filter">
              <select 
                value={activeCategory} 
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Search */}
            <div className="td-main-search">
              <input 
                type="search" 
                placeholder='Filter by product (for example, "edgeworkers" or "API")' 
                value={searchTerm}
                onChange={handleSearchChange}
                autoComplete="off"
                className="search-input-with-italic-placeholder"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="td-main-body">
            <div className="td-filter-cards" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {paginatedProducts.map(product => (
                <div key={product.id} className="filter-card fern-card" style={{
                  padding: '2rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s ease',
                  minHeight: '180px'
                }}>
                  <h3 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600', 
                    marginBottom: '0.75rem',
                    color: 'inherit',
                    lineHeight: '1.4'
                  }}>
                    <a href={product.href} style={{ 
                      textDecoration: 'none', 
                      color: 'inherit'
                    }}>
                      {product.title}
                    </a>
                  </h3>
                  
                  <p style={{ 
                    color: '#6b7280', 
                    marginBottom: '1.5rem',
                    lineHeight: '1.5'
                  }}>
                    {product.description}
                  </p>
                  
                  <div className="card-footer-tags">
                                         {product.buttons.map((button, index) => (
                       <a
                         key={index}
                         href={button.href}
                         className="fern-button"
                         data-outlined={button.outlined}
                         style={{
                           display: 'inline-flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           padding: '0.375rem 0.875rem',
                           backgroundColor: '#f3f4f6',
                           color: '#374151',
                           fontSize: '0.75rem',
                           fontWeight: '500',
                           borderRadius: '9999px',
                           border: 'none',
                           textDecoration: 'none',
                           transition: 'background-color 0.2s ease',
                           margin: '0 0.5rem 0.5rem 0',
                           lineHeight: '1.2',
                           textAlign: 'center',
                           minHeight: '32px'
                         }}
                       >
                         {button.text}
                       </a>
                     ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {showLoadMore && (
              <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                <button
                  onClick={handleLoadMore}
                  className="show-more-button"
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'transparent',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                    color: 'inherit'
                  }}
                >
                  Load more ({filteredProducts.length - paginatedProducts.length} remaining)
                </button>
              </div>
            )}

            {/* No results message */}
            {filteredProducts.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem', 
                color: '#6b7280' 
              }}>
                <p>No products found matching your criteria.</p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    style={{
                      marginTop: '1rem',
                      padding: '0.5rem 1rem',
                      background: 'transparent',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: 'inherit'
                    }}
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}

            {/* Results counter for debugging */}
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              textAlign: 'center',
              marginTop: '1rem'
            }}>
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent; 