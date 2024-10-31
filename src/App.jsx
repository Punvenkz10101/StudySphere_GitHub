// App.js
import React from 'react';
import './app.css';
import Header from './components/Header';
import Features from './components/Features';
import Hero from './components/Hero';


function App() {
  return (
    <div>
      <Header />
      <Hero/>
      <Features />
    </div>
  );
}

export default App;
