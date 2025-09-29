import React from 'react';

const PredictionReport = ({ predictionResult, predictionProbability, droneImages, geoDataFile, geoDataText, locationData, weatherData, sensorData }) => {
  // const handleExport = () => {
  //   alert('Export functionality is not yet implemented.');
  // };

  return (
    <div className="prediction-report-content">
      <div className="report-header-controls">
        <h2>Prediction Report</h2>
        {/* <button className="export-report-button" onClick={handleExport}>
          <span className="export-icon">&#x2B07;</span> Export
        </button> */}
      </div>
      <p><strong>Overall Result:</strong> <span className={`prediction-result-text ${predictionResult.toLowerCase().replace(/ /g, '-')}`}>{predictionResult}</span></p>
      <p><strong>Overall Probability:</strong> {predictionProbability}%</p>

      {locationData && (
        <div className="report-section">
          <h4>Location Details</h4>
          <div className="location-card-container">
            <div className="location-card">
              <span className="location-icon">&#x1F4CD;</span> {/* Pushpin icon */}
              <p><strong>Name:</strong> {locationData.name}</p>
            </div>
            <div className="location-card">
              <span className="location-icon">&#x1F30D;</span> {/* Globe with meridians icon */}
              <p><strong>Coordinates:</strong> Lat {locationData.lat}, Lon {locationData.lon}</p>
            </div>
          </div>
        </div>
      )}

      <h3>Input Data Summary</h3>
      {(droneImages && droneImages.length > 0) && (
        <div className="report-card input-summary-card">
          <h4><span className="input-icon">&#x1F4F8;</span> Drone Images ({droneImages.length} uploaded)</h4>
          <div className="preview-grid-report">
            {droneImages.map((img, idx) => (
              <div key={idx} className="preview-thumb-report">
                <img src={URL.createObjectURL(img)} alt={`drone-report-${idx}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      {(geoDataFile || geoDataText) && (
        <div className="report-card input-summary-card">
          <h4><span className="input-icon">&#x1F4C4;</span> Geotechnical Data</h4>
          {geoDataFile && <p><strong>File:</strong> <span className="geo-file-name">{geoDataFile.name}</span></p>}
          {geoDataText && (
            <div className="geo-data-display">
              <p><strong>Manual Input:</strong></p>
              <pre>{geoDataText}</pre>
            </div>
          )}
        </div>
      )}

      <div className="report-section detailed-analysis-card">
        <h3>Detailed Analysis</h3>
        <p className="analysis-intro">Based on the input data and prediction model, here's a detailed analysis:</p>

        {/* Overall Prediction Summary */}
        <div className="analysis-subsection">
          <h4><span className="analysis-icon">&#x1F50E;</span> Overall Prediction Summary</h4>
          <p>The system predicts a <strong><span className={`prediction-result-text ${predictionResult.toLowerCase().replace(/ /g, '-')}`}>{predictionResult}</span></strong> with an estimated probability of <strong>{predictionProbability}%</strong>.</p>
          <p>This prediction takes into account drone imagery, geotechnical data, and real-time sensor readings from the area.</p>
        </div>

        {/* Sensor Readings Analysis */}
        {sensorData && sensorData.length > 0 && (
          <div className="analysis-subsection">
            <h4><span className="analysis-icon">&#x1F4C8;</span> Sensor Readings Analysis</h4>
            <p>Current sensor readings indicate:</p>
            <div className="sensor-data-grid-report">
              {sensorData.map((sensor, idx) => (
                <div key={idx} className={`sensor-card ${sensor.status}`}>
                  <span className="sensor-icon" dangerouslySetInnerHTML={{ __html: sensor.icon }}></span>
                  <p className="sensor-name">{sensor.name}</p>
                  <p className="sensor-value">{sensor.value}</p>
                  <p className="sensor-threshold">Threshold: {sensor.threshold}</p>
                  <span className="sensor-status-icon" dangerouslySetInnerHTML={{ __html: sensor.status === 'ok' ? '&#x2714;' : (sensor.status === 'warning' ? '&#x26A0;' : '&#x2716;') }}></span>
                </div>
              ))}
            </div>
            <p>Trends show {predictionResult === 'High Risk of Rockfall' ? 'an increasing trend in critical parameters.' : 'stable conditions across most monitored parameters.'}</p>
          </div>
        )}

        {/* Geological Conditions Analysis (Mock Data) */}
        <div className="analysis-subsection">
          <h4><span className="analysis-icon">&#x1F3D4;&#xFE0F;</span> Geological Conditions Analysis</h4>
          <div className="geological-analysis-content">
            <p>The geological assessment reveals the presence of highly fractured rock masses with a moderate dip angle, contributing to the observed instability. Historical data suggests the presence of weathered rock layers susceptible to water infiltration.</p>
            <p>Located at {locationData?.name || 'an unspecified location'}, the area is known for:</p>
            <ul>
              {locationData?.name === 'Jharia Coalfield - Section A' && (
                <>
                  <li>Complex stratigraphy</li>
                  <li>Active fault lines</li>
                </>
              )}
              {locationData?.name !== 'Jharia Coalfield - Section A' && (
                <li>Stable but monitored geological formations</li>
              )}
            </ul>
          </div>
        </div>

        {/* Recommendations for Mitigation or Further Investigation (Mock Data) */}
        <div className="analysis-subsection">
          <h4><span className="analysis-icon">&#x1F6A7;</span> Recommendations</h4>
          <ul className="recommendations-list">
            {predictionResult === 'High Risk of Rockfall' ? (
              <>
                <li className="recommendation-high-risk">Immediate evacuation of non-essential personnel from the affected zone.</li>
                <li className="recommendation-high-risk">Deployment of additional monitoring equipment (e.g., crack meters, extensometers).</li>
                <li className="recommendation-high-risk">Initiate emergency rockfall protection measures, such as netting or barriers.</li>
                <li className="recommendation-high-risk">Detailed geotechnical survey to identify exact failure mechanisms.</li>
              </>
            ) : (
              <>
                <li className="recommendation-low-moderate-risk">Continue routine monitoring of all sensor parameters.</li>
                <li className="recommendation-low-moderate-risk">Schedule a follow-up geological inspection within the next month.</li>
                <li className="recommendation-low-moderate-risk">Review and update emergency response protocols.</li>
              </>
            )}
          </ul>
        </div>

        {/* Comparison with Similar Incision */}
        <div className="analysis-subsection">
          <h4><span className="analysis-icon">&#x1F4CA;</span> Comparison with Similar Incision</h4>
          {predictionResult === 'High Risk of Rockfall' ? (
            <p>Similar incidents in regions with comparable geological and environmental conditions have shown that early warning systems and rapid response are crucial in minimizing impact and ensuring safety.</p>
          ) : (
            <p>Similar incidents in regions with comparable geological and environmental conditions have shown that proactive monitoring prevents major incidents.</p>
          )}
          <p>This situation shares characteristics with the 'Mountain View Slide of 2022' where inadequate drainage exacerbated slope instability.</p>
        </div>
      </div>
    </div>
  );
};

export default PredictionReport;
