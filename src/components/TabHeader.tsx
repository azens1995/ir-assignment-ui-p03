import React from 'react';
import { TabType } from '../types';
import './TabHeader.css';

interface TabHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className='tab-header'>
      <div className='tab-container'>
        <button
          className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => onTabChange('search')}
        >
          <span className='tab-icon'>🔍</span>
          <span className='tab-label'>Search Engine</span>
        </button>
        <button
          className={`tab-button ${
            activeTab === 'classification' ? 'active' : ''
          }`}
          onClick={() => onTabChange('classification')}
        >
          <span className='tab-icon'>📄</span>
          <span className='tab-label'>Document Classification</span>
        </button>
      </div>
    </div>
  );
};

export default TabHeader;
