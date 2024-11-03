import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { memo } from "react";

const link = <a href="https://forum.awd.ru/viewtopic.php?p=11124426&sid=c9f23ee4c5284ff486bf8bb82ca473e9#p11124426" target="_blank" rel="nofollow">https://forum.awd.ru/</a>;

export const Footer = memo(() => {
  return <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '40px', padding: '1em' }}>
    <Typography variant="body1" align="center" sx={{ fontSize: '12px', textWrap: 'balance' }} gutterBottom>
      Сервис использует данные с сайта info.midpass.ru, и отображаемая информация полностью зависит от данных, предоставленных МИД РФ.
      <br />
      Сервис не хранит и никак не обрабатывает ваши данные. Вся информация сохраняется и обрабатывается только на вашем компьютере
    </Typography>
    <Typography variant="body1" align="center" sx={{ fontSize: '12px', textWrap: 'balance' }} gutterBottom>
      Информация о статусах взята отсюда {link}.
      Если что-то сломалось, пишите на почту <a href="mailto:dkoldyaev@gmail.com">dkoldyaev@gmail.com</a>
    </Typography>
  </Box>;
})