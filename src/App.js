import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import RegistrationPage from './components/Registration';
import AccountPage from './components/AccountPage';
import EditAccountPage from './components/EditAccount';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/edit-account" element={<EditAccountPage />} />
      </Routes>
    </Router>
  );
}

export default App;
