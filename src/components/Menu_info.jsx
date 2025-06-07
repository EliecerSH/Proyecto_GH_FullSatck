import React, { useState, useEffect } from "react";
import "./Menu_info.css";
import Apart_info from "./Apart_info";
import clima_ico from "../assets/clima_icon.png";
import pokemon_ico from "../assets/pokemon_icon.png"

const Menu_info = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = (value) => {
    setIsOpen(value);
  };

  // Cerrar con ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {isOpen && (
        <div className="menu-overlay" onClick={() => setIsOpen(false)}>
          <div className="menu-window" onClick={(e) => e.stopPropagation()}>
            <h2>Menú</h2>
            <ul>
              <li>
                <div>
                  <img src={clima_ico} alt="" width='15%'/>
                  <h2>
                    CLIMA
                  </h2>
                </div>
              </li>
              <li>
                <div>
                  <img src={pokemon_ico} alt="" width='10%'/>
                  <h2>
                    API DE POKEMON
                  </h2>
                </div>
              </li>
            </ul>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      <div>
        <Apart_info openWn={openMenu}></Apart_info>
      </div>
    </>
  );
};

export default Menu_info;

