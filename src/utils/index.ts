export const formatDateToUnixTime = (date: Date) =>
  Math.round(date.getTime() / 1000.0)

export const formatUnixTimeToDate = (unixTime: number) =>
  new Date(unixTime * 1000)

const makeDateDoubleSymbol = (number: string | number) => {
  const numberAsString = `${number}`
  return numberAsString.length < 2 ? `0${numberAsString}` : numberAsString
}

export const formatDateToString = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${makeDateDoubleSymbol(month)}-${makeDateDoubleSymbol(day)}`
}

export const formatFahrenheitToCelsius = (temp: number) => {
  const calc = temp - 273.15
  return Math.round(calc)
}

export const formatDateToDesiredValue = (date: Date) => {
  const formatedDate = date.toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: 'long'
  })
  const formatedDateAsArray = formatedDate.split(' ')
  const [month, day, year] = formatedDateAsArray
  const formatedDay = day.slice(0, -1)

  return `${formatedDay} ${month} ${year}`
}
