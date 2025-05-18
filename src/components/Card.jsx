import React from 'react'
import '../styles/Content.css'
import '../styles/Notes.css'
import WeatherApp from './WeatherApp'
import AppNotes from './NotesComponent/AppNotes'


const Card = () => {
  return (
    <div className="cards-container">
        <div className="card"><WeatherApp/></div>
        <div className="card"><AppNotes/></div>
         <div className="card">Card 3 (Derecha - full height)</div>
    </div>
  );
};

export default Card;