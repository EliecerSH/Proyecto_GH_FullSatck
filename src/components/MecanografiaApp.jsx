import { useState, useEffect, useRef } from 'react';
import '../styles/MecanografiaApp.css';

const MecanografiaApp = () => {
  const [texto, setTexto] = useState('');
  const [tiempo, setTiempo] = useState(60);
  const [estaEjecutando, setEstaEjecutando] = useState(false);
  const [caracteres, setCaracteres] = useState(0);
  const [precision, setPrecision] = useState(100);
  const [textoEjemplo, setTextoEjemplo] = useState('');
  const [errores, setErrores] = useState(0);
  const [pruebaCompletada, setPruebaCompletada] = useState(false);
  const [velocidad, setVelocidad] = useState(0);
  const inputRef = useRef(null);

  const textosEjemplo = [
    "La práctica hace al maestro en la mecanografía.",
    "Escribe sin mirar el teclado para mejorar tu velocidad.",
    "JavaScript y React son tecnologías web populares.",
    "La constancia es clave para aprender a programar.",
    "El código limpio es esencial para el desarrollo sostenible."
  ];

  useEffect(() => {
    if (!estaEjecutando && !textoEjemplo) {
      setTextoEjemplo(textosEjemplo[Math.floor(Math.random() * textosEjemplo.length)]);
    }
  }, [estaEjecutando, textoEjemplo]);

  useEffect(() => {
    if (estaEjecutando && tiempo > 0) {
      const timer = setTimeout(() => setTiempo(tiempo - 1), 1000);
      return () => clearTimeout(timer);
    } else if (tiempo === 0 || (texto.length === textoEjemplo.length && estaEjecutando)) {
      finalizarPrueba();
    }
  }, [tiempo, estaEjecutando, texto]);

  const iniciarPrueba = () => {
    setTexto('');
    setTiempo(60);
    setCaracteres(0);
    setPrecision(100);
    setErrores(0);
    setEstaEjecutando(true);
    setPruebaCompletada(false);
    setTextoEjemplo(textosEjemplo[Math.floor(Math.random() * textosEjemplo.length)]);
    setTimeout(() => inputRef.current.focus(), 100);
  };

  const handleChange = (e) => {
    if (!estaEjecutando) return;
    
    const valor = e.target.value;
    setTexto(valor);
    setCaracteres(valor.length);
    
    // Calcular errores en tiempo real
    let nuevosErrores = 0;
    for (let i = 0; i < valor.length; i++) {
      if (valor[i] !== textoEjemplo[i]) {
        nuevosErrores++;
      }
    }
    setErrores(nuevosErrores);
    
    // Verificar si se completó el texto
    if (valor.length === textoEjemplo.length) {
      finalizarPrueba();
    }
  };

  const finalizarPrueba = () => {
    setEstaEjecutando(false);
    calcularEstadisticas();
    setPruebaCompletada(true);
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
    
    // Calcular velocidad (caracteres por minuto)
    const tiempoUsado = 60 - tiempo;
    const nuevaVelocidad = tiempoUsado > 0 ? Math.round((caracteres / tiempoUsado) * 60) : 0;
    setVelocidad(nuevaVelocidad);
  };

  return (
    <div className="mecanografia-container">
      <h2>Prueba de Mecanografía</h2>
      
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
      
      {pruebaCompletada && (
        <div className="resultados">
          <h3>Resultados de la Prueba</h3>
          <p>Caracteres escritos: {caracteres}</p>
          <p>Errores: {errores}</p>
          <p>Precisión: {precision}%</p>
          <p>Velocidad: {velocidad} caracteres por minuto</p>
          {precision >= 90 && <p className="excelente">¡Excelente trabajo!</p>}
          {precision >= 70 && precision < 90 && <p className="bueno">¡Buen trabajo!</p>}
          {precision < 70 && <p className="practica">Sigue practicando</p>}
        </div>
      )}
    </div>
  );
}

export default MecanografiaApp;