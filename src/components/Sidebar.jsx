import React from 'react';
import { TbAppleFilled } from "react-icons/tb";
import { TiWeatherCloudy } from "react-icons/ti";
import { MdTimer } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";

import '../styles/sidebar.css'

const Sidebar = () => {
    return (
     <div className='menu'>
        <div className='logo'>
          <TbAppleFilled className='logo-icon'/>
          <h2>Kouritsu</h2>
        </div>

        <div className='menu-list'>
            <a href="#" className="item">
            <MdTimer className='icon'/>
               Pomodoro
            </a>
            <a href="#" className="item">
            <FaListCheck className='icon'/>
               Notes
            </a>    
            <a href="#" className="item">
             <TiWeatherCloudy className='icon'/>
               Weather
            </a>            
        </div>
     </div>   
    );
};

export default Sidebar;