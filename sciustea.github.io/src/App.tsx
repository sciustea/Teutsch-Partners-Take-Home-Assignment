/* Stefana Ciustea
Take-Home Assignment for Teutsch Partners
10/06/2023 */

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previousResult, setPreviousResult] = useState<number | null>(null);

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        setPreviousResult(result);
        const changedInput = input.replace(/\^/g, '**');
        setResult(eval(changedInput));
      } catch (error) {
        setResult(null);
      }
    } else if (value === 'C' || value === 'Escape') {
      setInput('');
      setResult(null);
    } else if (value === '<-') {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else if (value === 'Backspace') {
      setInput((prevInput) => prevInput.slice(0, -1));
    } else {
      setInput((prevInput: string) => prevInput + value);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyboardInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (/^[0-9+\-*/^()=\s\b.]+$/.test(event.key)) {
      handleButtonClick(event.key);
    } else if (event.key === 'Enter') {
      handleButtonClick('=');
    } else if (event.key.toLowerCase() === 'c') {
      setInput('');
      setResult(null);
    } else if (event.key === 'Backspace') {
      setInput((prevInput) => prevInput.slice(0, -1));
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="calculator-title">
          <h1>Calculator</h1>
        </div>
      </header>
      <div className="calculator">
        <input
          type="text"
          value={result !== null ? String(result) : input}
          onChange={handleInputChange}
          onKeyDown={handleKeyboardInput}
          placeholder="0"
          ref={inputRef}
          className="calculator-input"
        />
        <div className="buttons">
          <div className="row">
            <button onClick={() => handleButtonClick('(')}>(</button>
            <button onClick={() => handleButtonClick(')')}>)</button>
            <button onClick={() => handleButtonClick('C')}>C</button>
            <button onClick={() => handleButtonClick('<-')}>←</button>
          </div>
          <div className="row">
            <button onClick={() => handleButtonClick('7')}>7</button>
            <button onClick={() => handleButtonClick('8')}>8</button>
            <button onClick={() => handleButtonClick('9')}>9</button>
            <button onClick={() => handleButtonClick('+')}>+</button>
          </div>
          <div className="row">
            <button onClick={() => handleButtonClick('4')}>4</button>
            <button onClick={() => handleButtonClick('5')}>5</button>
            <button onClick={() => handleButtonClick('6')}>6</button>
            <button onClick={() => handleButtonClick('-')}>-</button>
          </div>
          <div className="row">
            <button onClick={() => handleButtonClick('1')}>1</button>
            <button onClick={() => handleButtonClick('2')}>2</button>
            <button onClick={() => handleButtonClick('3')}>3</button>
            <button onClick={() => handleButtonClick('*')}>*</button>
          </div>
          <div className="row">
          <button onClick={() => handleButtonClick('0')}>0</button>
            <button onClick={() => handleButtonClick('.')}>.</button>
            <button onClick={() => handleButtonClick('^')}>^</button>
            <button onClick={() => handleButtonClick('/')}>/</button>
          </div>
          <div className="row">
            <button onClick={() => handleButtonClick('=')} className="equals-button">=</button>
          </div>
        </div>
        <div className="result">
          {result !== null ? <p>{result}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default App;


