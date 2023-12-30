import React, { useState, useEffect } from 'react';

const UnitConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState(0);
  const [inputUnit, setInputUnit] = useState('Celsius');
  const [outputUnit, setOutputUnit] = useState('Kelvin');

  const convertUnit = (value, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return value;

    const celsiusValue = convertToCelsius(value, fromUnit);
    switch (toUnit) {
      case 'Celsius':
        return celsiusValue;
      case 'Kelvin':
        return celsiusValue + 273.15;
      case 'Fahrenheit':
        return (celsiusValue * 9/5) + 32;
      default:
        return value;
    }
  };

  const convertToCelsius = (value, unit) => {
    switch (unit) {
      case 'Celsius':
        return value;
      case 'Kelvin':
        return value - 273.15;
      case 'Fahrenheit':
        return (value - 32) * (5/9);
      default:
        return value;
    }
  };

  const handleInputChange = (e) => {
    const value = parseFloat(e.target.value);
    setInputValue(value);
    const convertedValue = convertUnit(value, inputUnit, outputUnit);
    setOutputValue(convertedValue);
  };

  const handleInputUnitChange = (e) => {
    const unit = e.target.value;
    setInputUnit(unit);
    const convertedValue = convertUnit(inputValue, unit, outputUnit);
    setOutputValue(convertedValue);
  };

  const handleOutputUnitChange = (e) => {
    const unit = e.target.value;
    setOutputUnit(unit);
    const convertedValue = convertUnit(inputValue, inputUnit, unit);
    setOutputValue(convertedValue);
  };

  useEffect(() => {
    const convertedValue = convertUnit(inputValue, inputUnit, outputUnit);
    setOutputValue(convertedValue);
  }, [inputUnit, outputUnit]);

  return (
    <div>
      <label>
        <span>Value:</span>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        <span>Input Unit:</span>
        <select value={inputUnit} onChange={handleInputUnitChange}>
          <option value="Celsius">Celsius</option>
          <option value="Kelvin">Kelvin</option>
          <option value="Fahrenheit">Fahrenheit</option>
        </select>
      </label>
      <br />
      <label>
        <span>Output Unit:</span>
        <select value={outputUnit} onChange={handleOutputUnitChange}>
          <option value="Celsius">Celsius</option>
          <option value="Kelvin">Kelvin</option>
          <option value="Fahrenheit">Fahrenheit</option>
        </select>
      </label>
      <br />
      <p>Result: {outputValue} {outputUnit}</p>
    </div>
  );
};

export default UnitConverter;
