export const formatDateToUnixTime = (date: Date) =>
  Math.round(date.getTime() / 1000.0)
