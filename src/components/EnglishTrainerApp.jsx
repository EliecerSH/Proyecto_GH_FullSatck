import { useState, useEffect, useRef } from 'react';
import "../styles/EnglishTrainerApp.css";

const EnglishTrainer = () => {
  // Estados generales
  const [gameMode, setGameMode] = useState(null); // 'vocabulary', 'verbs', 'listening'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef(null);

  // Datos para los juegos
  const vocabularyWords = [
    { english: "apple", spanish: "manzana" },
    { english: "run", spanish: "correr" },
    // Añade más palabras...
  ];

  const irregularVerbs = [
    { base: "go", past: "went", participle: "gone", spanish: "ir" },
    { base: "eat", past: "ate", participle: "eaten", spanish: "comer" },
    // Añade más verbos...
  ];

  const listeningExercises = [
    { audio: "sound1.mp3", question: "What did you hear?", options: ["Cat", "Dog", "Bird"], answer: 0 },
    // Añade más ejercicios...
  ];

  // Efecto para el temporizador
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, timeLeft]);

  const startGame = (mode) => {
    setGameMode(mode);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setGameOver(false);
  };

  const endGame = () => {
    clearInterval(timerRef.current);
    setIsPlaying(false);
    setGameOver(true);
  };

  const resetGame = () => {
    setGameMode(null);
  };

  // Componentes de cada juego
  const VocabularyGame = () => {
    const [currentWord, setCurrentWord] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState("");

    const checkAnswer = () => {
      if (userAnswer.toLowerCase() === vocabularyWords[currentWord].english.toLowerCase()) {
        setScore(prev => prev + 10);
        setFeedback("¡Correcto! +10 puntos");
      } else {
        setFeedback(`Incorrecto. La respuesta era: ${vocabularyWords[currentWord].english}`);
      }

      setTimeout(() => {
        setCurrentWord(prev => (prev + 1) % vocabularyWords.length);
        setUserAnswer("");
        setFeedback("");
      }, 1500);
    };

    return (
      <div className="game-container">
        <h3>Traduce la palabra:</h3>
        <h2>{vocabularyWords[currentWord].spanish}</h2>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Escribe en inglés"
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
        />
        <button onClick={checkAnswer}>Comprobar</button>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    );
  };

  const VerbsGame = () => {
    const [currentVerb, setCurrentVerb] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const nextVerb = () => {
      setShowAnswer(false);
      setCurrentVerb(prev => (prev + 1) % irregularVerbs.length);
    };

    return (
      <div className="game-container">
        <h3>Completa el verbo:</h3>
        <p>Base: {irregularVerbs[currentVerb].base}</p>
        <p>Pasado: {showAnswer ? irregularVerbs[currentVerb].past : "?"}</p>
        <p>Participio: {showAnswer ? irregularVerbs[currentVerb].participle : "?"}</p>
        <p>Significado: {irregularVerbs[currentVerb].spanish}</p>
        
        {!showAnswer ? (
          <button onClick={() => setShowAnswer(true)}>Mostrar respuesta</button>
        ) : (
          <button onClick={nextVerb}>Siguiente verbo</button>
        )}
      </div>
    );
  };

  return (
    <div className="english-trainer-container">
      <h1>English Trainer</h1>
      
      {!gameMode ? (
        <div className="mode-selector">
          <h2>Elige un modo de juego:</h2>
          <div className="game-modes">
            <button onClick={() => startGame('vocabulary')}>
              Vocabulario
              <span>Traduce palabras</span>
            </button>
            <button onClick={() => startGame('verbs')}>
              Verbos irregulares
              <span>Practica formas verbales</span>
            </button>
            <button onClick={() => startGame('listening')}>
              Comprensión auditiva
              <span>Escucha y responde</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="game-header">
            <span>Puntuación: {score}</span>
            <span>Tiempo: {timeLeft}s</span>
            <button onClick={resetGame}>Salir</button>
          </div>

          {gameMode === 'vocabulary' && <VocabularyGame />}
          {gameMode === 'verbs' && <VerbsGame />}
          {gameMode === 'listening' && <div>Listening Game (En desarrollo)</div>}

          {gameOver && (
            <div className="game-over">
              <h2>¡Juego terminado!</h2>
              <p>Puntuación final: {score}</p>
              <button onClick={() => startGame(gameMode)}>Jugar otra vez</button>
              <button onClick={resetGame}>Elegir otro modo</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EnglishTrainer;