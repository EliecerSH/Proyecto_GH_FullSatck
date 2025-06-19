import React, { useState, useEffect } from 'react';
import '../styles/PomodoroApp.css';

const PomodoroApp = ({ setActiveView, pomodoroState, setPomodoroState }) => {
  const [timeLeft, setTimeLeft] = useState(pomodoroState.timeLeft || 25 * 60);
  const [isActive, setIsActive] = useState(pomodoroState.running || false);
  const [mode, setMode] = useState(pomodoroState.mode || 'work');
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/images/background-pomodoro-4k.jpg';
    img.onload = () => setBgLoaded(true);
  }, []);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      const nextMode = mode === 'work' ? 'break' : 'work';
      const nextTime = nextMode === 'work' ? 25 * 60 : 5 * 60;
      
      setMode(nextMode);
      setTimeLeft(nextTime);
    }

    setPomodoroState({
      running: isActive,
      timeLeft: timeLeft,
      mode: mode
    });

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, setPomodoroState]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    setMode('work');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`pomodoro-view ${mode} ${bgLoaded ? 'bg-loaded' : 'bg-loading'}`}>
      <div className="pomodoro-container">
        <h2 className="pomodoro-mode">
          {mode === 'work' ? 'Tiempo de trabajo' : 'Tiempo de descanso'}
        </h2>
        <h1 className="pomodoro-timer">{formatTime(timeLeft)}</h1>
        
        <div className="pomodoro-controls">
          <button 
            className={`control-btn ${isActive ? 'pause-btn' : 'start-btn'}`}
            onClick={toggleTimer}
          >
            {isActive ? 'Pausar' : 'Iniciar'}
          </button>
          <button className="control-btn reset-btn" onClick={resetTimer}>
            Reiniciar
          </button>
          <button 
            className="control-btn back-btn"
            onClick={() => setActiveView('home')}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroApp;