import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Teams from './pages/Teams';
import CreateTeam from './pages/CreateTeam';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="teams" element={<Teams />} />
          <Route path="create-team" element={<CreateTeam />} />
          {/* Add more routes as we progress through phases */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
