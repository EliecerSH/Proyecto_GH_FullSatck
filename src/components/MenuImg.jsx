
import React, { useState } from 'react';
import '../styles/MenuImg.css';
import playa_img from '../assets/Playa.jpeg';
import CyberPunk from '../assets/PantallaCyberPunk.jpeg';
import Lago from '../assets/Lago.jpg';
import a1 from '../assets/a1.jpg';
import { IoColorPaletteSharp } from "react-icons/io5";


const MenuImg = ({ onSelect }) => {
  const [open, setOpen] = useState(false);

  const backgrounds = [
    playa_img,
    CyberPunk,
    Lago,
    a1
  ];

  const toggleMenu = () => setOpen(!open);

  const handleSelect = (bg) => {
    onSelect(bg);
    setOpen(false);
  };

  return (
    <div className="background-selector-container">
      <button className="background-toggle-btn" onClick={toggleMenu}>
        <IoColorPaletteSharp />
      </button>
      {open && (
        <div className="background-menu">
          <p>Selecciona un fondo:</p>
          <div className="background-options">
            {backgrounds.map((bg, index) => (
              <img
                key={index}
                src={bg}
                alt={`Fondo ${index + 1}`}
                className="bg-thumb"
                onClick={() => handleSelect(bg)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuImg;
