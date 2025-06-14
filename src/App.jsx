import React, { useState, useEffect } from "react";
import Sidebar from './components/Sidebar';
import Content from './components/content.jsx';
import './App.css';
import { auth, } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Login_users from "./components/login_users.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <Login_users onLogin={setUser} />
      ) : (
        <>
          <div className="top-bar">
            <h1>Bienvenido, {user.email}</h1>
            <button onClick={logout} className="control-button2">Cerrar sesión</button>
          </div>
          <div className="dashboard">
            <Sidebar />
            <Content />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
