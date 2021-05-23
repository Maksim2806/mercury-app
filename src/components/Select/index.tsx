import React, { useCallback, useEffect, useMemo, useState } from 'react'
import cn from 'classnames'

import ChevronTop from './assets/chevron-top.svg'
import ChevronBottom from './assets/chevron-bottom.svg'
import './styles.css'

export interface IOption {
  name: string
  value: any
  key: string | number
}

interface Props {
  options: Array<IOption>
  onChange: (option: IOption) => void
  value?: IOption
  defaultValue?: IOption
  placeholder?: string
}

const Select: React.FC<Props> = ({ options, value, onChange, defaultValue, placeholder = 'Select city' }) => {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState<boolean>(false)

  const selectValue = useMemo(() => value || defaultValue, [value, defaultValue])

  const isSelectElem = (className: string) => className.search(/\bselect\b/) !== -1
  const isSelectOptionsElem = (className: string) => className.search(/\bselect-options\b/) !== -1
  const isSelectArrowElem = (className: string) => className.search(/\bselect__img-arrow\b/) !== -1

  const toggleOptionsMenu = useCallback((e: any) => {
    const elemClassName = e.target.className || ''
    if (isSelectElem || isSelectArrowElem(elemClassName)) {
      setIsOptionsMenuOpen((isOpen) => !isOpen)
    }
  }, [])

  const handleSelect = useCallback((option: IOption) => (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsOptionsMenuOpen(false)
    onChange(option)
  }, [onChange])

  const onClickOutside = useCallback((e:any) => {
    const composedPath = e.composedPath()

    const needToCloseMenu = !composedPath.some((el: any) => {
      const elemClassName = el.className || ''
      return isSelectElem(elemClassName) || isSelectOptionsElem(elemClassName)
    })

    if (needToCloseMenu) {
      setIsOptionsMenuOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', onClickOutside)
    return () => {
      document.removeEventListener('click', onClickOutside)
    }
  }, [onClickOutside])

  const arrowImage = useMemo(() => {
    return isOptionsMenuOpen ? ChevronTop : ChevronBottom
  }, [isOptionsMenuOpen])

  return (<div className={cn({
    select: true,
    select_active: isOptionsMenuOpen,
    select_filled: !!selectValue
  })} onClick={toggleOptionsMenu}>
      {selectValue?.name || placeholder}
      <img className="select__img-arrow" src={arrowImage} alt="arrow" />
      {isOptionsMenuOpen && <div className="select__options" >
          {options.map((option) => {
            return <div className="select__oneOption" key={option.key} onClick={handleSelect(option)}>{option.name}</div>
          })}
      </div>}
  </div>)
}

export { Select }
