import React, { useState } from 'react';
import './styles/EnglishTrainerApp.css';

const EnglishTrainerApp = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="english-trainer-container">
      {visible && (
        <>
          <h1>English Trainer</h1>
          <div className="test-box">
            <p>Componente funcionando correctamente</p>
            <button 
              onClick={() => setVisible(false)}
              className="test-button"
            >
              Ocultar
            </button>
          </div>
        </>
      )}
      {!visible && (
        <button 
          onClick={() => setVisible(true)}
          className="test-button"
        >
          Mostrar
        </button>
      )}
    </div>
  );
};

export default EnglishTrainerApp;