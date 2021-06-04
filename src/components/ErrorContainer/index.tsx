import React from 'react'
import './styles.css'

interface Props {
  message?: string;
}

export const ErrorContainer: React.FC<Props> = ({
  message = 'Oooops, something went wrong ...'
}) => {
  return (
    <div className="error-container">
      <div className="error-container__message">{message}</div>
    </div>
  )
}
