import React, { useState, useEffect, useRef } from 'react';
import '../styles/EnglishTrainerApp.css';

const EnglishTrainerApp = () => {
  // Estados del juego
  const [gameMode, setGameMode] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState({ 
    simple: '',
    past: '',
    participle: '' 
  });
  const [feedback, setFeedback] = useState({
    simple: null,
    past: null,
    participle: null,
    general: null
  });
  const inputRef = useRef(null);

  // Base de datos de ejercicios
  const exercises = {
    vocabulary: {
      name: "Vocabulario",
      description: "Traduce palabras del español al inglés",
      data: [
        { spanish: "casa", english: "house" },
        { spanish: "perro", english: "dog" },
        { spanish: "libro", english: "book" },
        { spanish: "agua", english: "water" },
        { spanish: "ciudad", english: "city" }
      ]
    },
    irregularVerbs: {
      name: "Verbos Irregulares",
      description: "Completa las formas verbales",
      data: [
        { base: "go", past: "went", participle: "gone", spanish: "ir" },
        { base: "eat", past: "ate", participle: "eaten", spanish: "comer" },
        { base: "see", past: "saw", participle: "seen", spanish: "ver" },
        { base: "take", past: "took", participle: "taken", spanish: "tomar" },
        { base: "write", past: "wrote", participle: "written", spanish: "escribir" }
      ]
    },
    tenses: {
      name: "Tiempos Verbales",
      description: "Practica presente, pasado y futuro",
      data: [
        // Presente simple
        { tense: "present", pronoun: "I", verb: "eat", answer: "eat", spanish: "yo como" },
        { tense: "present", pronoun: "He", verb: "eat", answer: "eats", spanish: "él come" },
        { tense: "present", pronoun: "We", verb: "go", answer: "go", spanish: "nosotros vamos" },
        
        // Pasado simple
        { tense: "past", pronoun: "She", verb: "go", answer: "went", spanish: "ella fue" },
        { tense: "past", pronoun: "I", verb: "see", answer: "saw", spanish: "yo vi" },
        { tense: "past", pronoun: "They", verb: "eat", answer: "ate", spanish: "ellos comieron" },
        
        // Futuro simple
        { tense: "future", pronoun: "We", verb: "travel", answer: "will travel", spanish: "nosotros viajaremos" },
        { tense: "future", pronoun: "You", verb: "learn", answer: "will learn", spanish: "tú aprenderás" },
        { tense: "future", pronoun: "She", verb: "call", answer: "will call", spanish: "ella llamará" },
        
        // Presente continuo
        { tense: "present", pronoun: "I", verb: "run", answer: "am running", spanish: "yo estoy corriendo" },
        { tense: "present", pronoun: "He", verb: "work", answer: "is working", spanish: "él está trabajando" },
        
        // Pasado continuo
        { tense: "past", pronoun: "They", verb: "sleep", answer: "were sleeping", spanish: "ellos estaban durmiendo" }
      ]
    }
  };

  // Efecto para el temporizador
  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Helper function para nombres de tiempos verbales
  const getTenseName = (tense) => {
    const tenseNames = {
      present: "presente",
      past: "pasado",
      future: "futuro",
      continuous: "continuo"
    };
    return tenseNames[tense] || tense;
  };

  // Iniciar juego
  const startGame = (mode) => {
    setGameMode(mode);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setUserAnswer({ simple: '', past: '', participle: '' });
    setFeedback({ simple: null, past: null, participle: null, general: null });
    selectRandomExercise(mode);
    setTimeout(() => {
      const firstInput = document.querySelector('input:not([disabled])');
      firstInput?.focus();
    }, 100);
  };

  // Terminar juego
  const endGame = () => {
    setIsPlaying(false);
    setGameMode(null);
  };

  // Seleccionar ejercicio aleatorio
  const selectRandomExercise = (mode) => {
    const modeExercises = exercises[mode]?.data || [];
    const randomIndex = Math.floor(Math.random() * modeExercises.length);
    setCurrentExercise(modeExercises[randomIndex]);
  };

  // Manejar cambio en inputs
  const handleInputChange = (e, field) => {
    setUserAnswer({
      ...userAnswer,
      [field]: e.target.value
    });
  };

  // Verificar respuestas para verbos irregulares
  const checkVerbAnswers = () => {
    if (!currentExercise) return;

    const pastCorrect = userAnswer.past.toLowerCase() === currentExercise.past.toLowerCase();
    const participleCorrect = userAnswer.participle.toLowerCase() === currentExercise.participle.toLowerCase();

    const newFeedback = {
      past: {
        isCorrect: pastCorrect,
        message: pastCorrect ? '✓ Correcto' : `✗ Debe ser: ${currentExercise.past}`
      },
      participle: {
        isCorrect: participleCorrect,
        message: participleCorrect ? '✓ Correcto' : `✗ Debe ser: ${currentExercise.participle}`
      },
      general: null
    };

    if (pastCorrect && participleCorrect) {
      newFeedback.general = {
        isCorrect: true,
        message: '¡Perfecto! +20 puntos'
      };
      setScore(prev => prev + 20);
    } else {
      newFeedback.general = {
        isCorrect: false,
        message: 'Revisa tus respuestas'
      };
    }

    setFeedback(newFeedback);
  };

  // Pasar al siguiente verbo
  const nextVerb = () => {
    selectRandomExercise('irregularVerbs');
    setUserAnswer({ simple: '', past: '', participle: '' });
    setFeedback({ simple: null, past: null, participle: null, general: null });
    setTimeout(() => {
      const firstInput = document.querySelector('.verb-forms input:not([disabled])');
      firstInput?.focus();
    }, 100);
  };

  // Verificar respuesta para otros modos
  const checkAnswer = () => {
    if (!currentExercise) return;

    let isCorrect = false;
    let correctAnswer = '';

    switch(gameMode) {
      case 'vocabulary':
        isCorrect = userAnswer.simple.toLowerCase() === currentExercise.english.toLowerCase();
        correctAnswer = currentExercise.english;
        break;
      case 'tenses':
        isCorrect = userAnswer.simple.toLowerCase() === currentExercise.answer.toLowerCase();
        correctAnswer = currentExercise.answer;
        break;
      default:
        return;
    }

    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback({
        general: {
          isCorrect: true,
          message: '✓ Correcto! +10 puntos'
        }
      });
    } else {
      setFeedback({
        general: {
          isCorrect: false,
          message: `✗ Incorrecto. Respuesta: ${correctAnswer}`
        }
      });
    }

    setTimeout(() => {
      selectRandomExercise(gameMode);
      setUserAnswer({ simple: '', past: '', participle: '' });
      setFeedback({ simple: null, past: null, participle: null, general: null });
      inputRef.current?.focus();
    }, 1500);
  };

  // Renderizar ejercicio según el modo
  const renderExercise = () => {
    if (!currentExercise) return <div className="loading">Cargando ejercicio...</div>;

    switch(gameMode) {
      case 'vocabulary':
        return (
          <div className="exercise">
            <h3>Traduce al inglés:</h3>
            <h2>{currentExercise.spanish}</h2>
            <input
              ref={inputRef}
              type="text"
              value={userAnswer.simple}
              onChange={(e) => handleInputChange(e, 'simple')}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="Escribe la traducción"
              className="answer-input"
              autoFocus
            />
          </div>
        );
      case 'irregularVerbs':
        return (
          <div className="exercise">
            <h3>Completa las formas del verbo:</h3>
            <div className="verb-forms">
              <div className="verb-form">
                <label>Base:</label>
                <input 
                  type="text" 
                  value={currentExercise.base} 
                  disabled 
                />
              </div>
              <div className="verb-form">
                <label>Pasado:</label>
                <input
                  type="text"
                  value={userAnswer.past}
                  onChange={(e) => handleInputChange(e, 'past')}
                  onKeyDown={(e) => e.key === 'Enter' && checkVerbAnswers()}
                  placeholder="Escribe el pasado"
                />
                {feedback.past && (
                  <span className={`verb-feedback ${feedback.past.isCorrect ? 'correct' : 'incorrect'}`}>
                    {feedback.past.message}
                  </span>
                )}
              </div>
              <div className="verb-form">
                <label>Participio:</label>
                <input
                  type="text"
                  value={userAnswer.participle}
                  onChange={(e) => handleInputChange(e, 'participle')}
                  onKeyDown={(e) => e.key === 'Enter' && checkVerbAnswers()}
                  placeholder="Escribe el participio"
                />
                {feedback.participle && (
                  <span className={`verb-feedback ${feedback.participle.isCorrect ? 'correct' : 'incorrect'}`}>
                    {feedback.participle.message}
                  </span>
                )}
              </div>
              <div className="verb-form">
                <label>Significado:</label>
                <input 
                  type="text" 
                  value={currentExercise.spanish} 
                  disabled 
                />
              </div>
            </div>
            <div className="verb-actions">
              <button 
                onClick={checkVerbAnswers}
                disabled={!userAnswer.past || !userAnswer.participle}
                className="check-button"
              >
                Verificar Respuestas
              </button>
            </div>
          </div>
        );
      case 'tenses':
        return (
          <div className="exercise exercise-tenses">
            <h3>Conjuga el verbo en: 
              <span className="tense-indicator">
                {getTenseName(currentExercise.tense)}
              </span>
            </h3>
            <p>{currentExercise.pronoun} ({currentExercise.verb})</p>
            <p className="hint">En español: {currentExercise.spanish}</p>
            <input
              ref={inputRef}
              type="text"
              value={userAnswer.simple}
              onChange={(e) => handleInputChange(e, 'simple')}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="Escribe la conjugación"
              className="answer-input"
              autoFocus
            />
          </div>
        );
      default:
        return <div className="exercise">Modo no implementado aún</div>;
    }
  };

  return (
    <div className="english-trainer-container">
      {!gameMode ? (
        <div className="mode-selection">
          <h1>English Trainer</h1>
          <p>Selecciona un modo de entrenamiento:</p>
          
          <div className="modes-grid">
            {Object.entries(exercises).map(([key, exercise]) => (
              <div 
                key={key}
                className="mode-card"
                onClick={() => startGame(key)}
              >
                <h3>{exercise.name}</h3>
                <p>{exercise.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="game-screen">
          <div className="game-header">
            <h2>{exercises[gameMode].name}</h2>
            <div className="game-stats">
              <span>Puntuación: {score}</span>
              <span>Tiempo: {timeLeft}s</span>
              <button onClick={endGame} className="end-button">
                Terminar
              </button>
            </div>
          </div>

          {renderExercise()}

          {feedback.general && (
            <div className={`feedback ${feedback.general.isCorrect ? 'correct' : 'incorrect'}`}>
              {feedback.general.message}
              {feedback.general.isCorrect && gameMode === 'irregularVerbs' && (
                <button onClick={nextVerb} className="next-button">
                  Siguiente Verbo →
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnglishTrainerApp;