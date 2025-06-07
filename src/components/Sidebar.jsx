import React, { useState, useEffect } from 'react';
import { TbAppleFilled } from "react-icons/tb";
import { TiWeatherCloudy } from "react-icons/ti";
import { MdTimer } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import '../styles/sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar cambio de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    handleResize(); // Verificar al montar
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
      <div className='sidebar-content'>
        <div className='logo'>
          <TbAppleFilled className='logo-icon'/>
          {!isCollapsed && <h2>Kouritsu</h2>}
        </div>

        <div className='menu-list'>
          <a href="#" className="item">
            <MdTimer className='icon'/>
            {!isCollapsed && <span>Pomodoro</span>}
          </a>
          <a href="#" className="item">
            <FaListCheck className='icon'/>
            {!isCollapsed && <span>Notes</span>}
          </a>    
          <a href="#" className="item">
            <TiWeatherCloudy className='icon'/>
            {!isCollapsed && <span>Weather</span>}
          </a>
          <a href="#" className="item">
            <FaKeyboard className='icon'/>
            {!isCollapsed && <span>Mecanography</span>}
          </a>
          <a href="#" className="item">
            <FaSpotify className='icon'/>
            {!isCollapsed && <span>Spotify</span>}
          </a>                      
        </div>
      </div>
      
      <button className="collapse-btn" onClick={toggleSidebar}>
        {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>
    </div>
  );
};

export default Sidebar;