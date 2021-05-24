import React, { useCallback, useMemo, useState } from 'react'
import { WeatherCard } from 'components/WeatherCard'
import { IOption, Select } from 'components/Select'
import { CitiesOptions } from 'constants/cities'
import { DailyForecastResponse } from 'service/types/fetchWeatherForecastTypes'
import { IServerError } from 'service/types'
import { fetchDailyForecast } from 'service/fetchWeatherForecast'
import { Carousel } from 'components/Carousel'
import { WeatherCardItem } from 'components/WeatherCardItem'
import { formatUnixTimeToDate } from 'utils'

interface ICityOption extends IOption {
  value: {
    lon: number,
    lat: number,
  };
}

const DailyForecastCard = () => {
  const [data, setData] = useState<DailyForecastResponse | undefined>()
  const [error, setError] = useState<IServerError | undefined>()
  const [selectCityValue, setSelectCityValue] =
    useState<ICityOption | undefined>()

  const onSelectCity = useCallback(async (selectedOption: ICityOption) => {
    setSelectCityValue(selectedOption)
    try {
      const data = await fetchDailyForecast({
        lat: selectedOption.value.lat,
        lon: selectedOption.value.lon
      })
      console.log(data)
      setData(data)
    } catch (e) {
      setError(e)
    }
  }, [])
  console.log(onSelectCity)

  const content = useMemo(() => {
    if (!data) return
    const carouselContent = data.daily
      .slice(0, -1)
      .map(({ dt, weather, temp }) => {
        return (
          <WeatherCardItem
            item={{
              date: formatUnixTimeToDate(dt),
              iconName: weather[0].icon,
              temperature: temp.day
            }}
          />
        )
      })
    return <Carousel content={carouselContent} />
  }, [data])

  return (
    <WeatherCard
      title="7 Days Forecast"
      inputComponents={[
        <Select
          value={selectCityValue}
          options={CitiesOptions}
          onChange={onSelectCity}
        />
      ]}
      content={content}
    />
  )
}

export { DailyForecastCard }
