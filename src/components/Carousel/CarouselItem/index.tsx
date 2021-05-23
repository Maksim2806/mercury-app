import React from 'react'
import './styles.css'
import classnames from 'classnames'

interface Props {
  item: React.ReactNode;
  isLastItem?: boolean;
}

const CarouselItem: React.FC<Props> = ({ item, isLastItem }) => {
  return (
    <div
      className={classnames({
        carouselItem: true,
        carouselItem_noMargin: !!isLastItem
      })}
    >
      {item}
    </div>
  )
}

export { CarouselItem }
