// App.js
import React from 'react';
import './app.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './components/SignInPage'; 
import SignUpPage from './components/SignUpPage'; // Ensure path is correct

function App() {
  return (
   <>
      <Router>
      <Routes>
        {/* Default route to redirect from "/" to "/signin" */}
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
   </>
     
  );
}

export default App;
