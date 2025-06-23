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
import EnglishTrainer from './components/EnglishTrainerApp';
import LoginUsers from './components/LoginUsers';
import MenuImg from './components/MenuImg';
import ApliCalculo from './components/ApliCalculo';
import { FaLeaf } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import './App.css';

import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const NavButton = ({ active, path, icon, label }) => {
  return (
    <a href={path} className={`nav-button ${active ? 'active' : ''}`}>
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{label}</span>
    </a>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // estado de carga
  const [backgroundImage, setBackgroundImage] = useState(localStorage.getItem("background") || "");
  const [pomodoroState, setPomodoroState] = useState({
    running: false,
    timeLeft: 25 * 60,
    mode: 'work'
  });

  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.background) {
              setBackgroundImage(data.background);
              localStorage.setItem("background", data.background);
            }
          }
        } catch (error) {
          console.error("Error al cargar fondo de Firestore:", error);
        }
      }

      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChangeBackground = async (imgPath) => {
    setBackgroundImage(imgPath);
    localStorage.setItem("background", imgPath);

    if (user) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          background: imgPath
        }, { merge: true });
      } catch (error) {
        console.error("Error al guardar fondo en Firestore:", error);
      }
    }
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
    {loadingUser ? (
      <div className="loading">Cargando...</div>
    ) : (
      user ? (
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
              <Route path="/calculo" element={<ApliCalculo />} />
            </Routes>

            <div className="img-area">
              <MenuImg onSelect={handleChangeBackground} />
            </div>

            {(location.pathname === '/' ||
              location.pathname === '/pomodoro' ||
              location.pathname === '/focus-mode' ||
              location.pathname === '/calculo') && (
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
      ) : (
        <LoginUsers onLogin={setUser} />
      )
    )}
  </div>
);
};

export default App;
