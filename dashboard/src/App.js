import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from "./Components/LoginPage/LoginPage";
import MainPage from './Components/MainPage/MainPage';
import FeedDrive from './Components/RealTimeData/FeedDrive';
import RTIndex from './Components/RealTimeData/RTIndex';
import Spindle from './Components/RealTimeData/Spindle';
import RS485 from './Components/RS485/RS485';
import Supervisor from './Components/SupPage/supervisor';
import Temperature from './Components/Temperature/Temperature';

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
          <Route path="/rtmain" element={<RTIndex />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
