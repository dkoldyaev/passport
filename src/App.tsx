import Box from '@mui/material/Box'
import './App.css'
import { CheckFormComponent } from './components/check-form.component'
import { DonateMe } from './components/donate-me.component'
import { Footer } from './components/footer.component'
import { StatusContext } from './services/status.service'
import { StatusHistory } from './components/history.component'

function App() {
  return <StatusContext>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '25px' }}>
      <Box sx={{ display: 'flex', maxWidth: '500px', margin: '16px auto', flexDirection: 'column', justifyContent: 'start', gap: '15px' }}>
        <CheckFormComponent />
        <StatusHistory />
        <DonateMe />
      </Box>
      <Footer />
    </Box>
  </StatusContext>
}

export default App
