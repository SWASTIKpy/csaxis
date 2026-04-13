import React from 'react';
import { ArrowBigUp, ArrowBigDown, ExternalLink, MessageSquare } from 'lucide-react';
import { getYoutubeThumbnail } from '../utils/youtubeViewer';
import './ResourceCard.css';

const ResourceCard = ({ resource, viewMode, onUpvote, onDownvote }) => {
  const thumbnailUrl = resource.thumbnail || getYoutubeThumbnail(resource.url);

  return (
    <div className={`resource-card glass-panel ${viewMode === 'grid' ? 'grid-mode' : ''}`}>
      {/* Voting Sidebar */}
      <div className="vote-sidebar">
        <button 
          className={`btn vote-btn ${resource.userVote === 1 ? 'upvoted' : ''}`}
          onClick={() => onUpvote(resource.id)}
        >
          <ArrowBigUp size={24} />
        </button>
        <span className={`vote-count ${resource.userVote === 1 ? 'upvoted' : resource.userVote === -1 ? 'downvoted' : ''}`}>
          {resource.votes}
        </span>
        <button 
          className={`btn vote-btn ${resource.userVote === -1 ? 'downvoted' : ''}`}
          onClick={() => onDownvote(resource.id)}
        >
          <ArrowBigDown size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="resource-content">
        <div className="resource-meta">
          <span className="resource-tag text-accent">{resource.tag}</span>
          <span className="resource-time">• {resource.timeAgo}</span>
        </div>
        
        <h3 className="resource-title">{resource.title}</h3>

        {/* Thumbnail Preview if applicable */}
        {thumbnailUrl && (
          <div className="resource-thumbnail">
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <img src={thumbnailUrl} alt="Resource thumbnail" />
            </a>
          </div>
        )}

        <div className="resource-actions">
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="action-btn">
            <ExternalLink size={16} /> Open Resource
          </a>
          <button className="btn action-btn">
            <MessageSquare size={16} /> {resource.comments} Comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
