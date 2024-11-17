import { createContext, memo, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { TInternalStatuses, TPassportInternalStatus, TPassportStatusResponse } from "../types";
import { getPassportStatus } from "./check-passport.service";

const descriptions: Array<[TInternalStatuses[0], Array<TInternalStatuses[1]>, string]> = [
  [0, ["заявление создано"], "Заявление ожидает принятия в обработку"],
  [5, ["готово"], "Принятие заявления в консульстве, ждет отправления диппочтой в РФ"],
  [10, ["отправлено"], "Отправлено диппочтой в РФ. Может висеть в этом статусе до месяца"],
  [20, ["принято в обработку", "приостановлено"], "диппочта дошла до МИДа"],
  [30, ["отправлено на согласование", "на согласовании", "дополнительная проверка"], "Проверка органами госбезопасности"],
  [60, ["согласовано"], "Госбезопасность убедилась, что доступа к гостайне у подавшего заявление нет"],
  [60, ["согласовано письмом"], "Ответ от госбезопасонсти отправлен письмом"],
  [70, ["персонализация разрешена", "на персонализации", "отправлено в МРЦОД"], "Печать паспорта Гознаком"],
  [80, ["паспорт поступил"], "Напечатанный паспорт приехал с Гознака в МИД"],
  [80, ["паспорт отправлен в РКЗУ"], "Отправлен диппочтой в консульство. Может также означать, что получен в консульстве, но там забыли сменить статус. Если висит слишком долго, имеет смысл написать в консульство письмо с просьбой проверить состояние паспорта"],
  [90, ["паспорт поступил"], "Паспорт поступил в консульство"],
  [100, ["паспорт верен"], "Паспорт готов к выдаче в консульстве/отправке по почте."],
  [0, ["паспорт выдан", "почтовое отправление"], "Ваш паспорт выдан или отправлен по почте"],
  [0, ["отказ в согласовании", "отмена изготовления паспорта"], "Отмена выдачи паспорта или отказ в согласовании с Госбезопасностью"],
]

const getDescription = ({ percent, name }: TPassportInternalStatus) => descriptions.find(
  item =>
    percent === item[0]
    && item[1].includes(name)
)?.[2]

export type TStatusContextData = {
  passportStatus: TPassportStatusResponse | null,
  loading: boolean,
  valid: boolean,
  startLoading: () => void,
  stopLoading: () => void,
  setValid: (isValid: boolean) => void,
  passportNumber: string,
  setPassportNumber: (passportNumber: string) => void,
  description?: string,
  getDescription: (status: TPassportInternalStatus) => string | undefined,
  historyPassportNumbers: string[],
  removeHistoryPassportNumber: (number: string) => void,
  addHistoryPassportNumber: (number: string) => void,
}

const _StatusContext = createContext<TStatusContextData | null>(null);

export const useStatus = (): TStatusContextData => {
  const data = useContext(_StatusContext);
  if (!data) throw new Error();
  return data;
}

export const StatusContext = memo(({ children }: PropsWithChildren) => {
  const [passportNumber, setPassportNumber] = useState<string>(localStorage.getItem("passportNumber") || "");
  const [passportStatus, setPassportStatus] = useState<TPassportStatusResponse | null>(null);
  const [valid, setValid] = useState<boolean>(false);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [historyPassportNumbers, setHistoryPassportNumbers] = useState<string[]>([]);

  useEffect(() => {
    try {
      setHistoryPassportNumbers(JSON.parse(localStorage.getItem('passportsHistory')!));
    } catch {
      // do nothing
    }
  }, []);

  useEffect(() => {
    const valid = /2000\d{5}\d{4}\d{2}\d{2}\d{8}/.test(passportNumber);
    setValid(valid);
    if (valid && passportNumber !== "") {
      localStorage.setItem("passportNumber", passportNumber);
      if (!loading) {
        setLoading(true);
        setValid(true);
        setDescription(undefined);
        setPassportStatus(null);
        getPassportStatus(passportNumber)
          .then(status => {
            setPassportStatus(status);
            setDescription(descriptions.find(
              ([percent, statusCodes]) =>
                percent === status.internalStatus.percent
                && statusCodes.includes(status.internalStatus.name)
            )?.[2]);
            addHistoryPassportNumber(passportNumber);
          })
          .catch(() => {
            alert('Ошибка при запроса данных. Проверьте правильность номера заявления или попробуйте позже.');
            setValid(false);
          })
          .finally(() => setLoading(false))
      }
    }
  }, [passportNumber]);

  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);

  const removeHistoryPassportNumber = useCallback((value: string) => {
    setHistoryPassportNumbers(prevNumbers => {
      if (!prevNumbers) {
        return [value];
      }
      const currentValueIndex = prevNumbers.indexOf(value);
      if (currentValueIndex !== -1) {
        prevNumbers.splice(currentValueIndex, 1);
      }
      return [...prevNumbers];
    });
  }, []);

  const addHistoryPassportNumber = useCallback((value: string) => {
    setHistoryPassportNumbers(prevNumbers => {
      if (!prevNumbers) {
        return [value];
      }
      const currentValueIndex = prevNumbers.indexOf(value);
      if (currentValueIndex !== -1) {
        prevNumbers.splice(currentValueIndex, 1);
      }
      prevNumbers.splice(0, 0, value);
      return [...prevNumbers];
    });
  }, []);

  useEffect(() => {
    if (historyPassportNumbers && Array.isArray(historyPassportNumbers) && historyPassportNumbers.length > 0) {
      localStorage.setItem('passportsHistory', JSON.stringify(historyPassportNumbers));
    }
  }, [historyPassportNumbers]);

  return <_StatusContext.Provider value={{
    passportStatus,
    loading,
    valid,
    startLoading,
    stopLoading,
    setValid,
    passportNumber,
    setPassportNumber,
    description,
    getDescription,
    historyPassportNumbers,
    removeHistoryPassportNumber,
    addHistoryPassportNumber,
  }}>
    {children}
  </_StatusContext.Provider>

})