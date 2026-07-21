import { React, useState, useContext } from 'react'
import HomePage from './pages/Home/Home.jsx';
import EditPage from './pages/Edit/Edit.jsx';
import ProgressPage from './pages/Progress/Progress.jsx'
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HabitDetailsPage from './pages/Progress/HabitDetails/HabitDetails.jsx';
import DayDetails from './pages/Progress/DayDetails/DayDetails.jsx';
import Login from './pages/Login/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import SessionExpiredModal from './components/SessionExpiredModal/SessionExpiredModal.jsx';
import { SessionContext } from './context/SessionContext.jsx';
import { AuthenticationContext } from './context/AuthenticationContext.jsx';
import Register from './pages/Register/Register.jsx';

function App() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const location = useLocation();

  const isAuthenticationPage = location.pathname === "/auth/login" || location.pathname === "/auth/register";

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

  const { isSessionExpired, setIsSessionExpired } = useContext(SessionContext);
  const navigate = useNavigate();

  const { logout } = useContext(AuthenticationContext);

  const handleSessionExpiredClose = () => {
    logout();
    setIsSessionExpired(false);
    navigate(`/auth/login`);
  }

  return (
    <div className="App">
      <SessionExpiredModal isOpen={isSessionExpired} onClose={handleSessionExpiredClose} />
      {!isAuthenticationPage  && <Header />}
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/" element={ 
          <ProtectedRoute> 
            <HomePage /> 
          </ProtectedRoute> } 
        />
        <Route path="/edit" element={ 
            <ProtectedRoute> 
              <EditPage /> 
            </ProtectedRoute> 
          } 
        />
        <Route path="/progress" element={ 
            <ProtectedRoute>
              <ProgressPage month={month} year={year} previous={prevMonth} next={nextMonth} />
            </ProtectedRoute> 
          } 
        />
        <Route path="/progress/:id" element={
            <ProtectedRoute>
              <HabitDetailsPage month={month} year={year} previous={prevMonth} next={nextMonth} />
            </ProtectedRoute>
          } 
        />
        <Route path="/progress/day/:date" element={ 
            <ProtectedRoute>
              <DayDetails />
            </ProtectedRoute> 
          } 
        />
      </Routes>
      {!isAuthenticationPage && <BottomNav />} 
    </div>
  )
}

export default App;
