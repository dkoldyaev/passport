export type TDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;
export type TDigitLength<T extends number, Count extends unknown[] = []> =
  Count['length'] extends T
    ? `${TDigit}`
    : `${TDigit}${TDigitLength<T, [unknown, ...Count]>}`;

export type TPassportStatus = {
  id: number
  name: string
  description: string
  color: string
  subscription: boolean
}

export type TInternalStatuses = 
  | [0, 'заявление создано']
  | [5, 'готово']
  | [10, 'отправлено']
  | [20, 'принято в обработку' | 'приостановлено']
  | [30, 'отправлено на согласование' | 'на согласовании' | 'дополнительная проверка']
  | [60, 'согласовано письмом' | 'согласовано']
  | [70, 'персонализация разрешена' | 'на персонализации' | 'отправлено в МРЦОД']
  | [80, 'паспорт поступил' | 'паспорт отправлен в РКЗУ']
  | [90, 'паспорт поступил']
  | [100, 'паспорт верен']
  | [0, 'паспорт выдан' | 'отказ в согласовании' | 'отмена изготовления паспорта' | 'почтовое отправление']

export type TPassportInternalStatus = {
  [K in TInternalStatuses as K[1]]: {
    name: K[1];
    percent: K[0];
  };
}[TInternalStatuses[1]];

export type TPassportStatusResponse = {
  uid: `2000${number}`
  sourceUid: null
  receptionDate: `${number}-${number}-${number}`
  passportStatus: TPassportStatus
  internalStatus: TPassportInternalStatus
  clones: Array<unknown>
}