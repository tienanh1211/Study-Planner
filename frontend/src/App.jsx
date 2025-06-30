import React from 'react';
import { Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import StudyGroupPage from './pages/StudyGroupPage';
import PrivateRoute from './components/PrivateRoute';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './context/AuthContext.jsx';
import { StudyGroupProvider } from './context/StudyGroupContext.jsx';
import { TaskProvider } from './context/TaskContext.jsx';

const AppContent = () => {
  const location = useLocation();
  const showNavbar = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/group/:id"
          element={
            <PrivateRoute>
              <StudyGroupPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <StudyGroupProvider>
          <TaskProvider>
            <Router>
              <AppContent />
            </Router>
          </TaskProvider>
        </StudyGroupProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
