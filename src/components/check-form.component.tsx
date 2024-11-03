import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useStatus } from "../services/status.service";

export function CheckFormComponent() {
  const {
    setPassportNumber,
    valid,
    passportNumber,
    loading,
    passportStatus,
    description
  } = useStatus()

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassportNumber(event.target.value.replace(/\D/g, "")); // Remove non-digit characters
  }, [setPassportNumber]);

  return <Card sx={{ maxWidth: '500px', margin: 'auto' }}>
    <CardContent>
      <Typography variant="h5" component="h2" gutterBottom>
        Проверка статуса паспорта
      </Typography>
      <Typography variant="body1" component="p" color="textSecondary" gutterBottom>
        Введите номер заявления или ссылку из бумажки из консульства, чтобы узнать актуальный
        статус и процент завершения.
      </Typography>
      <TextField
        error={!valid && passportNumber !== ""}
        label="Введите номер заявления"
        variant="outlined"
        fullWidth
        margin="normal"
        value={passportNumber}
        onChange={handleChange}
      />
      {loading && <CircularProgress />}
      {!loading && passportStatus && (
        <Typography variant="h6">
          Статус: <strong>{passportStatus.internalStatus.percent}%, {passportStatus.internalStatus.name}</strong>
          {description && <>
            <br />
            {description}
          </>}
        </Typography>
      )}
    </CardContent>
  </Card>
}