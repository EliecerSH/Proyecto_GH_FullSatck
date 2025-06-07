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
useEffect(() => {
    if (!textoEjemplo) {
      setTextoEjemplo(textosEjemplo[Math.floor(Math.random() * textosEjemplo.length)]);
    }
  }, []);

  useEffect(() => {
    if (estaEjecutando && tiempo > 0) {
      const timer = setTimeout(() => setTiempo(tiempo - 1), 1000);
      return () => clearTimeout(timer);
    } else if (tiempo === 0) {
      setEstaEjecutando(false);
      calcularEstadisticas();
    }
  }, [tiempo, estaEjecutando]);

  const iniciarPrueba = () => {
    setTexto('');
    setTiempo(60);
    setCaracteres(0);
    setPrecision(100);
    setEstaEjecutando(true);
    setTextoEjemplo(textosEjemplo[Math.floor(Math.random() * textosEjemplo.length)]);
    setTimeout(() => inputRef.current.focus(), 100);
  };

  const handleChange = (e) => {
    if (!estaEjecutando) return;
    
    const valor = e.target.value;
    setTexto(valor);
    setCaracteres(valor.length);
  };

  const calcularEstadisticas = () => {
    let correctos = 0;
    const longitud = Math.min(texto.length, textoEjemplo.length);
    
    for (let i = 0; i < longitud; i++) {
      if (texto[i] === textoEjemplo[i]) {
        correctos++;
      }
    }
    
    const nuevaPrecision = longitud > 0 ? Math.round((correctos / longitud) * 100) : 0;
    setPrecision(nuevaPrecision);
  };
 return (
    <div className="mecanografia-container">
      <h2>Mecanografía</h2>
      
      <div className="controles">
        <button 
          onClick={iniciarPrueba} 
          disabled={estaEjecutando}
          className="boton-iniciar"
        >
          {estaEjecutando ? 'En progreso...' : 'Iniciar Prueba (1 minuto)'}
        </button>
        
        <div className="tiempo">Tiempo restante: {tiempo}s</div>
      </div>
      
      <div className="texto-ejemplo">
        {textoEjemplo.split('').map((letra, index) => (
          <span 
            key={index} 
            className={
              index >= texto.length 
                ? 'sin-escribir' 
                : texto[index] === letra 
                  ? 'correcto' 
                  : 'incorrecto'
            }
          >
            {letra}
          </span>
        ))}
      </div>
      
      <textarea
        ref={inputRef}
        value={texto}
        onChange={handleChange}
        disabled={!estaEjecutando}
        placeholder={estaEjecutando ? "Escribe aquí..." : "Presiona 'Iniciar Prueba'"}
        className="area-texto"
      />
      
      {tiempo === 0 && (
        <div className="resultados">
          <h3>Resultados:</h3>
          <p>Caracteres por minuto: {caracteres}</p>
          <p>Precisión: {precision}%</p>
        </div>
      )}
    </div>
  );
}

export default Mecanografia;