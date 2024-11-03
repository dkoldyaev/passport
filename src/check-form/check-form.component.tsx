import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { getPassportStatus } from "./check-passport.service";
import { TPassportStatusResponse } from "../types";
import { StatusHistory } from "../history/history.component";
import { descriptions } from "../consts";

export function CheckFormComponent() {
  const [passportNumber, setPassportNumber] = useState<string>(localStorage.getItem("passportNumber") || "");
  const [passportStatus, setPassportStatus] = useState<TPassportStatusResponse | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [description, setDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPassportNumber(event.target.value.replace(/\D/g, "")); // Remove non-digit characters
  }, []);
  useEffect(() => {
    const valid = /2000\d{5}\d{4}\d{2}\d{2}\d{8}/.test(passportNumber);
    setIsValid(valid);
    if (valid && passportNumber !== "") {
      localStorage.setItem("passportNumber", passportNumber);
      if (!loading) {
        setLoading(true);
        setDescription(null);
        setPassportStatus(null);
        getPassportStatus(passportNumber)
          .then(status => {
            setPassportStatus(status);
            setDescription(descriptions.find(
              ([percent, statusCodes]) =>
                percent === status.internalStatus.percent
                && statusCodes.includes(status.internalStatus.name)
            )?.[2] || null);
          })
          .catch(() => alert('Ошибка при запроса данных. Проверьте правильность номера заявления или попробуйте позже.'))
          .finally(() => setLoading(false))
      }
    }
  }, [passportNumber]);

  return <>
    <Card sx={{ maxWidth: '500px', margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Проверка статуса паспорта
        </Typography>
        <Typography variant="body1" component="p" color="textSecondary" gutterBottom>
          Введите номер заявления или ссылку из бумажки из консульства, чтобы узнать актуальный
          статус и процент завершения.
        </Typography>
        <TextField
          error={!isValid && passportNumber !== ""}
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

    {passportStatus && (
      <StatusHistory
        percent={passportStatus.internalStatus.percent}
        requestId={passportStatus.uid}
        status={passportStatus.internalStatus.name}
      />
    )}
  </>
}