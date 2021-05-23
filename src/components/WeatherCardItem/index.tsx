import React from 'react'
import { getImage } from 'service/fetchWeatherForecast'
import './styles.css'

interface Props {
  item: {
    date: Date,
    iconName: string,
    temperature: number,
  };
}

const WeatherCardItem: React.FC<Props> = ({
  item: { date, iconName, temperature }
}) => {
  return (
    <div className="card-container">
      <div className="card-container__date">{date.getDate()}</div>
      <img src={getImage(iconName)} alt="weather icon"></img>
      <div className="card-container__weather-temperature">{temperature}</div>
    </div>
  )
}

export { WeatherCardItem }
