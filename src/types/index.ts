export interface Publication {
  id: string;
  title: string;
  year: number;
  authors: string;
  publication_link: string;
  author_links: string;
  created_at: string;
  updated_at: string;
  relevance_score: number;
}

export interface SearchMetadata {
  total_results: number;
  results_shown: number;
  search_time_ms: number;
  relevance_threshold: number;
}

export interface SearchResponse {
  query: string;
  query_terms: string[];
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
  search_metadata: SearchMetadata;
  publications: Publication[];
}

// Document Classification Types
export interface ClassificationRequest {
  document: string;
}

export interface ClassificationResponse {
  status: string;
  predicted_category: 'Politics' | 'Business' | 'Health';
  confidence_scores: {
    Politics: number;
    Business: number;
    Health: number;
  };
  preprocessed_text: string;
}

export type TabType = 'search' | 'classification';
