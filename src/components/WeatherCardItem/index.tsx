import React from 'react'
import { getImage } from 'service/fetchWeatherForecast'
import { formatDateToDesiredValue, formatFahrenheitToCelsius } from 'utils'
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
      <div className="card-container__date">
        {formatDateToDesiredValue(date)}
      </div>
      <div className="card-container__img-wrapper">
        <img
          className="card-container__img"
          src={getImage(iconName)}
          alt="weather icon"
        ></img>
      </div>
      <div className="card-container__weather-temperature">
        {formatFahrenheitToCelsius(temperature) > 0
          ? `+${formatFahrenheitToCelsius(temperature)}`
          : formatFahrenheitToCelsius(temperature)}
        &#176;
      </div>
    </div>
  )
}

export { WeatherCardItem }
