import React from 'react';
import { Publication } from '../types';
import './PublicationCard.css';

interface PublicationCardProps {
  publication: Publication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  const formatAuthors = (authors: string) => {
    if (!authors) return 'Unknown Authors';

    // Clean up the authors string - remove title if it's duplicated
    let cleanAuthors = authors;
    if (authors.includes(publication.title)) {
      cleanAuthors = authors.replace(publication.title, '').trim();
    }

    // If it's still empty or just whitespace, return unknown
    if (!cleanAuthors || cleanAuthors.trim() === '') {
      return 'Unknown Authors';
    }

    return cleanAuthors;
  };

  const truncateAbstract = (abstract: string, maxLines: number = 3) => {
    if (!abstract) return '';

    // Split into sentences and take first few sentences
    const sentences = abstract.split('. ').slice(0, maxLines);
    const truncated = sentences.join('. ');

    // Add ellipsis if we truncated
    if (sentences.length < abstract.split('. ').length) {
      return truncated + '...';
    }

    return truncated;
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 8) return '#34a853'; // Green for high relevance
    if (score >= 6) return '#fbbc04'; // Yellow for medium relevance
    return '#ea4335'; // Red for low relevance
  };

  return (
    <div className='publication-card'>
      <div className='publication-header'>
        <h3 className='publication-title'>
          <a
            href={publication.publication_link}
            target='_blank'
            rel='noopener noreferrer'
            className='publication-link'
          >
            {publication.title}
          </a>
        </h3>
        <div className='publication-header-right'>
          <div
            className='relevance-score'
            style={{ color: getRelevanceColor(publication.relevance_score) }}
          >
            {publication.relevance_score.toFixed(1)}
          </div>
          <div className='year'>{publication.year}</div>
        </div>
      </div>

      <div className='publication-meta'>
        <div className='authors'>{formatAuthors(publication.authors)}</div>
      </div>

      {publication.abstract && (
        <div className='publication-abstract'>
          {truncateAbstract(publication.abstract)}
        </div>
      )}

      <div className='publication-footer'>
        <div className='publication-url'>{publication.publication_link}</div>
      </div>
    </div>
  );
};

export default PublicationCard;
