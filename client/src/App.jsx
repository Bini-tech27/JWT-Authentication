import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from './components/DashBoard';
import Register from './components/Register';
import Logged from './components/Logged';



function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logged" element={<Logged />} />
          </Routes>
          </BrowserRouter>
    </>
  )
}

export default App
