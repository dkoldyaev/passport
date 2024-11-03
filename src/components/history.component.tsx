import { memo, useEffect, useState } from "react";
import { TPassportInternalStatus } from "../types";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { useStatus } from "../services/status.service";

export type THistoryItem = TPassportInternalStatus & { date: string }
export type THistory = Array<THistoryItem>;

export const HistoryStep = memo(({
  date,
  isActive,
  ...internalStatus
}: THistoryItem & {
  isActive: boolean
}) => {
  const { getDescription } = useStatus();
  const description = getDescription(internalStatus);
  const optional = new Date(date).toLocaleDateString('ru-RU');

  return <Step>
    <StepLabel optional={optional}>
      <Tooltip title={description}>
        <Typography variant="h6" color={isActive ? 'textPrimary' : 'textSecondary'} fontWeight={isActive ? 'bold' : 'normal'}>
          {internalStatus.percent}% {internalStatus.name}
        </Typography>
      </Tooltip>
    </StepLabel>
  </Step>
})

export const StatusHistory = memo(() => {
  const [history, setHistory] = useState<THistory>([]);
  const { passportStatus, valid, loading } = useStatus();
  useEffect(() => {
    if (!passportStatus) return;

    const {
      internalStatus: { percent, name },
      uid
    } = passportStatus;

    if (!name || typeof percent === 'undefined') return;
    const history = localStorage.getItem(`history_${uid}`)
      ? JSON.parse(localStorage.getItem(`history_${uid}`)!)
      : [];
    if (history.length === 0 || (history[history.length - 1].name !== name && history[history.length - 1].percent !== percent)) {
      history.push({ name, percent, date: new Date().toISOString() });
      localStorage.setItem(`history_${uid}`, JSON.stringify(history));
    }
    setHistory(history);
  }, [passportStatus]);

  if (loading || !valid) return null;

  console.log({ loading, valid })

  return (
    <Card sx={{ maxWidth: '500px', margin: '16px auto' }}>
      <CardHeader
        title='История'
        subheader='Мы не храним ваши данные. История ваших статусов хранится только в вашем браузере и обновляется при каждом заходе на страницу'
      />
      <CardContent>
        <Stepper
          orientation="vertical"
          activeStep={1}
        >
          {history.map((step, index) => (
            <HistoryStep
              key={`${step.percent}-${step.name}`}
              {...step}
              isActive={index === history.length - 1}
            />
          ))}
        </Stepper>
      </CardContent></Card>
  );
})