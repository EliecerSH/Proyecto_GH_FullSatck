import { useState, useEffect, useRef } from 'react';
import '../styles/MecanografiaApp.css';

const MecanografiaApp = () => {
  const [texto, setTexto] = useState('');
  const [tiempo, setTiempo] = useState(60);
  const [estaEjecutando, setEstaEjecutando] = useState(false);
  const [textoEjemplo, setTextoEjemplo] = useState('');
  const [erroresTotales, setErroresTotales] = useState(0);
  const [pruebaCompletada, setPruebaCompletada] = useState(false);
  const [velocidad, setVelocidad] = useState(0);
  const inputRef = useRef(null);

  const textosEjemplo = [
    "La práctica hace al maestro en la mecanografía.",
    "Escribe sin mirar el teclado para mejorar tu velocidad.",
    "JavaScript y React son tecnologías web populares.",
    "La constancia es clave para aprender a programar.",
    "El código limpio es esencial para el desarrollo sostenible.",
    "La mecanografía rápida mejora tu productividad diaria.",
    "Los atajos de teclado pueden ahorrarte mucho tiempo.",
    "La atención al detalle es crucial en la programación."
  ];

  useEffect(() => {
    if (!estaEjecutando) {
      setTextoEjemplo(textosEjemplo[Math.floor(Math.random() * textosEjemplo.length)]);
    }
  }, [estaEjecutando, pruebaCompletada]);

  useEffect(() => {
    if (estaEjecutando) {
      if (texto.length === textoEjemplo.length) {
        finalizarPrueba();
        return;
      }

      if (tiempo > 0) {
        const timer = setTimeout(() => setTiempo(tiempo - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        finalizarPrueba();
      }
    }
  }, [tiempo, estaEjecutando, texto, textoEjemplo]);

  const iniciarPrueba = () => {
    setTexto('');
    setTiempo(60);
    setErroresTotales(0);
    setEstaEjecutando(true);
    setPruebaCompletada(false);
    setTimeout(() => inputRef.current.focus(), 100);
  };

  const handleChange = (e) => {
    if (!estaEjecutando) return;
    
    const nuevoTexto = e.target.value;
    if (nuevoTexto.length > textoEjemplo.length) return;
    
    // Contar errores
    if (nuevoTexto.length > 0) {
      const nuevaLetra = nuevoTexto[nuevoTexto.length - 1];
      const letraCorrecta = textoEjemplo[nuevoTexto.length - 1];
      if (nuevaLetra !== letraCorrecta) {
        setErroresTotales(prev => prev + 1);
      }
    }
    
    setTexto(nuevoTexto);
  };

  const finalizarPrueba = () => {
    const tiempoUsado = 60 - tiempo;
    const nuevaVelocidad = tiempoUsado > 0 ? Math.round((texto.length / tiempoUsado) * 60) : 0;
    setVelocidad(nuevaVelocidad);
    setEstaEjecutando(false);
    setPruebaCompletada(true);
  };

  const calcularPrecision = () => {
    if (texto.length === 0) return 0;
    const precision = ((texto.length - erroresTotales) / texto.length) * 100;
    return Math.max(0, Math.round(precision));
  };

  return (
    <div className="mecanografia-container">
      <div className="header">
        <h2>Prueba de Mecanografía</h2>
        <div className="badge">Velocidad + Precisión</div>
      </div>
      
      <div className="controles">
        <button 
          onClick={iniciarPrueba} 
          disabled={estaEjecutando}
          className={`boton-iniciar ${estaEjecutando ? 'active' : ''}`}
        >
          {estaEjecutando ? (
            <>
              <span className="spinner"></span>
              En progreso...
            </>
          ) : (
            'Iniciar Prueba (1 minuto)'
          )}
        </button>
        
        <div className="tiempo">
          <span className="icon">⏱️</span>
          {tiempo}s restantes
        </div>
      </div>
      
      <div className="texto-ejemplo">
        {textoEjemplo.split('').map((letra, index) => (
          <span 
            key={index} 
            className={
              index >= texto.length 
                ? 'sin-escribir' 
                : 'letra-normal'
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
        placeholder={estaEjecutando ? "Comienza a escribir aquí..." : "Presiona 'Iniciar Prueba'"}
        className="area-texto"
      />
      
      {pruebaCompletada && (
        <div className="resultados">
          <div className="resultados-header">
            <h3>Resultados</h3>
            <button onClick={iniciarPrueba} className="boton-reiniciar">
              Nueva Prueba
            </button>
          </div>
          
          <div className="metricas-grid">
            <div className="metrica-box">
              <div className="metrica-valor">{texto.length}</div>
              <div className="metrica-label">Caracteres</div>
            </div>
            
            <div className="metrica-box error">
              <div className="metrica-valor">{erroresTotales}</div>
              <div className="metrica-label">Errores</div>
            </div>
            
            <div className="metrica-box">
              <div className="metrica-valor">{velocidad}</div>
              <div className="metrica-label">CPM</div>
            </div>
            
            <div className="metrica-box precision">
              <div className="metrica-valor">{calcularPrecision()}%</div>
              <div className="metrica-label">Precisión</div>
            </div>
          </div>
          
          <div className={`feedback ${calcularPrecision() >= 90 ? 'excelente' : calcularPrecision() >= 70 ? 'bueno' : 'practica'}`}>
            {calcularPrecision() >= 90 ? (
              <><span>🎯</span> ¡Excelente precisión!</>
            ) : calcularPrecision() >= 70 ? (
              <><span>👍</span> Buen trabajo, sigue practicando</>
            ) : (
              <><span>💪</span> Sigue practicando para mejorar</>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MecanografiaApp;