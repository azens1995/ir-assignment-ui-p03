import { useState } from 'react';
import { ClassificationRequest, ClassificationResponse } from '../types';

export const useClassification = () => {
  const [classificationResponse, setClassificationResponse] =
    useState<ClassificationResponse | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classifyDocument = async (document: string) => {
    if (!document.trim()) {
      setError('Please enter a document to classify');
      return;
    }

    setIsClassifying(true);
    setError(null);
    setClassificationResponse(null);

    try {
      const request: ClassificationRequest = { document: document.trim() };

      const response = await fetch(
        'https://ir-doc-classification.irapi.workers.dev/classify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ClassificationResponse = await response.json();
      setClassificationResponse(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred during classification'
      );
    } finally {
      setIsClassifying(false);
    }
  };

  const resetClassification = () => {
    setClassificationResponse(null);
    setError(null);
    setIsClassifying(false);
  };

  return {
    classificationResponse,
    isClassifying,
    error,
    classifyDocument,
    resetClassification,
  };
};
