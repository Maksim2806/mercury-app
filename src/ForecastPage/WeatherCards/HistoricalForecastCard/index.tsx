import React, { useCallback, useMemo, useState } from 'react'
import { WeatherCard } from 'components/WeatherCard'
import { IOption, Select } from 'components/Select'
import { CitiesOptions } from 'constants/cities'
import { DateInput } from 'components/InputDate'
import { IServerError } from 'service/types'
import { HistoricalForecastResponse } from 'service/types/fetchWeatherForecastTypes'
import { fetchHistoricalForecast } from 'service/fetchWeatherForecast'
import { formatDateToUnixTime, formatUnixTimeToDate } from 'utils'
import { WeatherCardItem } from 'components/WeatherCardItem'
import { Loader } from 'components/Loader'
import { ErrorContainer } from 'components/ErrorContainer'

interface ICityOption extends IOption {
  value: {
    lon: number,
    lat: number,
  };
}

const HistoricalForecastCard = () => {
  const [data, setData] = useState<HistoricalForecastResponse | undefined>()
  const [error, setError] = useState<IServerError | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectCityValue, setSelectCityValue] =
    useState<ICityOption | undefined>()
  const [selectedDateValue, setSelectedDateValue] = useState<Date | undefined>()

  const fetchData = useCallback(async (selectedCity, selectedDate) => {
    setIsLoading(true)
    setError(undefined)
    try {
      const data = await fetchHistoricalForecast({
        lat: selectedCity!.value.lat,
        lon: selectedCity!.value.lon,
        dt: formatDateToUnixTime(selectedDate!)
      })
      setData(data)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const onSelectCity = useCallback((selectedOption: ICityOption) => {
    setSelectCityValue(selectedOption)
    if (selectedDateValue) {
      fetchData(selectedOption, selectedDateValue)
    }
  }, [fetchData, selectedDateValue])

  const onSelectDate = useCallback((selectedDate: Date) => {
    setSelectedDateValue(selectedDate)

    if (selectCityValue) {
      fetchData(selectCityValue, selectedDate)
    }
  }, [fetchData, selectCityValue])

  const content = useMemo(() => {
    if (isLoading) {
      return <Loader />
    }
    if (error) {
      return <ErrorContainer message={error.message}/>
    }
    if (!data) return
    const {
      current: {
        dt,
        weather,
        temp
      }
    } = data
    return <WeatherCardItem
    item={{
      date: formatUnixTimeToDate(dt),
      iconName: weather[0].icon,
      temperature: temp
    }}
  />
  }, [data, isLoading, error])
  return (
    <WeatherCard
      title="Forecast for a Date in the Past"
      inputComponents={[<Select value={selectCityValue} options={CitiesOptions} onChange={onSelectCity}/>, <DateInput value={selectedDateValue} onChange={onSelectDate}/>]}
      content={content}
    />
  )
}

export { HistoricalForecastCard }
