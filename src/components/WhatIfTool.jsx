import React, { useState } from 'react';
import './WhatIfTool.css';

const WhatIfTool = ({ onBackToPrediction, droneImages }) => {
  const [scenario, setScenario] = useState(''); // 'rainfall', 'blasting', 'temperature'
  const [rainfallInput, setRainfallInput] = useState({ amount: '', duration: '' });
  const [blastingInput, setBlastingInput] = useState({ charge: '', proximity: '' });
  const [temperatureInput, setTemperatureInput] = useState({ cold: '', thaw: '' });
  const [simulationResult, setSimulationResult] = useState(null);

  const handleRunSimulation = () => {
    // Simulate API call or complex logic based on scenario
    let result = {};

    // Simulate analysis of drone images for more detailed output
    const imageAnalysis = droneImages.length > 0 
      ? `Analyzed ${droneImages.length} drone image(s). Visual assessment indicates potential for `
      : 'No drone images provided for visual assessment. ';

    if (scenario === 'rainfall') {
      const baseOutput = 'Factor of Safety drops dramatically in specific areas due to high Pore Water Pressure.';
      const imageEffect = droneImages.length > 0 && parseFloat(rainfallInput.amount) > 80 && parseFloat(rainfallInput.duration) > 10
        ? 'Drone imagery reveals existing micro-fractures exacerbated by simulated heavy rainfall, leading to advanced saturation zones.'
        : 'No additional visual insights from drone imagery for rainfall scenario.';
      
      let rainfallRisk = 'Low';
      if (parseFloat(rainfallInput.amount) > 100 && parseFloat(rainfallInput.duration) > 24) {
        rainfallRisk = 'High';
      } else if (parseFloat(rainfallInput.amount) > 50 && parseFloat(rainfallInput.duration) > 12) {
        rainfallRisk = 'Moderate';
      }

      result = {
        scenario: 'Rainfall',
        input: rainfallInput,
        output: `${baseOutput} ${imageAnalysis}${imageEffect}`,
        map: 'Hidden failure points revealed during monsoon events, with drone overlay highlighting precise instability zones.',
        riskLevel: rainfallRisk
      };
    } else if (scenario === 'blasting') {
      const baseOutput = 'Critically unstable areas identified post-blast.';
      const imageEffect = droneImages.length > 0 && parseFloat(blastingInput.charge) > 400
        ? 'Drone imagery pre-blast shows existing stress concentrations, predicting exacerbated damage in these zones from simulated blasting.'
        : 'No additional visual insights from drone imagery for blasting scenario.';

      let blastingRisk = 'Low';
      if (parseFloat(blastingInput.charge) > 600 || parseFloat(blastingInput.proximity) < 15) {
        blastingRisk = 'High';
      } else if (parseFloat(blastingInput.charge) > 300 || parseFloat(blastingInput.proximity) < 30) {
        blastingRisk = 'Moderate';
      }

      result = {
        scenario: 'Blasting',
        input: blastingInput,
        output: `${baseOutput} ${imageAnalysis}${imageEffect}`,
        map: 'System generates a map highlighting which areas would become critically unstable post-blast, allowing adjustments to explosive pattern or timing. Drone data provides precise coordinates for at-risk areas.',
        riskLevel: blastingRisk
      };
    } else if (scenario === 'temperature') {
      const baseOutput = 'Slopes susceptible to thermal fatigue identified.';
      const imageEffect = droneImages.length > 0 && parseFloat(temperatureInput.cold) < 0 && parseFloat(temperatureInput.thaw) > 0
        ? 'Drone imagery indicates existing hairline cracks expanding due to simulated freeze-thaw cycles, indicating increased thermal fatigue.'
        : 'No additional visual insights from drone imagery for temperature scenario.';

      let temperatureRisk = 'Low';
      if (parseFloat(temperatureInput.cold) < -5 && parseFloat(temperatureInput.thaw) > 5) {
        temperatureRisk = 'High';
      } else if (parseFloat(temperatureInput.cold) < 0 && parseFloat(temperatureInput.thaw) > 0) {
        temperatureRisk = 'Moderate';
      }

      result = {
        scenario: 'Temperature',
        input: temperatureInput,
        output: `${baseOutput} ${imageAnalysis}${imageEffect}`,
        map: 'Output identifies slopes susceptible to thermal fatigue, guiding immediate monitoring measures during seasonal transitions. Drone data assists in pinpointing most vulnerable slope sections.',
        riskLevel: temperatureRisk
      };
    }
    setSimulationResult(result);
  };

  return (
    <div className="what-if-tool-container">
      <div className="what-if-tool-header">
        <h2>Rockfall Simulator</h2>
        <button className="back-button" onClick={onBackToPrediction}>Back to Prediction</button>
      </div>
      <p className="tool-description">
        Virtually experiment with extreme conditions to understand their risks before they occur in the real world.
      </p>

      <div className="scenario-selection">
        <h3>Select a Scenario:</h3>
        <div className="scenario-buttons">
          <button
            className={`scenario-button ${scenario === 'rainfall' ? 'active' : ''}`}
            onClick={() => setScenario('rainfall')}
          >
            Rainfall Scenario
          </button>
          <button
            className={`scenario-button ${scenario === 'blasting' ? 'active' : ''}`}
            onClick={() => setScenario('blasting')}
          >
            Blasting Scenario
          </button>
          <button
            className={`scenario-button ${scenario === 'temperature' ? 'active' : ''}`}
            onClick={() => setScenario('temperature')}
          >
            Temperature Scenario
          </button>
        </div>
      </div>

      {scenario === 'rainfall' && (
        <div className="scenario-input-card">
          <h4>Rainfall Scenario: Testing the Water Trigger</h4>
          <p>Specify rainfall intensity and duration.</p>
          <div className="input-group">
            <label>Rainfall Amount (mm):</label>
            <input
              type="number"
              value={rainfallInput.amount}
              onChange={(e) => setRainfallInput({ ...rainfallInput, amount: e.target.value })}
              placeholder="e.g., 100"
              min="0"
            />
          </div>
          <div className="input-group">
            <label>Duration (hours):</label>
            <input
              type="number"
              value={rainfallInput.duration}
              onChange={(e) => setRainfallInput({ ...rainfallInput, duration: e.target.value })}
              placeholder="e.g., 12"
              min="0"
            />
          </div>
          <button className="run-simulation-button" onClick={handleRunSimulation}>Run Rainfall Simulation</button>
        </div>
      )}

      {scenario === 'blasting' && (
        <div className="scenario-input-card">
          <h4>Blasting Scenario: Testing the Human Trigger</h4>
          <p>Define blast charge and proximity to slope.</p>
          <div className="input-group">
            <label>Charge Size (kg TNT equivalent):</label>
            <input
              type="number"
              value={blastingInput.charge}
              onChange={(e) => setBlastingInput({ ...blastingInput, charge: e.target.value })}
              placeholder="e.g., 500"
              min="0"
            />
          </div>
          <div className="input-group">
            <label>Proximity to Slope (meters):</label>
            <input
              type="number"
              value={blastingInput.proximity}
              onChange={(e) => setBlastingInput({ ...blastingInput, proximity: e.target.value })}
              placeholder="e.g., 20"
              min="0"
            />
          </div>
          <button className="run-simulation-button" onClick={handleRunSimulation}>Run Blasting Simulation</button>
        </div>
      )}

      {scenario === 'temperature' && (
        <div className="scenario-input-card">
          <h4>Temperature Scenario: Testing the Climate Trigger</h4>
          <p>Specify extreme cold and rapid thaw temperatures.</p>
          <div className="input-group">
            <label>Extreme Cold (°C):</label>
            <input
              type="number"
              value={temperatureInput.cold}
              onChange={(e) => setTemperatureInput({ ...temperatureInput, cold: e.target.value })}
              placeholder="e.g., -10"
            />
          </div>
          <div className="input-group">
            <label>Rapid Thaw (°C):</label>
            <input
              type="number"
              value={temperatureInput.thaw}
              onChange={(e) => setTemperatureInput({ ...temperatureInput, thaw: e.target.value })}
              placeholder="e.g., 10"
            />
          </div>
          <button className="run-simulation-button" onClick={handleRunSimulation}>Run Temperature Simulation</button>
        </div>
      )}

      {simulationResult && (
        <div className="simulation-results-card">
          <h3>Simulation Results for {simulationResult.scenario}</h3>
          <p><strong>Input:</strong> {JSON.stringify(simulationResult.input)}</p>
          <p><strong>Simulation Output:</strong> {simulationResult.output}</p>
          <p><strong>Impact:</strong> {simulationResult.map}</p>
          <div className="risk-level-display">
            <h4>Simulated Risk Level: <span className={`risk-${simulationResult.riskLevel}`}>{simulationResult.riskLevel}</span></h4>
          </div>

        </div>
      )}
    </div>
  );
};

export default WhatIfTool;
