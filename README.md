# IR Search Engine & Document Classification

A React-based web application that provides two main functionalities:

1. **Search Engine**: Search through academic publications from Coventry University's School of Economics, Finance and Accounting
2. **Document Classification**: Classify documents into Business, Health, or Politics categories

## Features

### Search Engine Tab

- Search academic publications with real-time results
- Pagination support for large result sets
- Relevance scoring and metadata display
- Responsive design for all devices

### Document Classification Tab

- Input text documents or sentences for classification
- Real-time classification into three categories: Business, Health, Politics
- Confidence scores display with visual progress bars
- Preprocessed text display
- Error handling and retry functionality

## API Endpoints

### Search Engine

- Uses the existing search API for academic publications

### Document Classification

- **Endpoint**: `POST http://localhost:8787/classify`
- **Request Body**:
  ```json
  {
    "document": "The government announced new economic policies to address climate change and reduce carbon emissions by 2030."
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "predicted_category": "Politics",
    "confidence_scores": {
      "Politics": 0.9688184023321958,
      "Business": 0.024415395025951855,
      "Health": 0.006766202641852269
    },
    "preprocessed_text": "govern announc econom polici address climat chang reduc carbon emiss"
  }
  ```

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run deploy` - Deploys to Cloudflare Pages

## Project Structure

```
src/
├── components/
│   ├── DocumentClassification.tsx    # Document classification component
│   ├── DocumentClassification.css    # Styles for classification
│   ├── PublicationCard.tsx           # Individual publication display
│   ├── SearchBar.tsx                 # Search input component
│   ├── SearchResults.tsx             # Search results display
│   └── TabHeader.tsx                 # Tab navigation component
├── hooks/
│   ├── useClassification.ts          # Classification API hook
│   ├── useSearch.ts                  # Search API hook
│   └── index.ts                      # Hook exports
├── types/
│   └── index.ts                      # TypeScript type definitions
└── App.tsx                           # Main application component
```

## Technologies Used

- React 19.1.1
- TypeScript 4.9.5
- CSS3 with modern styling
- Responsive design principles
- Accessibility features

## Notes

- The document classification API endpoint is currently set to `http://localhost:8787/classify`
- Update the endpoint in `src/hooks/useClassification.ts` when the Workers API is available
- The application includes comprehensive error handling and loading states
- All components are fully responsive and accessible
