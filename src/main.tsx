
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import {LoginPage} from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
// import StudentsPage from './pages/StudentsPage';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      /> 
      {/* <Route 
        path="/students"
        element={
          <RequireAuth>
            <StudentsPage />
          </RequireAuth>
        }
      /> */}
      {/* Add protected routes below */}
      {/* <Route path="/students" element={<StudentsPage />} /> */}
      {/* <Route path="/courses" element={<CoursesPage />} /> */}
    </Routes>
  </BrowserRouter>
);
