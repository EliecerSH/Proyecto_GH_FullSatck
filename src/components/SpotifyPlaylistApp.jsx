import React from 'react';
import { FaSpotify } from 'react-icons/fa';
import '../styles/SpotifyPlaylist.css';

const SpotifyPlaylist = ({ playlistId }) => {
  return (
    <div className="spotify-playlist-container">
      <div className="spotify-header">
        <FaSpotify className="spotify-icon" />
        <h3>Playlist Focus</h3>
      </div>
      
      <div className="playlist-embed">
        <iframe
          title="Spotify Playlist"
          src={`https://open.spotify.com/embed/playlist/5vVSfOsF8YRueAI1dOI0Lh`}
          width="100%"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
      </div>
      
      <div className="spotify-footer">
        <p>Reproduciendo desde Spotify</p>
      </div>
    </div>
  );
};

export default SpotifyPlaylist;