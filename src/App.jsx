import { useState } from 'react';
import './App.css'
import Apart_info from './components/Apart_info'
import Apart_app from './components/Apart_app';
import Notas from './components/Notas';
import { Container } from 'postcss';
import logopng from './assets/cute.webp'


function App() {

  return (
      <> 
    <header> 
      <div className='logo'>
       <img src={logopng}/>
       <h1>Kouritsu</h1> 
      </div> 
      <nav>
        <a href="" className="nav-link">Apps</a>
        <a href="" className="nav-link">Pomodoro</a>
        <a href="" className="nav-link">Widgets</a>
      </nav>
    </header>
        <div className='container-cards'>
          <div className='card'>
            <Apart_app></Apart_app>
          </div> 
          <div className='card'>
            <Notas></Notas>
          </div> 
          <div className='card'>
            <Apart_info></Apart_info>
          </div> 
        </div> 
 
      </>
    );
}

export default App