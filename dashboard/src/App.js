import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from "./Components/LoginPage/LoginPage";
import Supervisor from './Components/SupPage/supervisor';
import MainPage from './Components/MainPage/MainPage';
import Temperature from './Components/Temperature/Temperature';
import RS485 from './Components/RS485/RS485';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/temperature" element={<Temperature />} />
          <Route path="/RS485" element={<RS485 />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
