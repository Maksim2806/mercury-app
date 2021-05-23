import React from 'react'
import './styles.css'
import { WeatherCards } from './WeatherCards'

const ForecastPage = () => {
  return (
    <div className="forecastPage">
      <div className="forecastPage__title">
        <div className="forecastPage__titleItem forecastPage__first">
          Weather
        </div>
        <div className="forecastPage__titleItem forecastPage__second">
          forecast
        </div>
      </div>
      <WeatherCards />
    </div>
  )
}

export { ForecastPage }
