import { useEffect, useState } from "react";
import { TInternalStatuses } from "../types";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { descriptions } from "../consts";

export type THistoryItem = { status: TInternalStatuses[1], percent: TInternalStatuses[0], date: string }
export type THistory = Array<THistoryItem>;

export function HistoryStep({
  status,
  percent,
  date,
  isActive
}: THistoryItem & {
  isActive: boolean
}) {
  const description = descriptions.find(
    item =>
      percent === item[0]
      && item[1].includes(status)
  )?.[2];

  return <Step>
    <StepLabel optional={new Date(date).toLocaleDateString('ru-RU')}>
      <Tooltip title={description}>
        <Typography variant="h6" color={isActive ? 'textPrimary' : 'textSecondary'} fontWeight={isActive ? 'bold' : 'normal'}>
          {percent}% {status}
        </Typography>
      </Tooltip>
    </StepLabel>
  </Step>
}

export function StatusHistory({
  status,
  percent
}: { status: TInternalStatuses[1], percent: TInternalStatuses[0] }) {
  const [history, setHistory] = useState<THistory>([]);
  useEffect(() => {
    if (!status || typeof percent === 'undefined') return;
    const history = localStorage.getItem('history')
      ? JSON.parse(localStorage.getItem('history')!)
      : [];
    if (history.length === 0 || (history[history.length - 1].status !== status && history[history.length - 1].percent !== percent)) {
      history.push({ status, percent, date: new Date().toISOString() });
      localStorage.setItem('history', JSON.stringify(history));
    }
    setHistory(history);
  }, [status, percent]);

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
              key={`${step.percent}-${step.status}`}
              {...step}
              isActive={index === history.length - 1}
            />
          ))}
        </Stepper>
      </CardContent></Card>
  );
}