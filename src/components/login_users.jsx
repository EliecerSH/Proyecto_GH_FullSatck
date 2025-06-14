// src/components/login_users.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/login_users.css"; // Asegúrate de crear este archivo

const Login_users = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onLogin(userCredential.user);
    } catch (err) {
      alert("Correo o contraseña incorrectos");
      console.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <input
          className="login-input"
          type="email"
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={login}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login_users;

