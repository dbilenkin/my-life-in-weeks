// src/WeekGrid.jsx
import React from 'react';
import './WeekGrid.css';

const WeekGrid = ({ birthDate, data }) => {
  const totalWeeks = 90 * 52;
  const weeks = [];

  // Map labels to colors
  const labelColorMap = {};

  // Function to generate colors dynamically
  function generateColor(index) {
    const goldenAngle = 137.508; // Golden angle in degrees
    const hue = (goldenAngle * index) % 360; // Ensure hue stays within [0, 360]
    const saturation = 75; // High saturation for vivid colors
    const lightness = 45; // Low lightness for darker colors
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  // Preprocess data to convert dates and assign colors
  const processedData = data.map((item, index) => {
    if (!labelColorMap[item.label]) {
      // Generate a new color
      const color = generateColor(Object.keys(labelColorMap).length);
      labelColorMap[item.label] = color;
    }
    return {
      ...item,
      startDate: new Date(item.startDate),
      endDate: new Date(item.endDate),
      color: labelColorMap[item.label],
    };
  });

  // Generate the weeks grid
  for (let i = 0; i < totalWeeks; i++) {
    const weekStartDate = new Date(birthDate);
    weekStartDate.setDate(weekStartDate.getDate() + i * 7);

    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);

    // Find data points that cover this week
    const weekDataPoints = processedData.filter(
      (item) =>
        weekStartDate <= item.endDate && weekEndDate >= item.startDate
    );

    // Get the color from the first matching data point
    const color =
      weekDataPoints.length > 0
        ? weekDataPoints[0].color
        : '#e0e0e0'; // Default color for no data

    // Tooltip with labels
    const tooltip =
      weekDataPoints
        .map((item) => `${item.label}`)
        .join('\n') || `Week ${i + 1}: ${weekStartDate.toDateString()}`;

    weeks.push(
      <div
        key={i}
        className="week-box"
        style={{ backgroundColor: color }}
        title={tooltip}
      ></div>
    );
  }

  // Generate the legend items
  const legendItems = Object.entries(labelColorMap).map(([label, color]) => (
    <div key={label} className="legend-item">
      <span className="legend-color" style={{ backgroundColor: color }}></span>
      <span className="legend-label">{label}</span>
    </div>
  ));

  return (
    <div className="week-grid-container">
      <div className="week-grid">{weeks}</div>
      <div className="legend">
        <h3>Legend</h3>
        {legendItems}
      </div>
    </div>
  );
};

export default WeekGrid;
