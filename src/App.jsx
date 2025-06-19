import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import PomodoroApp from './components/PomodoroApp';
import FocusMode from './components/FocusMode';
import WeatherApp from './components/WeatherApp';
import AppNotes from './components/NotesComponent/AppNotes';
import SpotifyPlaylistApp from './components/SpotifyPlaylistApp';
import MecanografiaApp from './components/MecanografiaApp';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LoginUsers from './components/LoginUsers';
import MenuImg from './components/MenuImg';
import { FaLeaf } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import './App.css';

const NavButton = ({ active, path, icon, label }) => {
  return (
    <a 
      href={path} 
      className={`nav-button ${active ? 'active' : ''}`}
    >
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{label}</span>
    </a>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [pomodoroState, setPomodoroState] = useState({
    running: false,
    timeLeft: 25 * 60,
    mode: 'work'
  });

  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const [backgroundImage, setBackgroundImage] = useState(
    localStorage.getItem("background") || ""
  );

  const handleChangeBackground = (imgPath) => {
    setBackgroundImage(imgPath);
    localStorage.setItem("background", imgPath);
  };

  return (
    <div 
      className="app-container"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      {!user ? (
        <LoginUsers onLogin={setUser} />
      ) : (
        <div className="main-layout">
          <Sidebar user={user} currentPath={location.pathname} />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Home pomodoroState={pomodoroState} />} />
              <Route path="/pomodoro" element={
                <PomodoroApp 
                  pomodoroState={pomodoroState}
                  setPomodoroState={setPomodoroState}
                />
              } />
              <Route path="/focus-mode" element={<FocusMode pomodoroState={pomodoroState} />} />
              <Route path="/weather" element={<WeatherApp />} />
              <Route path="/notes" element={<AppNotes />} />
              <Route path="/spotify" element={<SpotifyPlaylistApp />} />
              <Route path="/mecanography" element={<MecanografiaApp />} />
            </Routes>
            <div className="img-area">
              <MenuImg onSelect={handleChangeBackground}/>
            </div>

            {(location.pathname === '/' || 
              location.pathname === '/pomodoro' || 
              location.pathname === '/focus-mode') && (
              <div className="main-menu">
                <NavButton 
                  active={location.pathname === '/'}
                  path="/"
                  icon={<IoHomeSharp />}
                  label="Inicio"
                />
                <NavButton 
                  active={location.pathname === '/pomodoro'}
                  path="/pomodoro"
                  icon={<IoIosTimer />}
                  label="Pomodoro"
                />
                <NavButton 
                  active={location.pathname === '/focus-mode'}
                  path="/focus-mode"
                  icon={<FaLeaf />}
                  label="Enfoque"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
