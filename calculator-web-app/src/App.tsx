/* Stefana Ciustea
Take-Home Assignment for Teutsch Partners
10/06/2023 */

import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App: React.FC = () => {
  // State variables to store user input, calculation result, and previous result.
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previousResult, setPreviousResult] = useState<number | null>(null);

  // Function to handle button clicks in the calculator.
  const handleButtonClick = (value: string) => {
    if (value === '=') {
      // Evaluate the input when the "=" button is clicked and handle any errors.
      try {
        // Store the previous result and replace "^" with "**" for exponentiation.
        setPreviousResult(result);
        const changedInput = input.replace(/\^/g, '**');
        setResult(eval(changedInput));
      } catch (error) {
        setResult(null);
      }
    } else if (value === 'C' || value === 'Escape') {
      // Clear the input and result when "C" or "Escape" is clicked.
      setInput('');
      setResult(null);
    } else if (value === '<-') {
      // Remove the last character from the input.
      setInput((prevInput) => prevInput.slice(0, -1));
    } else if (value === 'Backspace') {
      // Remove the last character from the input.
      setInput((prevInput) => prevInput.slice(0, -1));
    } else {
      // Append the clicked value to the input.
      setInput((prevInput: string) => prevInput + value);
    }
  };

  // Function to handle input change in the text input.
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  // Function to handle keyboard input in the text input.
  const handleKeyboardInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (/^[0-9+\-*/^()=\s\b.]+$/.test(event.key)) {
      // Handle valid input characters.
      handleButtonClick(event.key);
    } else if (event.key === 'Enter') {
      // Treat "Enter" as "=" for calculation.
      handleButtonClick('=');
    } else if (event.key.toLowerCase() === 'c') {
      // Clear input and result on "c" key press.
      setInput('');
      setResult(null);
    } else if (event.key === 'Backspace') {
      // Remove the last character from the input.
      setInput((prevInput) => prevInput.slice(0, -1));
    }
  };

  // Focus on the input field when the component is mounted.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Render the calculator UI.
  return (
    <div className="App">
      <header className="App-header">
        <div className="calculator-title">
          <h1>Calculator</h1>
        </div>
      </header>
      <div className="calculator">
        {/* Input field for displaying and entering expressions. */}
        <input
          type="text"
          value={result !== null ? String(result) : input}
          onChange={handleInputChange}
          onKeyDown={handleKeyboardInput}
          placeholder="0"
          ref={inputRef}
          className="calculator-input"
        />
        {/* Calculator buttons */}
        <div className="buttons">
          {/* Buttons arranged in rows */}
          {/* Each button click is handled by the handleButtonClick function */}
          <div className="row">
            <button onClick={() => handleButtonClick('(')}>(</button>
            <button onClick={() => handleButtonClick(')')}>)</button>
            <button onClick={() => handleButtonClick('C')}>C</button>
            <button onClick={() => handleButtonClick('<-')}>←</button>
          </div>
          {/* More rows of buttons for digits and operators */}
        </div>
        {/* Display the calculation result */}
        <div className="result">
          {result !== null ? <p>{result}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default App;
