const statuses = {
  A: {
    percent: 0,
    title: 'заявление создано',
    neighbors: ['C']
  },
  B: {
    percent: 0,
    title: 'удалено',
    neighbors: []
  },
  C: {
    percent: 5,
    title: 'готово',
    neighbors: ['D', 'E', 'G']
  },
  D: {
    percent: 0,
    title: 'отклонено',
    neighbors: ['K']
  },
  E: {
    percent: 10,
    title: 'отправлено',
    neighbors: ['G', 'F'],
  },
  F: {
    percent: 20,
    title: 'принято в обработку',
    neighbors: ['H']
  },
  G: {
    percent: 20,
    title: 'приостановлено',
    neighbors: ['F', 'K', 'H']
  },
  H: {
    percent: 30,
    title: 'на согласовании',
    neighbors: ['G', 'I', 'J', 'O', 'P']
  },
  I: {
    percent: 0,
    title: 'возврат без исполнения',
    neighbors: ['K']
  },
  J: {
    percent: 30,
    title: 'дополнительная проверка',
    neighbors: ['L', 'M']
  },
  K: {
    percent: 0,
    title: 'отмена изготовления паспорта',
    neighbors: []
  },
  L: {
    percent: 60,
    title: 'согласовано письмом',
    neighbors: ['N', 'O']
  },
  M: {
    percent: 70,
    title: 'отправлено в МРЦОД',
    neighbors: ['R']
  },
  N: {
    percent: 0,
    title: 'отказ в согласовании',
    neighbors: ['K']
  },
  O: {
    percent: 60,
    title: 'согласовано',
    neighbors: ['R']
  },
  P: {
    percent: 70,
    title: 'персонализация разрешена',
    neighbors: ['R']
  },
  R: {
    percent: 70,
    title: 'на персонализации',
    neighbors: ['Q']
  },
  Q: {
    percent: 70,
    title: 'паспорт напечатан',
    neighbors: ['T']
  },
  T: {
    percent: 80,
    title: 'паспорт поступил',
    neighbors: ['S']
  },
  S: {
    percent: 80,
    title: 'паспорт отправлен в РКЗУ',
    neighbors: ['U', 'V']
  },
  U: {
    percent: 90,
    title: 'паспорт поступил',
    neighbors: ['W']
  },
  V: {
    percent: 100,
    title: 'паспорт поступил',
    neighbors: ['W', 'X']
  },
  W: {
    percent: 100,
    title: 'паспорт верен',
    neighbors: ['Y', 'Z']
  },
  X: {
    percent: 0,
    title: 'паспорт аннулирован',
    neighbors: ['Z2']
  },
  Y: {
    percent: 0,
    title: 'почтовое отправление',
    neighbors: ['Z']
  },
  Z: {
    percent: 0,
    title: 'паспорт выдан',
    neighbors: []
  },
  Z2: {
    percent: 0,
    title: 'паспорт утилизирован',
    neighbors: []
  }
}