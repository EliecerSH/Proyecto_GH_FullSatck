import { useState, useEffect, useRef } from 'react';
import "../styles/MecanografiaApp.css";

const MecanografiaApp = () => {
  const [texto, setTexto] = useState('');
  const [textoEjemplo, setTextoEjemplo] = useState('');
  const [estaEjecutando, setEstaEjecutando] = useState(false);
  const [erroresTotales, setErroresTotales] = useState(0);
  const [erroresPorLetra, setErroresPorLetra] = useState({});
  const [pruebaCompletada, setPruebaCompletada] = useState(false);
  const [precision, setPrecision] = useState(100);
  const [velocidad, setVelocidad] = useState(0);
  const [tiempoInicio, setTiempoInicio] = useState(0);
  const inputRef = useRef(null);

  const textosEjemplo = [
    "La práctica constante mejora la velocidad de escritura.",
    "JavaScript es el lenguaje de programación más popular.",
    "Escribe sin mirar el teclado para mejorar tu técnica.",
    "La mecanografía es una habilidad esencial en tecnología.",
    "React es una biblioteca popular para construir interfaces.",
    "La constancia es clave para dominar cualquier habilidad."
  ];

  useEffect(() => {
    if (!estaEjecutando && !pruebaCompletada) {
      seleccionarTextoAleatorio();
    }
  }, [estaEjecutando, pruebaCompletada]);

  useEffect(() => {
    if (estaEjecutando && texto.length === textoEjemplo.length) {
      finalizarPrueba();
    }
  }, [texto, textoEjemplo, estaEjecutando]);

  const seleccionarTextoAleatorio = () => {
    const textosDisponibles = textosEjemplo.filter(t => t !== textoEjemplo);
    const textoAleatorio = textosDisponibles[Math.floor(Math.random() * textosDisponibles.length)] || textosEjemplo[0];
    setTextoEjemplo(textoAleatorio);
  };

  const iniciarPrueba = () => {
    setTexto('');
    setErroresTotales(0);
    setErroresPorLetra({});
    setPrecision(100);
    setEstaEjecutando(true);
    setPruebaCompletada(false);
    setTiempoInicio(Date.now());
    seleccionarTextoAleatorio();
    setTimeout(() => inputRef.current.focus(), 100);
  };

  const handleChange = (e) => {
    if (!estaEjecutando) return;
    
    const nuevoTexto = e.target.value;
    if (nuevoTexto.length > textoEjemplo.length) return;
    
    if (nuevoTexto.length > texto.length) {
      const posicionActual = nuevoTexto.length - 1;
      const letraEscrita = nuevoTexto[posicionActual];
      const letraCorrecta = textoEjemplo[posicionActual];
      
      if (letraEscrita !== letraCorrecta) {
        setErroresTotales(prev => prev + 1);
        setErroresPorLetra(prev => ({
          ...prev,
          [posicionActual]: (prev[posicionActual] || 0) + 1
        }));
      }
    }
    
    setTexto(nuevoTexto);
  };

  const finalizarPrueba = () => {
    const tiempoTranscurrido = (Date.now() - tiempoInicio) / 1000;
    const caracteresPorMinuto = tiempoTranscurrido > 0 
      ? Math.round((texto.length / tiempoTranscurrido) * 60)
      : 0;
    
    setVelocidad(caracteresPorMinuto);
    setPrecision(calcularPrecision());
    setEstaEjecutando(false);
    setPruebaCompletada(true);
  };

  const calcularPrecision = () => {
    if (texto.length === 0) return 0;
    const precisionCalculada = ((texto.length - erroresTotales) / texto.length) * 100;
    return Math.max(0, Math.round(precisionCalculada));
  };

  const getClaseLetra = (index) => {
    if (index >= texto.length) return 'letra-pendiente';
    return texto[index] === textoEjemplo[index] ? 'letra-correcta' : 'letra-incorrecta';
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
          className="boton-principal"
        >
          {estaEjecutando ? 'En progreso...' : 'Iniciar Prueba'}
        </button>
      </div>
      
      <div className="texto-ejemplo">
        {textoEjemplo.split('').map((letra, index) => (
          <span 
            key={index} 
            className={`letra ${getClaseLetra(index)}`}
            data-error-count={erroresPorLetra[index] || null}
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
          <h3>Resultados</h3>
          
          <div className="metricas">
            <div className="metrica">
              <span className="valor">{velocidad}</span>
              <span className="etiqueta">CPM</span>
            </div>
            <div className="metrica">
              <span className="valor">{precision}%</span>
              <span className="etiqueta">Precisión</span>
            </div>
            <div className="metrica">
              <span className="valor">{erroresTotales}</span>
              <span className="etiqueta">Errores</span>
            </div>
          </div>
          
          {erroresTotales > 0 && (
            <div className="errores-detalle">
              <h4>Errores por letra:</h4>
              <div className="errores-lista">
                {Object.entries(erroresPorLetra).map(([posicion, cantidad]) => (
                  <div key={posicion} className="error-item">
                    <span className="letra-error">{textoEjemplo[posicion]}</span>
                    <span className="cantidad-error">{cantidad} error{cantidad !== 1 ? 'es' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button 
            onClick={iniciarPrueba} 
            className="boton-principal reiniciar"
          >
            Nueva Prueba
          </button>
        </div>
      )}
    </div>
  );
};

export default MecanografiaApp;