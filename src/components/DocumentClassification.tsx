import React, { useState } from 'react';
import { useClassification } from '../hooks';
import './DocumentClassification.css';

const DocumentClassification: React.FC = () => {
  const [document, setDocument] = useState('');
  const {
    classificationResponse,
    isClassifying,
    error,
    classifyDocument,
    resetClassification,
  } = useClassification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    classifyDocument(document);
  };

  const handleReset = () => {
    setDocument('');
    resetClassification();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Politics':
        return '#dc3545';
      case 'Business':
        return '#28a745';
      case 'Health':
        return '#007bff';
      default:
        return '#6c757d';
    }
  };

  const formatConfidence = (score: number) => {
    return (score * 100).toFixed(1);
  };

  return (
    <div className='document-classification'>
      <div className='classification-container'>
        <div className='classification-header'>
          <h2>Document Classification</h2>
          <p>
            Enter a document or sentence to classify it as Business, Health, or
            Politics
          </p>
        </div>

        <form onSubmit={handleSubmit} className='classification-form'>
          <div className='form-group'>
            <label htmlFor='document' className='form-label'>
              Document Text
            </label>
            <textarea
              id='document'
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              placeholder='Enter your document text here...'
              className='document-input'
              rows={6}
              disabled={isClassifying}
              required
            />
          </div>

          <div className='form-actions'>
            <button
              type='submit'
              className='classify-button'
              disabled={isClassifying || !document.trim()}
            >
              {isClassifying ? 'Classifying...' : 'Classify Document'}
            </button>
            <button
              type='button'
              onClick={handleReset}
              className='reset-button'
              disabled={isClassifying}
            >
              Reset
            </button>
          </div>
        </form>

        {error && (
          <div className='error-message'>
            <p>Error: {error}</p>
            <button onClick={handleReset} className='retry-button'>
              Try Again
            </button>
          </div>
        )}

        {classificationResponse && (
          <div className='classification-results'>
            <h3>Classification Results</h3>

            <div className='prediction-card'>
              <div className='prediction-header'>
                <span className='prediction-label'>Predicted Category:</span>
                <span
                  className='prediction-category'
                  style={{
                    color: getCategoryColor(
                      classificationResponse.predicted_category
                    ),
                  }}
                >
                  {classificationResponse.predicted_category}
                </span>
              </div>
            </div>

            <div className='confidence-scores'>
              <h4>Confidence Scores</h4>
              <div className='score-bars'>
                {Object.entries(classificationResponse.confidence_scores).map(
                  ([category, score]) => (
                    <div key={category} className='score-bar-container'>
                      <div className='score-label'>
                        <span className='category-name'>{category}</span>
                        <span className='score-percentage'>
                          {formatConfidence(score)}%
                        </span>
                      </div>
                      <div className='score-bar'>
                        <div
                          className='score-fill'
                          style={{
                            width: `${score * 100}%`,
                            backgroundColor: getCategoryColor(category),
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className='preprocessed-text'>
              <h4>Preprocessed Text</h4>
              <p className='preprocessed-content'>
                {classificationResponse.preprocessed_text}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentClassification;
