import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const PredictionReport = ({
  rockfallProbability,
  timeToImpact,
  factorOfSafety,
  trustScore,
  droneImages,
  geoDataFile,
  geoDataText,
  locationData,
  weatherData,
  sensorData,
}) => {
  const downloadPdf = async () => {
    const element = document.getElementById('prediction-report-content');
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    let imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('rockfall_prediction_report.pdf');
  };

  return (
    <div className="prediction-report-container" id="prediction-report-content">
      <h1 className="report-title">Rockfall Prediction Report</h1>

      <section className="report-section summary-section">
        <h2>Prediction Summary</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <strong>Rockfall Probability:</strong>
            <span className="summary-value">{rockfallProbability}%</span>
          </div>
          <div className="summary-item">
            <strong>Estimated Time to Impact:</strong>
            <span className="summary-value">{timeToImpact} hours</span>
          </div>
          <div className="summary-item">
            <strong>Factor of Safety (LEM):</strong>
            <span className="summary-value">{factorOfSafety}</span>
          </div>
          <div className="summary-item">
            <strong>Trust Score (AI vs LEM):</strong>
            <span className="summary-value">{trustScore}%</span>
          </div>
        </div>
      </section>

      {locationData && (
        <section className="report-section location-section">
          <h2>Location Information</h2>
          <p><strong>Site:</strong> {locationData.name}</p>
          <p><strong>Coordinates:</strong> Latitude {locationData.lat}, Longitude {locationData.lon}</p>
        </section>
      )}

      {weatherData && (
        <section className="report-section weather-section">
          <h2>Current Weather Conditions</h2>
          <p><strong>Temperature:</strong> {weatherData.temperature}</p>
          <p><strong>Humidity:</strong> {weatherData.humidity}</p>
          <p><strong>Rainfall (last 24h):</strong> {weatherData.rainfall}</p>
          <p><strong>Wind Speed:</strong> {weatherData.windSpeed}</p>
        </section>
      )}

      {droneImages.length > 0 && (
        <section className="report-section image-section">
          <h2>Drone Images Analyzed</h2>
          <div className="image-grid">
            {droneImages.map((img, idx) => (
              <img key={idx} src={URL.createObjectURL(img)} alt={`drone-analysis-${idx}`} />
            ))}
          </div>
        </section>
      )}

      {geoDataText && (
        <section className="report-section geo-data-section">
          <h2>Raw IOT Data Input</h2>
          <pre>{geoDataText}</pre>
        </section>
      )}

      {sensorData && sensorData.length > 0 && (
        <section className="report-section sensor-data-section">
          <h2>Sensor Data Analysis</h2>
          <div className="sensor-grid">
            {sensorData.map((sensor, idx) => (
              <div key={idx} className={`sensor-item sensor-${sensor.status}`}>
                <span className="sensor-icon" dangerouslySetInnerHTML={{ __html: sensor.icon }}></span>
                <p><strong>{sensor.name}:</strong> {sensor.value}</p>
                <p><strong>Threshold:</strong> {sensor.threshold}</p>
                <p className="sensor-status"><strong>Status:</strong> {sensor.status}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <button onClick={downloadPdf} className="download-pdf-button">
        Download as PDF
      </button>
    </div>
  );
};

export default PredictionReport;
