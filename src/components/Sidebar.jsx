import React, { useState } from 'react';
import { HiMenuAlt3, HiOutlineLogout } from 'react-icons/hi';
import { MdTimer, MdHome } from 'react-icons/md';
import { TiWeatherCloudy } from 'react-icons/ti';
import { FaSpotify, FaKeyboard } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/Sidebar.css';

const Sidebar = ({ user, currentPath }) => {
  const [open, setOpen] = useState(true);
  
  const menuItems = [
    { name: "Inicio", link: "/", icon: MdHome },
    { name: "Pomodoro", link: "/pomodoro", icon: MdTimer },
    { name: "Weather", link: "/weather", icon: TiWeatherCloudy },
    { name: "Notes", link: "/notes", icon: FaListCheck },
    { name: "Spotify", link: "/spotify", icon: FaSpotify },
    { name: "Mecanography", link: "/mecanography", icon: FaKeyboard }
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className={`sidebar-container ${open ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <HiMenuAlt3 
          className="menu-icon" 
          onClick={() => setOpen(!open)} 
        />
      </div>
      
      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className={`menu-item-link ${currentPath === item.link ? 'active' : ''}`}
          >
            <div className="menu-item">
              <item.icon className="item-icon" />
              {open && <span className="item-name">{item.name}</span>}
              {!open && (
                <div className="tooltip">{item.name}</div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {}
      <div className="sidebar-footer">
        {open && (
          <div className="user-info">
            <div className="user-avatar">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <p className="user-name">{user.email.split('@')[0]}</p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
        )}
        <button 
          className="logout-button"
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          <HiOutlineLogout className="logout-icon" />
          {open && <span>Cerrar sesión</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;