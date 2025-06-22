import { useState, useEffect, useRef } from 'react';
import '../styles/MecanografiaApp.css';

const MecanografiaApp = () => {
  const [texto, setTexto] = useState('');
  const [tiempo, setTiempo] = useState(60);
  const [estaEjecutando, setEstaEjecutando] = useState(false);
  const [textoEjemplo, setTextoEjemplo] = useState('La mecanografía rápida mejora tu productividad diaria.');
  const [erroresTotales, setErroresTotales] = useState(0);
  const [pruebaCompletada, setPruebaCompletada] = useState(false);
  const inputRef = useRef(null);

  const textosEjemplo = [
    "La mecanografía rápida mejora tu productividad diaria.",
    "La constancia es clave para aprender a programar.",
    "JavaScript y React son tecnologías web populares.",
    "Escribe sin mirar el teclado para mejorar tu velocidad."
  ];

  useEffect(() => {
    if (estaEjecutando && tiempo > 0) {
      const timer = setTimeout(() => setTiempo(tiempo - 1), 1000);
      return () => clearTimeout(timer);
    } else if (tiempo === 0 || texto.length === textoEjemplo.length) {
      finalizarPrueba();
    }
  }, [tiempo, estaEjecutando, texto, textoEjemplo]);

  const iniciarPrueba = () => {
    setTexto('');
    setTiempo(60);
    setErroresTotales(0);
    setEstaEjecutando(true);
    setPruebaCompletada(false);
    setTextoEjemplo(textosEjemplo[Math.floor(Math.random() * textosEjemplo.length)]);
    setTimeout(() => inputRef.current.focus(), 100);
  };

  const handleChange = (e) => {
    if (!estaEjecutando) return;
    
    const nuevoTexto = e.target.value;
    if (nuevoTexto.length > textoEjemplo.length) return;
    
    if (nuevoTexto.length > texto.length) {
      const nuevaLetra = nuevoTexto[nuevoTexto.length - 1];
      const letraCorrecta = textoEjemplo[nuevoTexto.length - 1];
      if (nuevaLetra !== letraCorrecta) {
        setErroresTotales(prev => prev + 1);
      }
    }
    
    setTexto(nuevoTexto);
  };

  const finalizarPrueba = () => {
    setEstaEjecutando(false);
    setPruebaCompletada(true);
  };

  const calcularPrecision = () => {
    if (texto.length === 0) return 0;
    return Math.round(((texto.length - erroresTotales) / texto.length) * 100);
  };

  return (
    <div className="mecanografia-compacto">
      <h1>Prueba de Mecanografía</h1>
      
      <div className="controles-compactos">
        <button 
          onClick={iniciarPrueba} 
          disabled={estaEjecutando}
          className="boton-compacto"
        >
          {estaEjecutando ? `En progreso (${tiempo}s)` : 'Iniciar Prueba (1 minuto)'}
        </button>
        <div className="badge-compacto">Velocidad + Precisión</div>
      </div>
      
      <div className="texto-ejemplo-compacto">
        {textoEjemplo}
      </div>
      
      <textarea
        ref={inputRef}
        value={texto}
        onChange={handleChange}
        disabled={!estaEjecutando}
        placeholder={estaEjecutando ? "Escribe aquí..." : "Presiona 'Iniciar Prueba'"}
        className="area-texto-compacto"
      />
      
      {pruebaCompletada && (
        <div className="resultados-compactos">
          <h2>Resultados</h2>
          <div className="metricas-compactas">
            <p>Precisión: <span>{calcularPrecision()}%</span></p>
            <p>Errores: <span>{erroresTotales}</span></p>
          </div>
          <button onClick={iniciarPrueba} className="boton-reiniciar">
            Nueva Prueba
          </button>
        </div>
      )}
    </div>
  );
};

export default MecanografiaApp;