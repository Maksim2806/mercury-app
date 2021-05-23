import React from 'react'
import './styles.css'
import cloudsImg from './assets/Academy-Weather-bg160.svg'

const WeatherCardPlaceholder = () => {
  return (
    <figure className="weather-card-placeholder">
      <img
        className="weather-card-placeholder__img"
        src={cloudsImg}
        alt="placeholder"
      />
      <figcaption className="weather-card-placeholder__figcaption">
        Fill in all the fields and the weather will be displayed
      </figcaption>
    </figure>
  )
}

export { WeatherCardPlaceholder }
