import { useState, useEffect, useRef } from 'react';
import '../styles/MecanografiaApp.css';

const MecanografiaApp = () => {
  const [texto, setTexto] = useState('');
  const [tiempo, setTiempo] = useState(60);
  const [estaEjecutando, setEstaEjecutando] = useState(false);
  const [textoEjemplo, setTextoEjemplo] = useState('');
  const [erroresTotales, setErroresTotales] = useState(0);
  const [erroresPorLetra, setErroresPorLetra] = useState({});
  const [pruebaCompletada, setPruebaCompletada] = useState(false);
  const inputRef = useRef(null);

  const textosEjemplo = [
    "La práctica hace al maestro en la mecanografía.",
    "Escribe sin mirar el teclado para mejorar tu velocidad.",
    "JavaScript y React son tecnologías web populares.",
    "La constancia es clave para aprender a programar."
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
    } else if (tiempo === 0 || texto === textoEjemplo) {
      finalizarPrueba();
    }
  }, [tiempo, estaEjecutando, texto, textoEjemplo]);

  const iniciarPrueba = () => {
    setTexto('');
    setTiempo(60);
    setErroresTotales(0);
    setErroresPorLetra({});
    setEstaEjecutando(true);
    setPruebaCompletada(false);
    setTextoEjemplo(textosEjemplo[Math.floor(Math.random() * textosEjemplo.length)]);
    setTimeout(() => inputRef.current.focus(), 100);
  };

  const handleChange = (e) => {
    if (!estaEjecutando) return;
    
    const nuevoTexto = e.target.value;
    
    // Solo permitir escribir hasta la longitud del texto ejemplo
    if (nuevoTexto.length > textoEjemplo.length) return;
    
    // Detectar errores
    if (nuevoTexto.length > texto.length) { // Solo al agregar caracteres
      const nuevaLetra = nuevoTexto[nuevoTexto.length - 1];
      const letraCorrecta = textoEjemplo[nuevoTexto.length - 1];
      
      if (nuevaLetra !== letraCorrecta) {
        const posicionError = nuevoTexto.length - 1;
        setErroresTotales(prev => prev + 1);
        
        // Registrar error por posición
        setErroresPorLetra(prev => ({
          ...prev,
          [posicionError]: (prev[posicionError] || 0) + 1
        }));
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
    const correctos = texto.split('').filter((letra, i) => letra === textoEjemplo[i]).length;
    return Math.round((correctos / texto.length) * 100);
  };

  const getErroresEnPosicion = (posicion) => {
    return erroresPorLetra[posicion] || 0;
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
        {textoEjemplo.split('').map((letra, index) => {
          const errores = getErroresEnPosicion(index);
          return (
            <span 
              key={index} 
              className={
                index >= texto.length 
                  ? 'sin-escribir' 
                  : texto[index] === letra 
                    ? 'correcto' 
                    : 'incorrecto'
              }
              title={errores > 0 ? `Errores: ${errores}` : ''}
            >
              {letra}
              {errores > 0 && <span className="contador-error">{errores}</span>}
            </span>
          );
        })}
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
          <h3>Resultados</h3>
          <p>Caracteres escritos: {texto.length}</p>
          <p>Errores totales: {erroresTotales}</p>
          <p>Precisión: {calcularPrecision()}%</p>
          
          <div className="errores-detallados">
            <h4>Errores por letra:</h4>
            {Object.entries(erroresPorLetra).map(([posicion, cantidad]) => (
              <p key={posicion}>
                Letra {parseInt(posicion) + 1} ({textoEjemplo[posicion]}): 
                <span className="error-count"> {cantidad} error{cantidad !== 1 ? 'es' : ''}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MecanografiaApp;