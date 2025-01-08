import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);

  const generatePassword = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:',.<>?";
    let characters = letters;

    if (includeNumbers) characters += numbers;
    if (includeSpecialChars) characters += specialChars;

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSpecialChars]);

  return (
    <div className="password-generator">
      <h2>Password Generator</h2>
      <div className="password-display-wrapper">
        <input
          type="text"
          value={password}
          readOnly
          className="password-display"
        />
        <button
          onClick={() => navigator.clipboard.writeText(password)}
          className="copy-btn"
        >
          Copy
        </button>
      </div>
      <div className="controls">
        <div className="slider-control">
          <label>Length: {length}</label>
          <input
            type="range"
            min="4"
            max="30"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </div>
        <div className="checkbox-control">
          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Include Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={includeSpecialChars}
              onChange={(e) => setIncludeSpecialChars(e.target.checked)}
            />
            Include Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;