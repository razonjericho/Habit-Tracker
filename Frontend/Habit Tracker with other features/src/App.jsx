import React from 'react'
import './App.css'
import HomePage from './pages/Home';
import EditPage from './pages/Edit';
import ProgressPage from './pages/Progress'
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
      <BottomNav />
      </BrowserRouter>
    </div>
  )
}

export default App
