import React, { useState, useEffect, useRef } from 'react';
import '../styles/EnglishTrainerApp.css'; // Asegúrate de tener este archivo CSS

const EnglishTrainerApp = () => {
  // Estados del juego
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', isCorrect: false });
  const inputRef = useRef(null);

  // Base de datos de palabras
  const vocabulary = [
    { spanish: "casa", english: "house" },
    { spanish: "perro", english: "dog" },
    { spanish: "libro", english: "book" },
    { spanish: "agua", english: "water" },
    { spanish: "ciudad", english: "city" }
  ];

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
  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setCurrentWordIndex(0);
    setUserAnswer('');
    setIsPlaying(true);
    setFeedback({ message: '', isCorrect: false });
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Terminar juego
  const endGame = () => {
    setIsPlaying(false);
  };

  // Verificar respuesta
  const checkAnswer = () => {
    const correctAnswer = vocabulary[currentWordIndex].english.toLowerCase();
    const isCorrect = userAnswer.toLowerCase() === correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback({ message: '¡Correcto! +10 puntos', isCorrect: true });
    } else {
      setFeedback({ 
        message: `Incorrecto. La respuesta era: ${correctAnswer}`, 
        isCorrect: false 
      });
    }

    setTimeout(() => {
      const nextIndex = (currentWordIndex + 1) % vocabulary.length;
      setCurrentWordIndex(nextIndex);
      setUserAnswer('');
      setFeedback({ message: '', isCorrect: false });
      inputRef.current?.focus();
    }, 1500);
  };

  // Manejar tecla Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  // Formatear tiempo
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="english-trainer-container">
      <h1>English Trainer</h1>
      
      {!isPlaying ? (
        <div className="start-screen">
          <button onClick={startGame} className="start-button">
            Iniciar Juego
          </button>
        </div>
      ) : (
        <div className="game-screen">
          <div className="game-info">
            <span>Puntuación: {score}</span>
            <span>Tiempo: {formatTime(timeLeft)}</span>
          </div>

          <div className="word-card">
            <h2>Traduce:</h2>
            <h3>{vocabulary[currentWordIndex].spanish}</h3>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe en inglés"
            className="answer-input"
            autoFocus
          />

          <button 
            onClick={checkAnswer}
            disabled={!userAnswer.trim()}
            className="check-button"
          >
            Comprobar
          </button>

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