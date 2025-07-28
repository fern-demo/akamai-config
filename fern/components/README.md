# React Filter Component

Custom filter component for the Akamai docs site.

## Setup

1. Install dependencies:
```bash
cd fern/components
npm install
```

2. Build the component:
```bash
npm run build
```

## Making Changes

1. Edit `FilterComponent.jsx` for functionality changes
2. Edit `filter.css` for styling changes
3. Run `npm run build` to rebuild
4. Test with `cd .. && fern generate --docs --preview --instance akamai.docs.buildwithfern.com`

## Files

- `FilterComponent.jsx` - Main component code
- `filter.css` - Styles
- `filter-init.js` - Setup code

## Common Changes

**Change number of cards per page:**
```jsx
// In FilterComponent.jsx, line 4
const CARDS_PER_PAGE = 12; // Change from 8
```

**Style the "Load more" button:**
```css
/* In filter.css */
.show-more-button {
  background-color: #007AC5;
  color: white;
}
```

Always run `npm run build` after changes. 