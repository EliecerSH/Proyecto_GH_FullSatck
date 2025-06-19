import React from 'react'
import '../styles/Content.css'
import '../styles/Notes.css'
import WeatherApp from './WeatherApp'
import AppNotes from './NotesComponent/AppNotes'
import PomodoroApp from './PomodoroApp'
import MecanografiaApp from './MecanografiaApp'
import SpotifyPlaylist from './SpotifyPlaylistApp'

const Card = () => {
  return (
    <div className="cards-container">
        <div className="card"><PomodoroApp/></div>
        <div className="card"><WeatherApp/></div>
        <div className="card"><AppNotes/></div>
        <div className="card"><MecanografiaApp/></div>
        <div className="card"><SpotifyPlaylist playlistId="37i9dQZF1DXcBWIGoYBM5M"/></div>
    </div>
  );
};

export default Card;