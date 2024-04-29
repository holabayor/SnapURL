import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import History from './components/History';
import Profile from './pages/Profile';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import OTPPage from './pages/auth/OTPPage';
import ErrorBoundary from './components/ErrorBoundary';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route path="/auth/otp" element={<OTPPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
