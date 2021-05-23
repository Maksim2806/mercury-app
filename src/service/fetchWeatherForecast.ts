import api from '.'
import {
  DailyForecastParams,
  DailyForecastResponse,
  HistoricalForecastParams,
  HistoricalForecastResponse
} from './types/fetchWeatherForecastTypes'

export const fetchHistoricalForecast = async (
  params: HistoricalForecastParams
) => await api.get<HistoricalForecastResponse>('/onecall/timemachine', params)

export const fetchDailyForecast = async (params: DailyForecastParams) => {
  const extendedParams = {
    ...params,
    exclude: 'minutely,hourly,current,alerts'
  }
  return await api.get<DailyForecastResponse>('/onecall', extendedParams)
}

export const getImage = (name: string) =>
  `http://openweathermap.org/img/wn/${name}@2x.png`
