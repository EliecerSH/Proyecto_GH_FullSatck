import { useState, useEffect, useRef } from 'react';
import './Mecanografia.css';

function Mecanografia() {
  const [texto, setTexto] = useState('');
  const [tiempo, setTiempo] = useState(60);
  const [estaEjecutando, setEstaEjecutando] = useState(false);
  const [caracteres, setCaracteres] = useState(0);
  const [precision, setPrecision] = useState(100);
  const [textoEjemplo, setTextoEjemplo] = useState('');
  const inputRef = useRef(null);

  const textosEjemplo = [
    "La práctica hace al maestro en la mecanografía.",
    "Escribe sin mirar el teclado para mejorar tu velocidad.",
    "JavaScript y React son tecnologías web populares.",
    "La constancia es clave para aprender a programar."
  ];
