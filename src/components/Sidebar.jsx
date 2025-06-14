import { TiWeatherCloudy } from "react-icons/ti";
import { MdTimer } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className='sidebar-content'>
        <div className='menu-icon'>
          <IoMdMenu />
        </div>
        <div className='user-profile'>
          <div className='user-info'>
            <p>Good morning</p>
            <h2>user</h2>
          </div>
        </div>
        <hr className='horizontal-line'/>
        <div className='menu'>
          <div className='menu-container'>
            <div className="menu-item">
              <MdTimer className='icon'/>
              <p>Pomodoro</p>
            </div>
            <div className="menu-item">
              <FaListCheck className='icon'/>
              <p>Notes</p>
            </div>
            <div className="menu-item">
              <TiWeatherCloudy className='icon'/>
              <p>Weather</p>
            </div>
            <div className="menu-item">
              <FaKeyboard className='icon'/>
              <p>Mecanography</p>
            </div>
            <div className="menu-item">
              <FaSpotify  className='icon'/>
              <p>Spotify</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;