import React from 'react'
import './styles.css'
import { WeatherCardPlaceholder } from 'components/WeatherCardPlaceholder'

interface Props {
  title: string;
  content?: React.ReactNode;
  inputComponents: React.ReactNode[];
}

const WeatherCard: React.FC<Props> = ({ title, content, inputComponents }) => {
  return (
    <div className="weather-card">
      <h2 className="weather-card__title">{title}</h2>
      <div className="weather-card__inputs">
        {inputComponents.map((inputComponent) => inputComponent)}
      </div>
      <div className="weater-card__content">
        {content || <WeatherCardPlaceholder />}
      </div>
    </div>
  )
}

export { WeatherCard }
