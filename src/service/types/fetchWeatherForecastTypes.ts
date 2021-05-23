interface BaseDataResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
  }
export interface DailyForecastParams {
  lat: number;
  lon: number;
}
export interface DailyForecastResponse extends BaseDataResponse {
  daily:
  {
    dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  },
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  },
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ],
  clouds: number
  pop: number
  rain: number
  uvi: number
}[]
}

export interface HistoricalForecastParams {
  lat: number;
  lon: number;
  dt: number;
}
export interface HistoricalForecastResponse extends BaseDataResponse {
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
