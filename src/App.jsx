// App.js
import React from 'react';
import './app.css';
import Header from './components/Header';
import Features from './components/Features';

function App() {
  return (
    <div>
      <Header />
{
// Here yoyu will get a hero section
}
      <Features />
      <div className="min-h-screen bg-gray-50">
      <DeveloperSection />
    </div>
      <Footer />
    </div>
  );
}

export default App;
