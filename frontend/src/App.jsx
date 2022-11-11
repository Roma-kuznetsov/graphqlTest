import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import style from './App.module.css'
import MainNavigate from './components/MainNavigate/MainNavigate';
import AuthPage from './pages/AuthPage';
import BookingsPage from './pages/BookingsPage';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <>
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

    </>
  );
}

export default App;
