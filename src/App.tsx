import Box from '@mui/material/Box'
import './App.css'
import { CheckFormComponent } from './check-form/check-form.component'
import { DonateMe } from './donate-me/donate-me.component'
import { Footer } from './footer.component'

function App() {
  return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '25px' }}>
    <Box sx={{ display: 'flex', maxWidth: '500px', margin: '16px auto', flexDirection: 'column', justifyContent: 'start', gap: '15px' }}>
      <CheckFormComponent />
      <DonateMe />
    </Box>
    <Footer />
  </Box>
}

export default App
