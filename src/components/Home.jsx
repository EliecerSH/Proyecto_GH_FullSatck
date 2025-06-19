import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = ({ pomodoroState }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateGreeting();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateGreeting = () => {
    const hours = currentTime.getHours();
    setGreeting(
      hours < 12 ? 'Buenos días' :
      hours < 19 ? 'Buenas tardes' : 'Buenas noches'
    );
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="home-container">
      <div className="time-greeting-wrapper">
        <h1 className="current-time">{formatTime(currentTime)}</h1>
        <h2 className="greeting-message">{greeting}</h2>
      </div>
      
      <button 
        className={`action-button ${pomodoroState.running ? 'active' : ''}`}
        onClick={() => navigate('/pomodoro')}
      >
        {pomodoroState.running ? 'Pomodoro en curso ▶' : 'Iniciar Pomodoro'}
      </button>
    </div>
  );
};

export default Home;