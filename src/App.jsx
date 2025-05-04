import { useState } from 'react';
import './App.css'
import Apart_info from './components/Apart_info'
import Apart_app from './components/Apart_app';
import Notas from './components/Notas';
import { Container } from 'postcss';

function App() {

  return (
      <>
        <h1>KURITSU</h1>
        <div className='container'>
          <div className='card'>
            <Apart_app></Apart_app>
            {/* Aquí puedes poner el clima, calendario, etc. */}
          </div>
          <div className='card'>
            <Notas></Notas>
            {/* Aquí puedes poner botones, links, etc. */}
          </div>
          <div className='card'>
            <Apart_info></Apart_info>
            {/* Aquí puedes poner botones, links, etc. */}
          </div>
        </div>
      </>
    );
}

export default App