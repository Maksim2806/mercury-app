import api from '.'
import {
  CurrentForecastParams,
  CurrentForecastResponce,
  HistoricalForecastParams,
  HistoricalForecastResponce
} from './types/fetchWeatherForecastTypes'

export const fetchHistoricalForecast = async (
  params: HistoricalForecastParams
) => await api.get<HistoricalForecastResponce>('/onecall/timemachine', params)

export const fetchCurrentForecast = async (params: CurrentForecastParams) => {
  const extendedParams = {
    ...params,
    exclude: 'minutely,hourly,daily,alerts'
  }
  return await api.get<CurrentForecastResponce>('/onecall', extendedParams)
}

export const getImage = (name: string) =>
  `http://openweathermap.org/img/wn/${name}@2x.png`
