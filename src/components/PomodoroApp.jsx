import React, { useState, useEffect } from 'react';
import '../styles/PomodoroApp.css';

const PomodoroApp = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');
            audio.play();
            
            if (!isBreak) {
              setCycles(prev => prev + 1);
              setIsBreak(true);
              setMinutes(cycles % 3 === 2 ? 15 : 5); 
            } else {
              setIsBreak(false);
              setMinutes(25);
            }
            setSeconds(0);
            setIsActive(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, isBreak, cycles]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return (
    <div className={`pomodoro-container ${isBreak ? 'break-time' : 'work-time'}`}>
        <h1 className="title-pomodoro">Pomodoro Timer</h1>
      <h3>{isBreak ? 'Ya estamos en descanso!' : '¡Mantente concentrado!'}</h3>

      <div className="timer-display">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <div className="controls">
        <button onClick={toggleTimer} className="control-button">
          {isActive ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={resetTimer} className="control-button">
          reiniciar
        </button>
      </div>
      <h4 className="cycles">Ciclos completados: {cycles}</h4>
      <p className="message">
        {isBreak 
          ? 'toma un descanso. estirate y ve por una energetica o un cafe.' 
          : 'Enfócate en tu tarea. evita distracciones.'}
      </p>
    </div>
  );
};

export default PomodoroApp;