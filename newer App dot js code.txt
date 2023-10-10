import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        setResult(eval(input));
      } catch (error) {
        setResult(null);
      }
    } else if (value === 'C') {
      setInput('');
      setResult(null);
    } else {
      setInput((prevInput: string) => prevInput + value);
    }
  };

  const handleKeyboardInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (/^[0-9+\-*/^()=\s\b]+$/.test(event.key)) {
      handleButtonClick(event.key);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Calculator</h1>
      </header>
      <div className="calculator">
        <input
          type="text"
          value={input}
          onKeyPress={handleKeyboardInput}
          placeholder="0"
        />
        <div className="buttons">
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
            <button onClick={() => handleButtonClick('^')}>^</button>
            <button onClick={() => handleButtonClick('(')}>(</button>
            <button onClick={() => handleButtonClick(')')}>)</button>
          </div>
          <div className="row">
            <button onClick={() => handleButtonClick('C')}>C</button>
            <button onClick={() => handleButtonClick('=')}>=</button>
            <button onClick={() => handleButtonClick('/')}>/</button>
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
