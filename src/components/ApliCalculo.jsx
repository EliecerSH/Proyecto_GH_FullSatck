import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import '../styles/ApliCalculo.css';

const getRandomInt = (max) => Math.floor(Math.random() * max);

const generateQuestion = () => {
  const a = getRandomInt(10);
  const b = getRandomInt(10);
  const op = ['+', '-', '*'][getRandomInt(3)];
  let result;
  switch (op) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '*': result = a * b; break;
  }
  return { question: `${a} ${op} ${b}`, answer: result };
};

function ApliCalculo() {
  const [question, setQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const userId = 'usuario_demo';

  const newQuestion = () => {
    setQuestion(generateQuestion());
    setTimeLeft(10);
    setUserAnswer('');
  };

  const startGame = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setScore(0);
    setMessage('');
    setHistory([]);
    newQuestion();
  };

  const togglePause = () => {
    if (isPaused) {
      newQuestion();
    }
    setIsPaused(!isPaused);
  };

  const checkAnswer = () => {
    if (!isPlaying || isPaused) return;
    const correct = parseInt(userAnswer) === question.answer;
    const updatedScore = correct ? score + 1 : 0;

    setScore(updatedScore);
    setMessage(correct ? '¡Correcto!' : `Incorrecto. Era ${question.answer}`);
    setHistory((prev) => [
      ...prev,
      { ...question, correct, user: userAnswer }
    ]);

    if (updatedScore > bestScore) {
      setBestScore(updatedScore);
      saveBestScoreToFirestore(updatedScore);
    }

    newQuestion();
  };

  const saveBestScoreToFirestore = async (score) => {
    try {
      await setDoc(doc(db, "scores", userId), {
        bestScore: score
      });
    } catch (error) {
      console.error("Error al guardar el puntaje:", error);
    }
  };

  useEffect(() => {
    const fetchBestScore = async () => {
      try {
        const docRef = doc(db, "scores", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBestScore(docSnap.data().bestScore);
        }
      } catch (error) {
        console.error("Error al obtener el puntaje:", error);
      }
    };

    fetchBestScore();
  }, []);

  useEffect(() => {
    if (!isPlaying || isPaused) return;
    if (timeLeft <= 0) {
      setMessage(`Tiempo agotado. Era ${question.answer}`);
      setHistory((prev) => [
        ...prev,
        { ...question, correct: false, user: 'Tiempo agotado' }
      ]);
      setScore(0);
      newQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isPaused, timeLeft, question]);

  return (
    <div className="game-container">
      <h1>Cálcula los tomates</h1>

      {!isPlaying ? (
        <button onClick={startGame} className="start-button">
          Iniciar Juego
        </button>
      ) : (
        <>
          <p className="question">¿Cuánto es {question.question}?</p>
          <p className="timer">Tiempo restante: {timeLeft}s</p>

          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isPaused) checkAnswer();
            }}
            className="answer-input"
            disabled={isPaused}
          />

          <div>
            <button onClick={checkAnswer} className="check-button" disabled={isPaused}>
              Comprobar
            </button>
            <button onClick={togglePause} className="pause-button">
              {isPaused ? 'Reanudar' : 'Pausar'}
            </button>
          </div>

          <div className="message">{message}</div>
          <div className="score">Puntaje actual: {score}</div>
          <div className="best-score">Mejor puntaje: {bestScore}</div>

          <h2>Historial</h2>
          <ul className="history">
            {history.map((entry, index) => (
              <li key={index} className={entry.correct ? 'correct' : 'incorrect'}>
                {entry.question} = {entry.answer} | Tú: {entry.user} → {entry.correct ? '✅' : '❌'}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ApliCalculo;
