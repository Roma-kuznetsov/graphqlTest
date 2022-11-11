import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import style from './App.module.css'
import MainNavigate from './components/MainNavigate/MainNavigate';
import AuthPage from './pages/AuthPage/AuthPage';
import BookingsPage from './pages/BookingsPage/BookingsPage';
import EventsPage from './pages/EventsPage/EventsPage';

function App() {
  return (
    <div className={style.main}>
      <BrowserRouter>
        <MainNavigate />
        <main className={style.main_content}>
          <Routes>
            <Route path='/' element={<Navigate to="/auth" replace />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/events' element={<EventsPage />} />
            <Route path='/bookings' element={<BookingsPage />} />
          </Routes>
        </main>
      </BrowserRouter>

    </div>
  );
}

export default App;
