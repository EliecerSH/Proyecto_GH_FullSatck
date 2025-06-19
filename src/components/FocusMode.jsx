import React from 'react';
import '../styles/FocusMode.css'; 

const FocusMode = ({ pomodoroState }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="focus-mode-container">
      <div className="pomodoro-mini">
        <div className="pomodoro-mini-time">
          {formatTime(pomodoroState.timeLeft)}
        </div>
        <div className="pomodoro-mini-mode">
          {pomodoroState.mode === 'work' ? 'Trabajo' : 'Descanso'}
        </div>
      </div>
    </div>
  );
};

export default FocusMode;