import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ModalProps } from './interface'
import { useAppSelector, useAppDispatch, setEditedCat, setEditedUnitName, setEditedStockLimit } from '../../store'
import { Button, FormItem } from '../../components'
import "./scss/Modal.scss";

const Modal: React.FC<ModalProps> = ({ onClose, onDone }) => {
  const ModalState = useAppSelector((state) => state.Modal)
  const dispatch = useAppDispatch()
  const ItemInfoState = useAppSelector((state) => state.ItemInfo)

  const inpuTtype: string = `${ModalState.subHeader === 'Increase Stock Limit' ? 'number' : 'text'}`

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      if (ItemInfoState.recentEditedField === 'Add Sub Category') {
        dispatch(setEditedCat(e.target.value))
      } else if (ItemInfoState.recentEditedField === 'Add Unit Price') {
        dispatch(setEditedUnitName(e.target.value))
      } else dispatch(setEditedStockLimit(parseInt(e.target.value, 10)))
    }
  }

  return (
    <div className={`Modal ${ModalState.show ? 'd-flex' : 'd-none'}`}>
      <div className="Modal-Wrapper">
        {/* Modal Header */}
        <div className="Modal-Header">
          <div className="Main-header font-s-2">{ModalState.mainHeader}</div>
          <div className="Sub-header font-s-1 mr-b--1_7">{ModalState.subHeader}</div>
          {/* Close Icon */}
          <div onClick={onClose}>
            <AiOutlineCloseCircle className='closeIcon size-2' />
          </div>
        </div>
        {/* Modal Body */}
        <div className="Modal-Body">
          <FormItem
            type={inpuTtype}
            width='80%'
            inverseColor
            onChange={onChange}
          />
        </div>
        {/* Modal Footer */}
        <div className="Modal-Footer">
          <Button onClick={onDone} label='Done' />
        </div>
      </div>
    </div>
  )
}

export { Modal }
