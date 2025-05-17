import React, { useState, useEffect, useRef } from 'react';

const words = [
  'react', 'javascript', 'css', 'html', 'frontend', 'backend', 'component', 'state'
];

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

const TypingTest = () => {
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentWord]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    if (!startTime) setStartTime(Date.now());

    if (value === currentWord) {
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000 / 60; // minutos
      setWpm((1 / timeTaken).toFixed(2));
      setCurrentWord(getRandomWord());
      setUserInput('');
      setStartTime(null);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Mecanografía</h3>
      <p>Escribe la palabra:</p>
      <h2>{currentWord}</h2>
      <input
        ref={inputRef}
        value={userInput}
        onChange={handleChange}
        autoFocus
        style={{ fontSize: 20, padding: 5 }}
      />
      {wpm && <p>Velocidad: {wpm} palabras por minuto</p>}
    </div>
  );
};

export default TypingTest;
