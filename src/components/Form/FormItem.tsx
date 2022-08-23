import React from 'react'
import { FormItemProps } from './interface'
import { FiPlusCircle } from 'react-icons/fi';
import './scss/FormItem.scss'

const FormItem: React.FC<FormItemProps> = ({ label, type, dropDown, multiInput, onMultiAdd, multiList = [], onChange = () => { }, width, inverseColor }) => {

  const getOptions = (options: Array<string>) => {
    const allOptions: Array<React.ReactNode> = []
    options.forEach(drp =>
      allOptions.push(
        <option value={drp}>{drp}</option>
      )
    )

    if (allOptions.length !== 0) return allOptions
    return null
  }

  const getMultiList = (items: Array<string>) => {
    const allItems: Array<React.ReactNode> = []
    items.forEach(item =>
      allItems.push(
        <li>{item}</li>
      )
    )

    if (allItems.length !== 0) return <ul>{allItems}</ul>
    return <></>
  }

  return (
    <div className='FormItem' style={{ width }}>
      <div className={`FormItemLabelContainer ${label ? '' : 'd-none'}`}>
        <div className='FormItemLabel'>{label}</div>
      </div>
      {dropDown ?
        <select onChange={onChange} className="selectField" name="type">
          {getOptions(dropDown)}
        </select>
        : <>
          <input
            onChange={onChange}
            className={`InputField ${inverseColor ? 'inverse' : ''}`}
            type={type}
            placeholder={label}
          />
          {multiInput ?
            <>
              <div onClick={onMultiAdd}>
                <FiPlusCircle className='color-t MultiPlusIcon' />
              </div>
              <div className='MultiInput'>
                {getMultiList(multiList)}
              </div>
            </>
            : null
          }

        </>
      }
    </div>
  )
}

export { FormItem }
