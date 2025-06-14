
import Sidebar from './components/Sidebar';
import Content from './components/Content.jsx';
import './App.css';
import { auth, } from "./firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Login_users from "./components/LoginUsers.jsx";

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
            <h3>Bienvenido, {user.email}</h3>
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
