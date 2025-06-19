import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import "../styles/LoginUsers.css";

const Login_users = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); 

  const handleSubmit = async () => {
    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin(userCredential.user);
    } catch (err) {
      alert("Error: " + err.message);
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegistering ? "Crear cuenta" : "Iniciar Sesión"}</h2>
        <input
          className="login-input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={handleSubmit}>
          {isRegistering ? "Registrarse" : "Entrar"}
        </button>

        <p style={{ marginTop: "15px" }}>
          {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button
            className="toggle-button"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login_users;
