import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import VoiceMessage from './pages/VoiceMessage'
import TextMessage from './pages/TextMessage'
import Share from './pages/Share'
import ShareText from './pages/ShareText'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/voice' element={<VoiceMessage />} />
        <Route path='/text' element={<TextMessage />} />
        <Route path='/listen/:id' element={<Share />} />
        <Route path='/read/:id' element={<ShareText />}/>
      </Routes>
    </Router>
  )
}

export default App
