import { useState, useEffect } from 'react';
import './Apli_calculo.css';

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

function Apli_calculo() {
  const [question, setQuestion] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setQuestion(generateQuestion());
  }, []);

  const checkAnswer = () => {
    if (parseInt(userAnswer) === question.answer) {
      setScore(score + 1);
      setMessage('¡Correcto!');
    } else {
      setMessage(`Incorrecto. Era ${question.answer}`);
    }
    setUserAnswer('');
    setQuestion(generateQuestion());
  };

  return (
    <div className="game-container">
      <h1>Cálcula los tomates</h1>
      <p className="question">¿Cuánto es {question.question}?</p>
      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="answer-input"
      />
      <button onClick={checkAnswer} className="check-button">
        Comprobar
      </button>
      <div className="message">{message}</div>
      <div className="score">Puntaje: {score}</div>
    </div>
  );
}

export default Apli_calculo;
