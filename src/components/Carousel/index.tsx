import React, { useRef, useCallback } from 'react'
import { CarouselItem } from './CarouselItem'
import './styles.css'

interface Props {
  content: React.ReactNode[];
}

const Carousel: React.FC<Props> = ({ content }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null)

  const handleLeftClick = useCallback(() => {
    const scrollLeft = carouselRef.current?.scrollLeft
    carouselRef.current?.scrollTo({
      left: scrollLeft !== undefined ? scrollLeft - 170 : 0,
      behavior: 'smooth'
    })
  }, [carouselRef])

  const handleRightClick = useCallback(() => {
    const scrollLeft = carouselRef.current?.scrollLeft
    carouselRef.current?.scrollTo({
      left: scrollLeft !== undefined ? scrollLeft + 170 : 0,
      behavior: 'smooth'
    })
  }, [carouselRef])

  return (
    <div className="carousel__wrapper">
      <div className="carousel" ref={carouselRef}>
        <div
          onClick={handleLeftClick}
          className="carousel__arrow carousel__leftArrow"
        >
          {'<'}
        </div>
        <div className="carousel__container">
          {content.map((item, idx) => {
            return (
              <CarouselItem
                key={idx}
                item={item}
                isLastItem={idx === content.length - 1}
              />
            )
          })}
        </div>
        <div
          onClick={handleRightClick}
          className="carousel__arrow carousel__rightArrow"
        >
          {'>'}
        </div>
      </div>
    </div>
  )
}

export { Carousel }
