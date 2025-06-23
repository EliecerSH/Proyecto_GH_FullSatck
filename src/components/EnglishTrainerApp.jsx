import React, { useState, useEffect, useRef } from 'react';
import '../styles/EnglishTrainerApp.css';

const EnglishTrainerApp = () => {
  // Estados del juego
  const [gameMode, setGameMode] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', isCorrect: false });
  const [currentExercise, setCurrentExercise] = useState({});
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
        // ... más palabras
      ]
    },
    irregularVerbs: {
      name: "Verbos Irregulares",
      description: "Completa las formas verbales",
      data: [
        { base: "go", past: "went", participle: "gone", spanish: "ir" },
        { base: "eat", past: "ate", participle: "eaten", spanish: "comer" },
        { base: "see", past: "saw", participle: "seen", spanish: "ver" },
        // ... más verbos
      ]
    },
    presentSimple: {
      name: "Presente Simple",
      description: "Conjuga en presente simple",
      data: [
        { pronoun: "I", verb: "go", answer: "go" },
        { pronoun: "he", verb: "go", answer: "goes" },
        // ... más conjugaciones
      ]
    },
    pastTense: {
      name: "Pasado Simple",
      description: "Conjuga en pasado simple",
      data: [
        { verb: "play", answer: "played" },
        { verb: "eat", answer: "ate" },
        // ... más verbos
      ]
    },
    futureTense: {
      name: "Futuro Simple",
      description: "Conjuga en futuro simple",
      data: [
        { verb: "go", answer: "will go" },
        { verb: "eat", answer: "will eat" },
        // ... más verbos
      ]
    },
    listening: {
      name: "Comprensión Auditiva",
      description: "Escribe lo que escuches",
      data: [
        { audio: "sound1.mp3", answer: "hello world" },
        // ... más audios
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

  // Iniciar juego
  const startGame = (mode) => {
    setGameMode(mode);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setFeedback({ message: '', isCorrect: false });
    selectRandomExercise(mode);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Seleccionar ejercicio aleatorio
  const selectRandomExercise = (mode) => {
    const modeExercises = exercises[mode].data;
    const randomIndex = Math.floor(Math.random() * modeExercises.length);
    setCurrentExercise(modeExercises[randomIndex]);
  };

  // Verificar respuesta
  const checkAnswer = () => {
    let isCorrect = false;
    let correctAnswer = '';

    switch(gameMode) {
      case 'vocabulary':
        isCorrect = userAnswer.toLowerCase() === currentExercise.english.toLowerCase();
        correctAnswer = currentExercise.english;
        break;
      case 'irregularVerbs':
        // Lógica para verbos irregulares
        break;
      // ... otros modos
      default:
        isCorrect = userAnswer.toLowerCase() === currentExercise.answer.toLowerCase();
        correctAnswer = currentExercise.answer;
    }

    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback({ message: '✓ Correcto! +10 puntos', isCorrect: true });
    } else {
      setFeedback({ 
        message: `✗ Incorrecto. Respuesta: ${correctAnswer}`, 
        isCorrect: false 
      });
    }

    setTimeout(() => {
      selectRandomExercise(gameMode);
      setUserAnswer('');
      setFeedback({ message: '', isCorrect: false });
      inputRef.current?.focus();
    }, 1500);
  };

  // Renderizar ejercicio según el modo
  const renderExercise = () => {
    switch(gameMode) {
      case 'vocabulary':
        return (
          <div className="exercise">
            <h3>Traduce al inglés:</h3>
            <h2>{currentExercise.spanish}</h2>
          </div>
        );
      case 'irregularVerbs':
        return (
          <div className="exercise">
            <h3>Completa las formas del verbo:</h3>
            <div className="verb-forms">
              <p>Base: {currentExercise.base}</p>
              <p>Pasado: <input type="text" placeholder="Pasado" /></p>
              <p>Participio: <input type="text" placeholder="Participio" /></p>
              <p>Significado: {currentExercise.spanish}</p>
            </div>
          </div>
        );
      // ... otros casos
      default:
        return null;
    }
  };

  return (
    <div className="english-trainer-container">
      {/* Cabecera y selección de modos */}
      {!gameMode ? (
        <div className="mode-selection">
          <h1>English Mastery</h1>
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
          {/* Interfaz del juego */}
          <div className="game-header">
            <h2>{exercises[gameMode].name}</h2>
            <div className="game-stats">
              <span>Puntuación: {score}</span>
              <span>Tiempo: {timeLeft}s</span>
            </div>
          </div>

          {renderExercise()}

          {/* Input y botones */}
          <div className="answer-section">
            <input
              ref={inputRef}
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Tu respuesta..."
              className="answer-input"
              autoFocus
            />
            <button 
              onClick={checkAnswer}
              className="check-button"
            >
              Comprobar
            </button>
          </div>

          {feedback.message && (
            <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
              {feedback.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnglishTrainerApp;