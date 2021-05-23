import React from 'react'
import { DailyForecastCard } from './DailyForecastCard'
import { HistoricalForecastCard } from './HistoricalForecastCard'
import './styles.css'

const WeatherCards = () => {
  return (
    <div className="weather-cards">
      <DailyForecastCard />
      <HistoricalForecastCard />
    </div>
  )
}

export { WeatherCards }
