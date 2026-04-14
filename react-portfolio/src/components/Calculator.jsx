import { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [result, setResult] = useState('');

  const appendToResult = (char) => {
    setResult(result + char);
  };

  const clearResult = () => {
    setResult('');
  };

  const calculateResult = () => {
    try {
      const calculatedResult = eval(result);
      setResult(calculatedResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="calculator">
      <input type="text" id="result" value={result} readOnly />
      <div className="calculator-buttons">
        <button onClick={clearResult}>C</button>
        <button onClick={() => appendToResult('7')}>7</button>
        <button onClick={() => appendToResult('8')}>8</button>
        <button onClick={() => appendToResult('9')}>9</button>
        <button onClick={() => appendToResult('/')}>/</button>

        <button onClick={() => appendToResult('4')}>4</button>
        <button onClick={() => appendToResult('5')}>5</button>
        <button onClick={() => appendToResult('6')}>6</button>
        <button onClick={() => appendToResult('*')}>*</button>

        <button onClick={() => appendToResult('1')}>1</button>
        <button onClick={() => appendToResult('2')}>2</button>
        <button onClick={() => appendToResult('3')}>3</button>
        <button onClick={() => appendToResult('-')}>-</button>

        <button onClick={() => appendToResult('0')} className="span-2">0</button>
        <button onClick={() => appendToResult('.')}>.</button>
        <button onClick={() => appendToResult('+')}>+</button>
        <button onClick={calculateResult}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
