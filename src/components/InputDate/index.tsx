import React, { useCallback } from 'react'
import { formatDateToString } from 'utils'
import './styles.css'
interface Props {
    onChange: (date: Date) => void
    value?: Date;
    defaultValue?: Date
    placeholder?: string
  }

const DateInput:React.FC<Props> = ({ value, defaultValue, onChange, placeholder = 'Select Date' }) => {
  const handleChange = useCallback((e: any) => {
    onChange(new Date(e.target.value))
  }, [onChange])

  return (
        <input
          value={value && formatDateToString(value)}
          type="date" className="input"
          onChange={handleChange}
          defaultValue={defaultValue && formatDateToString(defaultValue)}
          placeholder={placeholder}
    />
  )
}

export { DateInput }
