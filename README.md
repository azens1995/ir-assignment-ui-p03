# Scholar Search - Academic Publication Search Engine

A Google Scholar-like search engine built with React and TypeScript that allows users to search academic publications through a clean, modern interface.

## Features

- **Google-like Search Interface**: Clean, modern search bar with search suggestions
- **Real-time Search**: Instant search results from the academic publications API
- **Relevance Scoring**: Each result displays a relevance score with color-coded indicators
- **Pagination**: Google-style pagination with Previous/Next buttons and page numbers
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations and user feedback
- **Accessibility**: Keyboard navigation and screen reader support

## Search Results Display

Each publication result shows:

- **Title**: Clickable link to the publication
- **Authors**: Formatted author names
- **Year**: Publication year
- **Relevance Score**: Color-coded score (Green: High, Yellow: Medium, Red: Low)
- **Publication URL**: Direct link to the source
- **Page Number**: If available

## API Integration

The application integrates with the academic publications API:

- **Endpoint**: `https://api.irapi.workers.dev/api/publications/search`
- **Query Parameter**: `q` (search term)
- **Pagination**: `offset` parameter for pagination
- **Response**: JSON with publications array and metadata

## Technology Stack

- **React 19**: Latest React with hooks and functional components
- **TypeScript**: Type-safe development
- **CSS3**: Modern styling with flexbox and grid
- **Fetch API**: Native browser API for HTTP requests

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ui
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## Project Structure

```
src/
├── components/
│   ├── SearchBar.tsx          # Main search input component
│   ├── SearchBar.css          # Search bar styles
│   ├── SearchResults.tsx      # Results display and pagination
│   ├── SearchResults.css      # Results page styles
│   ├── PublicationCard.tsx    # Individual publication display
│   └── PublicationCard.css    # Publication card styles
├── types/
│   └── index.ts              # TypeScript interfaces
├── App.tsx                   # Main application component
├── App.css                   # Global application styles
└── index.tsx                 # Application entry point
```

## Usage

1. **Search**: Enter your search query in the search bar and press Enter or click Search
2. **Browse Results**: View publication results with relevance scores
3. **Navigate**: Use pagination controls to browse through all results
4. **Access Publications**: Click on publication titles to open the source links

## Features in Detail

### Search Functionality

- Real-time search with API integration
- Query validation and error handling
- Loading states during search operations

### Pagination

- Google-style pagination with ellipsis
- Previous/Next navigation
- Page number selection
- Responsive pagination controls

### Relevance Scoring

- Visual indicators for relevance scores
- Color-coded scoring system:
  - Green (8.0+): High relevance
  - Yellow (6.0-7.9): Medium relevance
  - Red (<6.0): Low relevance

### Responsive Design

- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by Google Scholar's clean interface
- Built with Create React App
- Uses modern web standards and best practices
