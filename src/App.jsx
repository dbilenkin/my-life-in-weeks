// src/App.jsx
import React from 'react';
import WeekGrid from './WeekGrid';
import './App.css';
import placesLived from './placesLived.json';

function App() {
  const birthDate = new Date('1977-03-19');

  // Places Lived Data


  const educationProfessional = [
    {
      label: 'High School',
      startDate: '2004-09-01',
      endDate: '2008-06-30',
    },
    {
      label: 'University',
      startDate: '2008-09-01',
      endDate: '2012-06-30',
    },
    {
      label: 'First Job',
      startDate: '2012-07-01',
      endDate: '2015-08-31',
    },
    {
      label: 'Current Job',
      startDate: '2015-09-01',
      endDate: '9999-12-31',
    },
  ];

  return (
    <div className="App">
      <h1>My Life in Weeks</h1>
      <h2>Places Lived</h2>
      <WeekGrid birthDate={birthDate} data={placesLived} />
      <h2>Education and Professional</h2>
      <WeekGrid birthDate={birthDate} data={educationProfessional} />
    </div>
  );
}

export default App;
