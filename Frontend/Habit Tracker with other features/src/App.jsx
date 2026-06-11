import { React, useState } from 'react'
import './App.css'
import HomePage from './pages/Home/Home.jsx';
import EditPage from './pages/Edit/Edit.jsx';
import ProgressPage from './pages/Progress/Progress.jsx'
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HabitDetailsPage from './pages/Progress/HabitDetails/HabitDetails.jsx';
import DayDetails from './pages/Progress/DayDetails/DayDetails.jsx';

function App() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  function nextMonth(){
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  function prevMonth(){
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/progress" element={<ProgressPage month={month} year={year} previous={prevMonth} next={nextMonth} />} />
        <Route path="/progress/:id" element={<HabitDetailsPage month={month} year={year} previous={prevMonth} next={nextMonth} />} />
        <Route path="/progress/day/:date" element={<DayDetails />} />
      </Routes>
      <BottomNav />
      </BrowserRouter>
    </div>
  )
}

export default App;
