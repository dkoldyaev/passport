import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Accordion from "@mui/material/Accordion";
import CardHeader from "@mui/material/CardHeader";
import buymeacoffee from '../assets/bmc-logo.svg';
import tinkoff from '../assets/tinkoff-logo.png';
import tbc from '../assets/tbc_filled.svg';
import ziraat from '../assets/TC_Ziraat_Bankası_logo.svg';

export function DonateMe() {
  return <Box>
    <Card sx={{ maxWidth: '500px', margin: '16px auto' }}>
      <CardHeader
        title="Сказать спасибо"
        subheader="Если вам нравится мой сервис, вы можете меня отблагодарить любым из следующих способов:"
      />
      <Accordion>
        <AccordionSummary>
          <img src={buymeacoffee} style={{ width: 24, height: 24, marginInlineEnd: '16px' }} />
          <Typography>buymeacoffee</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component='a' target="_blank" href="https://buymeacoffee.com/dkoldyaevf">https://buymeacoffee.com/dkoldyaevf</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <img src={tinkoff} style={{ width: 24, height: 24, marginInlineEnd: '16px' }} />
          <Typography>тинькофф</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component='a' target="_blank" href="https://www.tbank.ru/cf/75mfKA8AKDQ">https://www.tbank.ru/cf/75mfKA8AKDQ</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <img src={tbc} style={{ width: 24, height: 24, fill: '#00adee', stroke: '#00adee', marginInlineEnd: '16px' }} />
          <Typography>TBC (Грузия)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>GE95 TB71 4894 5168 2000 01</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <img src={ziraat} style={{ width: 24, height: 24, marginInlineEnd: '16px' }} />
          <Typography>Турция (Ziraat)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>TR88 0001 0090 1021 2398 7050 01</Typography>
        </AccordionDetails>
      </Accordion>


      {/* <CardContent>
      <Typography>
        Если вы хотите меня отблагодарить, можете сделать это с помощью следующих способов:<br/>
        <a href="https://buymeacoffee.com/dkoldyaevf">buymeacoffee</a><br/>
        <a href="https://www.tbank.ru/cf/75mfKA8AKDQ">тинькофф</a><br/>
        TBC:    <pre style={{display: 'inline-block', margin:0}}>GE95 TB71 4894 5168 2000 01</pre><br/>
        Ziraat: <pre style={{display: 'inline-block', margin:0}}></pre>
      </Typography>
      </CardContent> */}
    </Card>
  </Box>
}