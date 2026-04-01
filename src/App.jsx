import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import VoiceMessage from './pages/VoiceMessage'
import TextMessage from './pages/TextMessage'
import Share from './pages/Share'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/voice' element={<VoiceMessage />} />
        <Route path='/text' element={<TextMessage />} />
        <Route path='/listen/:id' element={<Share />} />
      </Routes>
    </Router>
  )
}

export default App
