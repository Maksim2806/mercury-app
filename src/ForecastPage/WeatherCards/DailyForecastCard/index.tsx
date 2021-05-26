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
import { Loader } from 'components/Loader'
import { ErrorContainer } from 'components/ErrorContainer'

interface ICityOption extends IOption {
  value: {
    lon: number,
    lat: number,
  };
}

const DailyForecastCard = () => {
  const [data, setData] = useState<DailyForecastResponse | undefined>()
  const [error, setError] = useState<IServerError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectCityValue, setSelectCityValue] =
    useState<ICityOption | undefined>()

  const onSelectCity = useCallback(async (selectedOption: ICityOption) => {
    setSelectCityValue(selectedOption)
    setIsLoading(true)
    setError(undefined)
    try {
      const data = await fetchDailyForecast({
        lat: selectedOption.value.lat,
        lon: selectedOption.value.lon
      })
      setData(data)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const content = useMemo(() => {
    if (isLoading) {
      return <Loader />
    }
    if (error) {
      return <ErrorContainer message={error.message} />
    }
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
  }, [data, isLoading, error])

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
