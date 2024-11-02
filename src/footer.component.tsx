import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function Footer() {
  return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px', padding: '1em' }}>
    <Typography variant="body1" color="#f0f0f0" align="center">
      Сервис использует данные с сайта info.midpass.ru, и отображаемая информация полностью зависит от данных, предоставленных этим API.
      <br />
      мы не храним и никак не обрабатываем ваши данные
    </Typography>
  </Box>;
}