import { useState, useEffect, useRef } from 'react';
import './MecanografiaApp.css';

const MecanografiaApp = () => {
  // Estados
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

  // Banco de textos de ejemplo
  const textosEjemplo = [
    "La práctica constante mejora la velocidad de escritura.",
    "JavaScript es el lenguaje de programación más popular.",
    "Escribe sin mirar el teclado para mejorar tu técnica.",
    "La mecanografía es una habilidad esencial en tecnología.",
    "React es una biblioteca popular para construir interfaces.",
    "La constancia es clave para dominar cualquier habilidad."
  ];

  // Inicializar texto aleatorio
  useEffect(() => {
    if (!estaEjecutando && !pruebaCompletada) {
      seleccionarTextoAleatorio();
    }
  }, [estaEjecutando, pruebaCompletada]);

  // Manejar la finalización
  useEffect(() => {
    if (estaEjecutando && texto.length === textoEjemplo.length) {
      finalizarPrueba();
    }
  }, [texto, textoEjemplo, estaEjecutando]);

  // Seleccionar texto aleatorio
  const seleccionarTextoAleatorio = () => {
    const textosDisponibles = textosEjemplo.filter(t => t !== textoEjemplo);
    const textoAleatorio = textosDisponibles[Math.floor(Math.random() * textosDisponibles.length)];
    setTextoEjemplo(textoAleatorio || textosEjemplo[0]);
  };

  // Iniciar prueba
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

  // Manejar cambios en el texto
  const handleChange = (e) => {
    if (!estaEjecutando) return;
    
    const nuevoTexto = e.target.value;
    
    // Limitar al largo del texto ejemplo
    if (nuevoTexto.length > textoEjemplo.length) return;
    
    // Registrar errores solo al agregar caracteres
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

  // Finalizar prueba
  const finalizarPrueba = () => {
    const tiempoTranscurrido = (Date.now() - tiempoInicio) / 1000; // en segundos
    const caracteresPorMinuto = tiempoTranscurrido > 0 
      ? Math.round((texto.length / tiempoTranscurrido) * 60)
      : 0;
    
    setVelocidad(caracteresPorMinuto);
    setPrecision(calcularPrecision());
    setEstaEjecutando(false);
    setPruebaCompletada(true);
  };

  // Calcular precisión
  const calcularPrecision = () => {
    if (texto.length === 0) return 0;
    const precisionCalculada = ((texto.length - erroresTotales) / texto.length) * 100;
    return Math.max(0, Math.round(precisionCalculada));
  };

  // Obtener clase para cada letra
  const getClaseLetra = (index) => {
    if (index >= texto.length) return 'letra-pendiente';
    return texto[index] === textoEjemplo[index] ? 'letra-correcta' : 'letra-incorrecta';
  };

  return (
    <div className="mecanografia-avanzada">
      <div className="mecanografia-header">
        <h2>Prueba de Mecanografía Profesional</h2>
        <div className="mecanografia-badge">Precisión + Velocidad</div>
      </div>
      
      <div className="mecanografia-controles">
        <button 
          onClick={iniciarPrueba} 
          disabled={estaEjecutando}
          className="mecanografia-boton"
        >
          {estaEjecutando ? 'En progreso...' : 'Iniciar Prueba'}
        </button>
      </div>
      
      <div className="mecanografia-texto-ejemplo">
        {textoEjemplo.split('').map((letra, index) => (
          <span 
            key={index} 
            className={`mecanografia-letra ${getClaseLetra(index)}`}
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
        className="mecanografia-input"
      />
      
      {pruebaCompletada && (
        <div className="mecanografia-resultados">
          <h3>Resultados de la Prueba</h3>
          
          <div className="mecanografia-metricas">
            <div className="metrica">
              <span className="metrica-valor">{velocidad}</span>
              <span className="metrica-etiqueta">CPM</span>
            </div>
            <div className="metrica">
              <span className="metrica-valor">{precision}%</span>
              <span className="metrica-etiqueta">Precisión</span>
            </div>
            <div className="metrica">
              <span className="metrica-valor">{erroresTotales}</span>
              <span className="metrica-etiqueta">Errores</span>
            </div>
          </div>
          
          {erroresTotales > 0 && (
            <div className="mecanografia-errores-detalle">
              <h4>Errores por letra:</h4>
              <div className="errores-lista">
                {Object.entries(erroresPorLetra).map(([posicion, cantidad]) => (
                  <div key={posicion} className="error-item">
                    <span className="error-letra">{textoEjemplo[posicion]}</span>
                    <span className="error-cantidad">{cantidad} error{cantidad !== 1 ? 'es' : ''}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <button 
            onClick={iniciarPrueba} 
            className="mecanografia-boton reiniciar"
          >
            Realizar otra prueba
          </button>
        </div>
      )}
    </div>
  );
};

export default MecanografiaApp.jsx;