import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from "./Components/LoginPage/LoginPage";
import MainPage from './Components/MainPage/MainPage';
import RTIndex from './Components/RealTimeData/RTIndex';
import RS485 from './Components/RS485/RS485';
import OeeGauges from './Components/OEE/OeeGauges';
import MainIndex from './Components/RealTimeData/MainIndex';
import Supervisor from './Components/SupPage/supervisor';
import Temperature from './Components/Temperature/Temperature';
import RS232 from './Components/RS232/RS232';
import PdfViewer from './Components/MachineSpec/MachineSpec';

function App() {

  

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/temperature" element={<Temperature />} />
          <Route path="/RS485" element={<RS485 />} />
          <Route path="/RS232" element={<RS232/>} />
          <Route path="/oee" element={<OeeGauges/>} />
          <Route path="/rtmain" element={<RTIndex />} />
          <Route path="/mainindex" element={<MainIndex />} />
          <Route path="/machinespec" element={<PdfViewer/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
