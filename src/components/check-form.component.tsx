import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ChangeEvent, memo, SyntheticEvent, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useStatus } from "../services/status.service";
import Autocomplete from "@mui/material/Autocomplete";

export const CheckFormComponent = memo(() => {
  const {
    setPassportNumber,
    valid,
    passportNumber,
    loading,
    passportStatus,
    description,
    historyPassportNumbers,
    // addHistoryPassportNumber,
    // removeHistoryPassportNumber,
  } = useStatus()

  const handleSelect = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    setPassportNumber(value); // Remove non-digit characters
  }, [setPassportNumber]);

  const handleChange = useCallback((_: SyntheticEvent, value: string) => {
    setPassportNumber(value.replace(/\D/g, "")); // Remove non-digit characters
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
      <Autocomplete
        freeSolo
        disableClearable
        options={historyPassportNumbers}
        value={passportNumber}
        onSelect={handleSelect}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Введите номер заявления"
            variant="outlined"
            fullWidth
            error={!valid && passportNumber !== ""}
            margin="normal"
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
              },
            }}
          // endAdornment={
          //   <InputAdornment position="end">
          //     <IconButton
          //       aria-label={
          //         showPassword ? 'hide the password' : 'display the password'
          //       }
          //       onClick={handleClickShowPassword}
          //       onMouseDown={handleMouseDownPassword}
          //       onMouseUp={handleMouseUpPassword}
          //       edge="end"
          //     >
          //       {showPassword ? <VisibilityOff /> : <Visibility />}
          //     </IconButton>
          //   </InputAdornment>
          // }
          />
        )}
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
})