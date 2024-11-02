import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
// import statusesGraphImage from '../assets/statuses.jpeg';
import { CircularProgress, TextField } from "@mui/material";
import { getPassportStatus } from "./check-passport.service";
import { TInternalStatuses, TPassportStatusResponse } from "./types";

const descriptions: Array<[TInternalStatuses[0], Array<TInternalStatuses[1]>, string]> = [
  [0, ["заявление создано"], "Заявление ожидает принятия в обработку"],
  [5, ["готово"], "Принятие заявления в консульстве, ждет отправления диппочтой в РФ"],
  [10, ["отправлено"], "Отправлено диппочтой в РФ. Может висеть в этом статусе до месяца"],
  [20, ["принято в обработку","приостановлено"], "диппочта дошла до МИДа"],
  [30, ["отправлено на согласование","на согласовании","дополнительная проверка"], "Проверка органами госбезопасности"],
  [60, ["согласовано"], "Госбезопасность убедилась, что доступа к гостайне у подавшего заявление нет"],
  [60, ["согласовано письмом"], "Ответ от госбезопасонсти отправлен письмом"],
  [70, ["персонализация разрешена","на персонализации","отправлено в МРЦОД"], "Печать паспорта Гознаком"],
  [80, ["паспорт поступил"], "Напечатанный паспорт приехал с Гознака в МИД"],
  [80, ["паспорт отправлен в РКЗУ"], "Отправлен диппочтой в консульство. Может также означать, что получен в консульстве, но там забыли сменить статус. Если висит слишком долго, имеет смысл написать в консульство письмо с просьбой проверить состояние паспорта"],
  [90, ["паспорт поступил"], "Паспорт поступил в консульство"],
  [100, ["паспорт верен"], "Паспорт готов к выдаче в консульстве/отправке по почте."],
  [0, ["паспорт выдан","почтовое отправление"], "Ваш паспорт выдан или отправлен по почте"],
  [0, ["отказ в согласовании","отмена изготовления паспорта"], "Отмена выдачи паспорта или отказ в согласовании с Госбезопасностью"],
]

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

  return <Card sx={{maxWidth: '500px', margin: 'auto'}}>
    <CardContent>
      <Typography variant="h5" component="h2" gutterBottom>
        Проверка статуса паспорта
      </Typography>
      <Typography variant="body1" component="p" color="textSecondary" gutterBottom>
        Введите номер заявления или ссылку из бумажки из консульства, чтобы узнать актуальный
        статус и процент завершения.
        {/* <br/>
        Для просмотра графической схемы статусов нажмите
        <a href={statusesGraphImage} target="_blank">здесь</a> */}
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
            <br/>
            {description}
          </>}
        </Typography>
      )}
    </CardContent>
  </Card>
}