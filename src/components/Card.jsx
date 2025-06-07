import React from 'react'
import '../styles/Content.css'
import '../styles/Notes.css'
import WeatherApp from './WeatherApp'
import AppNotes from './NotesComponent/AppNotes'
import PomodoroApp from './PomodoroApp'


const Card = () => {
  return (
    <div className="cards-container">
        <div className="card"><PomodoroApp/></div>
        <div className="card"><WeatherApp/></div>
        <div className="card"><AppNotes/></div>
    </div>
  );
};

export default Card;