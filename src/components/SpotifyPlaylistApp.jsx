import React, { useState } from 'react';
import { FaSpotify, FaExpand, FaCompress } from 'react-icons/fa';
import '../styles/SpotifyPlaylist.css';

const SpotifyPlaylistApp = ({ playlistId = "5vVSfOsF8YRueAI1dOI0Lh" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`spotify-playlist-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="spotify-header">
        <div className="spotify-title">
          <FaSpotify className="spotify-icon" />
          <h3>Playlist Focus</h3>
        </div>
        <button 
          className="expand-button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Minimizar" : "Expandir"}
        >
          {isExpanded ? <FaCompress /> : <FaExpand />}
        </button>
      </div>
      
      <div 
        className="playlist-embed"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <iframe
          title="Spotify Playlist"
          src={`https://open.spotify.com/embed/playlist/${playlistId}`}
          width="100%"
          height={isExpanded ? "500" : "380"}
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          className={isHovered ? "hovered" : ""}
        />
        {isHovered && (
          <div className="playlist-overlay">
            <span>Reproducir en Spotify</span>
          </div>
        )}
      </div>
      
      <div className="spotify-footer">
        <p>Reproduciendo desde Spotify</p>
        <div className="spotify-branding">
          <span>Powered by</span>
          <FaSpotify className="spotify-logo" />
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlaylistApp;