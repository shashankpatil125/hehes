import { Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import LandingPage from './pages/LandingPage'
import OnboardingPage from './pages/OnboardingPage'
import UserPage from './pages/UserPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
export default App

