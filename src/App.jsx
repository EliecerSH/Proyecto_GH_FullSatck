import { useState } from 'react';
import './App.css'
import Apart_info from './components/Apart_info'
import Apart_app from './components/Apart_app';
import Notas from './components/Notas';
import { Container } from 'postcss';
import logopng from './assets/cute.webp'
import Apli_calculo from './components/Aplicaciones/Calculo/Apli_calculo';

function App() {

  return (
      <> 
      <div className='container2'>
      <img src={logopng} alt="" width="5%" height="5%"/>
      <h1>Kouritsu</h1>
      </div>
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