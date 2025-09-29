import React, { useState } from 'react';
import './PredictionPage.css';
import PredictionReport from './PredictionReport'; // Import the new component
import WhatIfTool from './WhatIfTool'; // Import the WhatIfTool component

const PredictionPage = () => {
  const [droneImages, setDroneImages] = useState([]);
  const [geoDataFile, setGeoDataFile] = useState(null);
  const [geoDataText, setGeoDataText] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [predictionProbability, setPredictionProbability] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [sensorData, setSensorData] = useState(null);
  const [timeToImpact, setTimeToImpact] = useState(null);
  const [showWhatIfTool, setShowWhatIfTool] = useState(false);

  // Handle drone image upload
  const handleDroneImageChange = (e) => {
    setDroneImages(Array.from(e.target.files));
  };

  // Handle geotechnical data file upload
  const handleGeoDataFileChange = (e) => {
    setGeoDataFile(e.target.files[0]);
    setGeoDataText(''); // Clear manual input if file is uploaded
  };

  // Handle manual geotechnical data input
  const handleGeoDataTextChange = (e) => {
    setGeoDataText(e.target.value);
    setGeoDataFile(null); // Clear file if manual input is used
  };

  const handleGeneratePrediction = () => {
    // Simulate prediction logic
    // In a real application, this would involve sending data to a backend for actual prediction
    console.log("Generating prediction...");
    console.log("Drone Images:", droneImages);
    console.log("Geotechnical Data File:", geoDataFile);
    console.log("Geotechnical Data Text:", geoDataText);

    // Simulate a prediction result and probability
    const simulatedProbability = Math.floor(Math.random() * 100) + 1; // 1-100%
    setPredictionProbability(simulatedProbability);

    // Simulate location data (you might get this from an API or user input)
    setLocationData({ name: 'Jharia Coalfield - Section A', lat: 23.75, lon: 86.42 });

    // Simulate weather data
    setWeatherData({
      temperature: '32°C',
      humidity: '75%',
      rainfall: '125mm (last 24h)',
      windSpeed: '15 km/h',
    });

    // Simulate sensor data based on the image provided
    setSensorData([
      { name: 'Strain', value: '78µε', threshold: '75µε', status: 'exceeded', icon: '&#x23F1;' },
      { name: 'Temperature', value: '32°C', threshold: '40°C', status: 'ok', icon: '&#x1F321;' }, // Ensure icon is thermometer
      { name: 'Rainfall', value: '125mm', threshold: '100mm', status: 'exceeded', icon: '&#x1F327;' },
      { name: 'Pore Pressure', value: '45kPa', threshold: '50kPa', status: 'warning', icon: '&#x203B;' },
      { name: 'Slope Angle', value: '67°', threshold: '60°', status: 'exceeded', icon: '&#x2302;' },
      { name: 'Vibration', value: '0.8mm/s', threshold: '1mm/s', status: 'ok', icon: '&#x1F55B;' },
    ]);

    if (simulatedProbability > 70) {
      setPredictionResult('High Risk of Rockfall');
      const highRiskTimes = ['0-6 hours', '6-12 hours', '12-24 hours'];
      setTimeToImpact(highRiskTimes[Math.floor(Math.random() * highRiskTimes.length)]);
    } else if (simulatedProbability > 40) {
      setPredictionResult('Moderate Risk of Rockfall');
      const moderateRiskTimes = ['24-48 hours', '48-72 hours'];
      setTimeToImpact(moderateRiskTimes[Math.floor(Math.random() * moderateRiskTimes.length)]);
    } else {
      setPredictionResult('Low Risk of Rockfall');
      const lowRiskTimes = ['Beyond 72 hours', 'Beyond 1 week'];
      setTimeToImpact(lowRiskTimes[Math.floor(Math.random() * lowRiskTimes.length)]);
    }
    setShowReport(false); // Hide report when new prediction is generated
  };

  const handleGenerateReport = () => {
    setShowReport(true);
  };

  const handleBackToPrediction = () => {
    setShowReport(false);
  };

  return (
    <div className="prediction-page-root">
      <header className="alerts-page-header">
        <div className="alerts-page-title-container">
          <h1 className="alerts-page-title">Rockfall Prediction</h1>
          <div className="alerts-page-title-underline"></div>
        </div>
      </header>
      <div className="prediction-sections">
        {/* Image Data Upload Section */}
        <div className="prediction-card">
          <h2>Upload Image Data</h2>
          <p>Upload one or more image data files (JPG, PNG, etc.) for analysis.</p>
          <label className="dropzone">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleDroneImageChange}
              style={{ display: 'none' }}
            />
            <div className="dropzone-content">
              <span className="dropzone-icon">📷</span>
              <span className="dropzone-text">Click or drag images here to upload</span>
            </div>
          </label>
          <div className="preview-grid">
            {droneImages.map((img, idx) => (
              <div key={idx} className="preview-thumb">
                <img src={URL.createObjectURL(img)} alt={`image-${idx}`} />
              </div>
            ))}
            {droneImages.length === 0 && <span className="no-uploaded">No images uploaded.</span>}
          </div>
        </div>
        {/* Geotechnical Data Upload/Input Section */}
        <div className="prediction-card">
          <h2>IOT Data</h2>
          <p>Upload a CSV file or enter data manually (e.g., from piezometers, inclinometers, etc.).</p>
          <label className="custom-upload-btn">
            <input
              type="file"
              accept=".csv"
              onChange={handleGeoDataFileChange}
              style={{ display: 'none' }}
            />
            <span>Upload CSV</span>
          </label>
          <div className="csv-filename">{geoDataFile ? geoDataFile.name : 'No CSV uploaded.'}</div>
          <div className="or-divider">OR</div>
          <textarea
            rows={6}
            placeholder="Paste or type IOT data here (CSV format or tabular)..."
            value={geoDataText}
            onChange={handleGeoDataTextChange}
            className="geo-textarea"
          />
        </div>
      </div>

      <div className="generate-prediction-container">
        <button
          className="generate-prediction-button"
          onClick={handleGeneratePrediction}
          disabled={droneImages.length === 0 && !geoDataFile && !geoDataText}
        >
          Generate Predictions
        </button>
      </div>

      {predictionResult && predictionProbability !== null && (
        <div className="prediction-results-card">
          <h2>Prediction Results</h2>
          <div className="prediction-summary">
            <p><strong>Result:</strong> <span className={`prediction-result-text ${predictionResult.toLowerCase().replace(/ /g, '-')}`}>{predictionResult}</span></p>
            <p><strong>Probability:</strong> {predictionProbability}%</p>
            <div className="probability-bar-container">
              <div
                className={`probability-bar ${predictionResult.includes('High') ? 'high-risk' : predictionResult.includes('Moderate') ? 'moderate-risk' : 'low-risk'}`}
                style={{ '--fill-width': `${predictionProbability}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {predictionResult && predictionProbability !== null && timeToImpact && (
        <div className="time-to-impact-container">
          <p><strong>Estimated Time to Impact:</strong> <span className="time-to-impact-text">{timeToImpact}</span></p>
          <div className="timeline-bar">
            <div
              className={
                `timeline-fill ${
                  predictionResult.includes('High')
                    ? 'high-risk'
                    : predictionResult.includes('Moderate')
                    ? 'moderate-risk'
                    : 'low-risk'
                }`
              }
              style={{
                '--fill-width': predictionResult.includes('High') ? '100%' : predictionResult.includes('Moderate') ? '50%' : '20%',
              }}
            ></div>
          </div>
        </div>
      )}

      {showWhatIfTool && (
        <WhatIfTool onBackToPrediction={() => setShowWhatIfTool(false)} droneImages={droneImages} />
      )}

      {!showWhatIfTool && predictionResult && !showReport && (
        <div className="generate-report-container">
          <button className="generate-report-button" onClick={handleGenerateReport}>
            Generate Report
          </button>
          <button className="what-if-tool-button" onClick={() => setShowWhatIfTool(true)}>
            What-if Tool
          </button>
        </div>
      )}

      {!showWhatIfTool && showReport && predictionResult && (
        <div className="prediction-report-section">
          <button className="back-to-prediction-button" onClick={handleBackToPrediction}>Back to Prediction</button>
          <PredictionReport
            predictionResult={predictionResult}
            predictionProbability={predictionProbability}
            droneImages={droneImages}
            geoDataFile={geoDataFile}
            geoDataText={geoDataText}
            locationData={locationData}
            weatherData={weatherData}
            sensorData={sensorData}
          />
        </div>
      )}
    </div>
  );
};

export default PredictionPage;
