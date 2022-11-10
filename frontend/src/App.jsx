import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Test from './pages/Test';
import EventsPage from './pages/EventsPage';
import BookingsPage from './pages/BookingsPage';

function App() {
  return (
    <BrowserRouter>
      <Test />
      <Routes>
        <Route path='/' element={<Navigate to="/auth" replace />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/bookings' element={<BookingsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
