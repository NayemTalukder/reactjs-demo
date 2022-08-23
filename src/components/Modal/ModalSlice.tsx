import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { ModalState } from './interface'

const initialState: ModalState = {
  show: false,
  mainHeader: '',
  subHeader: '',
  inputText: '',
}

export const ModalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload
    },
    setMainHeader: (state, action: PayloadAction<string>) => {
      state.mainHeader = action.payload
    },
    setSubHeader: (state, action: PayloadAction<string>) => {
      state.subHeader = action.payload
    },
    setInputText: (state, action: PayloadAction<string>) => {
      state.inputText = action.payload
    },
    resetModalState: (state) => {
      state = initialState
    },
  },
})

export const { setShow, setMainHeader, setSubHeader, setInputText, resetModalState } = ModalSlice.actions
export const selectModal = (state: RootState) => state.Modal

export default ModalSlice.reducer