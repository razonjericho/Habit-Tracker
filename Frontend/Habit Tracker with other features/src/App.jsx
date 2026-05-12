import { React, useState } from 'react'
import './App.css'
import HomePage from './pages/Home/Home.jsx';
import EditPage from './pages/Edit/Edit.jsx';
import ProgressPage from './pages/Progress/Progress.jsx'
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HabitDetailsPage from './pages/HabitDetails/HabitDetails.jsx';

function App() {

  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/progress" element={<ProgressPage month={month} year={year} />} />
        <Route path="/progress/:id" element={<HabitDetailsPage />} />
      </Routes>
      <BottomNav />
      </BrowserRouter>
    </div>
  )
}

export default App;
