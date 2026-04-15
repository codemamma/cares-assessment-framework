import { Routes, Route } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import AssessmentPage from '@/pages/AssessmentPage'
import ResultsPage from '@/pages/ResultsPage'
import DashboardPage from '@/pages/DashboardPage'
import { Footer } from '@/components/shared/Footer'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      <Footer />
    </>
  )
}
