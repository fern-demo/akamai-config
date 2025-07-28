import React from 'react';
import ReactDOM from 'react-dom';
import FilterComponent from './FilterComponent.jsx';

// Wait for DOM to be ready
function mountFilterComponent() {
  const filterContainer = document.getElementById('fern-filter-component');
  if (filterContainer) {
    ReactDOM.render(React.createElement(FilterComponent), filterContainer);
  }
}

// Try to mount immediately, and also on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountFilterComponent);
} else {
  mountFilterComponent();
}

// Also mount on navigation changes (for SPA behavior)
if (typeof window !== 'undefined') {
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function() {
    originalPushState.apply(history, arguments);
    setTimeout(mountFilterComponent, 100);
  };
  
  history.replaceState = function() {
    originalReplaceState.apply(history, arguments);
    setTimeout(mountFilterComponent, 100);
  };
  
  window.addEventListener('popstate', () => {
    setTimeout(mountFilterComponent, 100);
  });
} 