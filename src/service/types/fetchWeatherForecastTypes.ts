interface CurrentForecast {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: {
      clouds: number
      dew_point: number
      dt: number
      feels_like: number
      humidity: number
      pressure: number
      sunrise: number
      sunset: number
      temp:number
      uvi: number
      visibility: number
      weather: Array<{
        description: string
        icon:string
        id: number
        main: string
      }>
      wind_deg: number
      wind_gust?: number
      wind_speed: number
    }
  }

export interface CurrentForecastParams {
  lat: number;
  lon: number;
}
export interface CurrentForecastResponce extends CurrentForecast {}

export interface HistoricalForecastParams {
  lat: number;
  lon: number;
  dt: number;
}
export interface HistoricalForecastResponce extends CurrentForecast {}
